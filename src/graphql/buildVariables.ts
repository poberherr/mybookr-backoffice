// Based on: https://github.com/marmelab/react-admin/blob/master/packages/ra-data-graphql-simple/src/buildVariables.ts

/* eslint-disable default-case */
import {
  IntrospectionField,
  IntrospectionInputObjectType,
  IntrospectionNamedTypeRef,
  IntrospectionNonNullTypeRef,
  IntrospectionType,
} from "graphql";
import {
  CREATE,
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  UPDATE_MANY,
} from "ra-core";
import { IntrospectedResource, IntrospectionResult } from "ra-data-graphql";
import getFinalType from "ra-data-graphql-simple/dist/esm/getFinalType";
import isList from "ra-data-graphql-simple/dist/esm/isList";

const buildVariables =
  (introspectionResults: IntrospectionResult) =>
  (
    resource: IntrospectedResource,
    raFetchMethod: string,
    params: any,
    queryType: IntrospectionField,
  ) => {
    const preparedParams = prepareParams(
      params,
      queryType,
      introspectionResults,
    );

    switch (raFetchMethod) {
      case GET_LIST: {
        return buildGetListVariables(introspectionResults)(
          resource,
          raFetchMethod,
          preparedParams,
        );
      }
      case GET_MANY:
        return {
          filter: {
            // For some reason we get the first and last item as string, the others as objects.. lets fix this
            ids: preparedParams.ids.map((id: string | { id: string }) =>
              typeof id === "object" ? id.id : id,
            ),
          },
          ...(preparedParams.meta ? { meta: preparedParams.meta } : {}),
        };
      case GET_MANY_REFERENCE: {
        const variables = buildGetListVariables(introspectionResults)(
          resource,
          raFetchMethod,
          preparedParams,
        );

        variables.filter = {
          ...variables.filter,
          [preparedParams.target]: preparedParams.id,
        };

        return variables;
      }
      case GET_ONE:
      case DELETE:
        return {
          id: preparedParams.id,
          ...(preparedParams.meta ? { meta: preparedParams.meta } : {}),
        };
      case DELETE_MANY:
        return preparedParams;
      case CREATE:
      case UPDATE: {
        return buildCreateUpdateVariables(
          resource,
          raFetchMethod,
          preparedParams,
          queryType,
        );
      }
      case UPDATE_MANY: {
        const { ids, data: resourceData } = preparedParams;
        const { id, ...data } = buildCreateUpdateVariables(
          resource,
          raFetchMethod,
          { data: resourceData },
          queryType,
        );
        return {
          ids,
          data,
        };
      }
    }
  };

const sanitizeValue = (type: IntrospectionType, value: any) => {
  if (type.name === "Int") {
    return parseInt(value, 10);
  }

  if (type.name === "Float") {
    return parseFloat(value);
  }

  return value;
};

const castType = (
  value: any,
  type: IntrospectionType | IntrospectionNonNullTypeRef,
) => {
  const realType = type.kind === "NON_NULL" ? type.ofType : type;
  switch (`${realType.kind}:${(realType as IntrospectionNamedTypeRef).name}`) {
    case "SCALAR:Int":
      return Number(value);

    case "SCALAR:String":
      return String(value);

    case "SCALAR:Boolean":
      return Boolean(value);

    default:
      return value;
  }
};

const prepareParams = (
  params: any,
  queryType: Partial<IntrospectionField>,
  introspectionResults: IntrospectionResult,
) => {
  const result: { [key: string]: unknown } = {};

  if (!params) {
    return params;
  }

  Object.keys(params).forEach((key) => {
    const param = params[key];
    let arg = null;

    if (!param) {
      result[key] = param;
      return;
    }

    if (queryType && Array.isArray(queryType.args)) {
      arg = queryType.args.find((item) => item.name === key);
    }

    if (param instanceof File) {
      result[key] = param;
      return;
    }

    if (param instanceof Date) {
      result[key] = param.toISOString();
      return;
    }

    if (
      param instanceof Object &&
      !Array.isArray(param) &&
      arg &&
      arg.type.kind === "INPUT_OBJECT"
    ) {
      const args = (
        introspectionResults.types.find(
          (item) => item.kind === arg.type.kind && item.name === arg.type.name,
        ) as IntrospectionInputObjectType
      ).inputFields;
      result[key] = prepareParams(param, { args }, introspectionResults);
      return;
    }

    if (
      param instanceof Object &&
      !(param instanceof Date) &&
      !Array.isArray(param)
    ) {
      result[key] = prepareParams(param, queryType, introspectionResults);
      return;
    }

    if (!arg) {
      result[key] = param;
      return;
    }

    result[key] = castType(param, arg.type);
  });

  return result;
};

const buildGetListVariables =
  (introspectionResults: IntrospectionResult) =>
  (resource: IntrospectedResource, raFetchMethod: string, params: any) => {
    let variables: Partial<{
      filter: { [key: string]: any };
      page: number;
      perPage: number;
      first: number;
      sortField: string;
      sortOrder: string;
      meta?: object;
    }> = { filter: {} };
    if (params.filter) {
      variables.filter = Object.keys(params.filter).reduce((acc, key) => {
        if (key === "ids") {
          return { ...acc, ids: params.filter[key] };
        }

        if (typeof params.filter[key] === "object") {
          const type = introspectionResults.types.find(
            (t) => t.name === `${resource.type.name}Filter`,
          );
          const filterSome = (
            type as IntrospectionInputObjectType
          )?.inputFields?.find((t) => t.name === `${key}_some`);

          if (filterSome) {
            const filter = Object.keys(params.filter[key]).reduce(
              (acc, k) => ({
                ...acc,
                [`${k}_in`]: params.filter[key][k],
              }),
              {},
            );
            return { ...acc, [`${key}_some`]: filter };
          }
        }

        const parts = key.split(".");

        if (parts.length > 1) {
          if (parts[1] === "id") {
            const type = introspectionResults.types.find(
              (t) => t.name === `${resource.type.name}Filter`,
            );
            const filterSome = (
              type as IntrospectionInputObjectType
            )?.inputFields?.find((t) => t.name === `${parts[0]}_some`);

            if (filterSome) {
              return {
                ...acc,
                [`${parts[0]}_some`]: {
                  id: params.filter[key],
                },
              };
            }

            return {
              ...acc,
              [parts[0]]: { id: params.filter[key] },
            };
          }

          const resourceField = resource.type.fields.find(
            (f) => f.name === parts[0],
          );
          if (!resourceField) {
            throw new Error("resourceField not found");
          }
          const type = getFinalType(resourceField.type);
          return {
            ...acc,
            [key]: sanitizeValue(type, params.filter[key]),
          };
        }

        const resourceField = resource.type.fields.find((f) => f.name === key);

        if (resourceField) {
          const type = getFinalType(resourceField.type);
          const isAList = isList(resourceField.type);

          if (isAList) {
            return {
              ...acc,
              [key]: Array.isArray(params.filter[key])
                ? params.filter[key].map((value) => sanitizeValue(type, value))
                : sanitizeValue(type, [params.filter[key]]),
            };
          }

          return {
            ...acc,
            [key]: sanitizeValue(type, params.filter[key]),
          };
        }

        return { ...acc, [key]: params.filter[key] };
      }, {});
    }

    if (params.pagination) {
      // variables.page = parseInt(params.pagination.page, 10) - 1;
      // variables.perPage = parseInt(params.pagination.perPage, 10);
      variables.first = parseInt(params.pagination.perPage, 10);
    }

    if (params.sort) {
      if (
        !params.sort.field.match(/Ids$/) &&
        !params.sort.field.match(/.id$/)
      ) {
        variables.sortField = params.sort.field;
        variables.sortOrder = params.sort.order;
      } else {
        alert(
          "Sorry, we cant sort by references. Please disable sorting for this field.",
        );
      }
    }

    if (params.meta) variables = { ...variables, meta: params.meta };

    return variables;
  };

const buildCreateUpdateVariables = (
  resource: IntrospectedResource,
  raFetchMethod: string,
  { id, data }: any,
  queryType: IntrospectionField,
) =>
  Object.keys(data).reduce(
    (acc, key) => {
      if (Array.isArray(data[key])) {
        const arg = queryType.args.find((a) => a.name === key);
        if (arg) {
          return {
            ...acc,
            [key]: data[key].map(({ id }) => id),
          };
        }
      }

      if (typeof data[key] === "object") {
        const arg = Object.keys(data).find((argKey) => argKey === key);

        if (arg) {
          return {
            ...acc,
            [key]: data[key].id,
          };
        }
      }

      return {
        ...acc,
        [key]: data[key],
      };
    },
    { id },
  );

export default buildVariables;
