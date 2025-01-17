// based on https://github.com/marmelab/react-admin/blob/master/packages/ra-data-graphql-simple/src/buildGqlQuery.ts
import * as gqlTypes from "graphql-ast-types-browser";
import {
  ArgumentNode,
  IntrospectionField,
  IntrospectionNamedTypeRef,
  IntrospectionObjectType,
  IntrospectionUnionType,
  TypeKind,
  VariableDefinitionNode,
} from "graphql";
import {
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  UPDATE_MANY,
} from "ra-core";
import {
  IntrospectedResource,
  IntrospectionResult,
  QUERY_TYPES,
} from "ra-data-graphql";
import getFinalType from "ra-data-graphql-simple/dist/esm/getFinalType";
import { getGqlType } from "ra-data-graphql-simple/dist/esm/getGqlType";

type SparseField = string | { [k: string]: SparseField[] };
type ExpandedSparseField = { linkedType?: string; fields: SparseField[] };
type ProcessedFields = {
  resourceFields: IntrospectionField[];
  linkedSparseFields: ExpandedSparseField[];
};

function processSparseFields(
  resourceFields: readonly IntrospectionField[],
  sparseFields: SparseField[],
): ProcessedFields & { resourceFields: readonly IntrospectionField[] } {
  if (!sparseFields || sparseFields.length === 0)
    throw new Error(
      "Empty sparse fields. Specify at least one field or remove the 'sparseFields' param",
    );

  const permittedSparseFields: ProcessedFields = sparseFields.reduce(
    (permitted: ProcessedFields, sparseField: SparseField) => {
      let expandedSparseField: ExpandedSparseField;
      if (typeof sparseField == "string")
        expandedSparseField = { fields: [sparseField] };
      else {
        const [linkedType, linkedSparseFields] = Object.entries(sparseField)[0];
        expandedSparseField = {
          linkedType,
          fields: linkedSparseFields,
        };
      }

      const availableField = resourceFields.find(
        (resourceField) =>
          resourceField.name ===
          (expandedSparseField.linkedType || expandedSparseField.fields[0]),
      );

      if (availableField && expandedSparseField.linkedType) {
        permitted.linkedSparseFields.push(expandedSparseField);
        permitted.resourceFields.push(availableField);
      } else if (availableField) permitted.resourceFields.push(availableField);

      return permitted;
    },
    { resourceFields: [], linkedSparseFields: [] },
  ); // ensure the requested fields are available

  if (
    permittedSparseFields.resourceFields.length === 0 &&
    permittedSparseFields.linkedSparseFields.length === 0
  )
    throw new Error(
      "Requested sparse fields not found. Ensure sparse fields are available in the resource's type",
    );

  return permittedSparseFields;
}

const buildGqlQuery =
  (introspectionResults: IntrospectionResult) =>
  (
    resource: IntrospectedResource,
    raFetchMethod: string,
    queryType: IntrospectionField,
    variables: any,
  ) => {
    const { sortField, sortOrder, ...metaVariables } = variables;

    const apolloArgs = buildApolloArgs(queryType, variables);
    const args = buildArgs(queryType, variables, raFetchMethod);

    const sparseFields = metaVariables.meta?.sparseFields;
    if (sparseFields) delete metaVariables.meta.sparseFields;

    // const metaArgs = buildArgs(queryType, metaVariables, raFetchMethod);

    const fields = buildFields(introspectionResults)(
      resource.type.fields,
      sparseFields,
    );

    if (
      raFetchMethod === GET_LIST ||
      raFetchMethod === GET_MANY ||
      raFetchMethod === GET_MANY_REFERENCE
    ) {
      return gqlTypes.document([
        gqlTypes.operationDefinition(
          "query",
          gqlTypes.selectionSet([
            gqlTypes.field(
              gqlTypes.name(queryType.name),
              gqlTypes.name("data"),
              args,
              undefined,
              gqlTypes.selectionSet([
                gqlTypes.field(
                  gqlTypes.name("edges"),
                  undefined,
                  undefined,
                  undefined,
                  gqlTypes.selectionSet([
                    gqlTypes.field(
                      gqlTypes.name("node"),
                      undefined,
                      undefined,
                      undefined,
                      gqlTypes.selectionSet(fields),
                    ),
                  ]),
                ),
              ]),
            ),
          ]),
          gqlTypes.name(queryType.name),
          apolloArgs,
        ),
      ]);
    }

    if (raFetchMethod === DELETE) {
      return gqlTypes.document([
        gqlTypes.operationDefinition(
          "mutation",
          gqlTypes.selectionSet([
            gqlTypes.field(
              gqlTypes.name(queryType.name),
              gqlTypes.name("data"),
              args,
              undefined,
              gqlTypes.selectionSet(fields),
            ),
          ]),
          gqlTypes.name(queryType.name),
          apolloArgs,
        ),
      ]);
    }

    if (raFetchMethod === DELETE_MANY || raFetchMethod === UPDATE_MANY) {
      return gqlTypes.document([
        gqlTypes.operationDefinition(
          "mutation",
          gqlTypes.selectionSet([
            gqlTypes.field(
              gqlTypes.name(queryType.name),
              gqlTypes.name("data"),
              args,
              undefined,
              gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name("ids"))]),
            ),
          ]),
          gqlTypes.name(queryType.name),
          apolloArgs,
        ),
      ]);
    }

    return gqlTypes.document([
      gqlTypes.operationDefinition(
        QUERY_TYPES.includes(raFetchMethod) ? "query" : "mutation",
        gqlTypes.selectionSet([
          gqlTypes.field(
            gqlTypes.name(queryType.name),
            gqlTypes.name("data"),
            args,
            undefined,
            gqlTypes.selectionSet(fields),
          ),
        ]),
        gqlTypes.name(queryType.name),
        apolloArgs,
      ),
    ]);
  };

export const buildFields =
  (introspectionResults: IntrospectionResult, paths = []) =>
  // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
  (fields: readonly IntrospectionField[], sparseFields?: SparseField[]) => {
    const { resourceFields, linkedSparseFields } = sparseFields
      ? processSparseFields(fields, sparseFields)
      : { resourceFields: fields, linkedSparseFields: [] };

    // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
    return resourceFields.reduce((acc, field) => {
      const type = getFinalType(field.type);

      if (type.name.startsWith("_")) {
        return acc;
      }

      if (type.kind !== TypeKind.OBJECT && type.kind !== TypeKind.INTERFACE) {
        return [...acc, gqlTypes.field(gqlTypes.name(field.name))];
      }

      const linkedResource = introspectionResults.resources.find(
        (r) => r.type.name === type.name,
      );

      if (linkedResource) {
        const linkedResourceSparseFields = linkedSparseFields.find(
          (lSP) => lSP.linkedType === field.name,
        )?.fields || ["id"]; // default to id if no sparse fields specified for linked resource

        // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
        const linkedResourceFields = buildFields(introspectionResults)(
          linkedResource.type.fields,
          linkedResourceSparseFields,
        );

        return [
          ...acc,
          gqlTypes.field(
            gqlTypes.name(field.name),
            undefined,
            undefined,
            undefined,
            gqlTypes.selectionSet(linkedResourceFields),
          ),
        ];
      }

      const linkedType = introspectionResults.types.find(
        (t) => t.name === type.name,
      );

      // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
      if (linkedType && !paths.includes(linkedType.name)) {
        const possibleTypes =
          (linkedType as IntrospectionUnionType).possibleTypes || [];

        return [
          ...acc,
          gqlTypes.field(
            gqlTypes.name(field.name),
            undefined,
            undefined,
            undefined,
            gqlTypes.selectionSet([
              ...buildFragments(introspectionResults)(possibleTypes),
              ...buildFields(introspectionResults, [
                // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
                ...paths,
                // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
                linkedType.name,
              ])(
                (linkedType as IntrospectionObjectType).fields,
                linkedSparseFields.find((lSP) => lSP.linkedType === field.name)
                  ?.fields,
              ),
            ]),
          ),
        ];
      }

      // NOTE: We might have to handle linked types which are not resources but will have to be careful about
      // ending with endless circular dependencies
      return acc;
    }, []);
  };

export const buildFragments =
  (introspectionResults: IntrospectionResult) =>
  // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
  (
    possibleTypes: readonly IntrospectionNamedTypeRef<IntrospectionObjectType>[],
  ) =>
    // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
    possibleTypes.reduce((acc, possibleType) => {
      const type = getFinalType(possibleType);

      const linkedType = introspectionResults.types.find(
        (t) => t.name === type.name,
      );

      return [
        ...acc,
        gqlTypes.inlineFragment(
          gqlTypes.selectionSet(
            buildFields(introspectionResults)(
              (linkedType as IntrospectionObjectType).fields,
            ),
          ),
          gqlTypes.namedType(gqlTypes.name(type.name)),
        ),
      ];
    }, []);

export const buildArgs = (
  query: IntrospectionField,
  variables: any,
  raFetchMethod: string,
): ArgumentNode[] => {
  if (query.args.length === 0) {
    return [];
  }

  const validVariables = Object.keys(variables).filter(
    (k) => typeof variables[k] !== "undefined",
  );

  const args = query.args
    .filter((a) => validVariables.includes(a.name))
    .reduce(
      // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
      (acc, arg) => [
        ...acc,
        gqlTypes.argument(
          gqlTypes.name(arg.name),
          gqlTypes.variable(gqlTypes.name(arg.name)),
        ),
      ],
      [],
    );
  // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
  return args;
};

export const buildApolloArgs = (
  query: IntrospectionField,
  variables: any,
): VariableDefinitionNode[] => {
  if (query.args.length === 0) {
    return [];
  }

  const validVariables = Object.keys(variables).filter(
    (k) => typeof variables[k] !== "undefined",
  );

  const args = query.args
    .filter((a) => validVariables.includes(a.name))
    // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
    .reduce((acc, arg) => {
      return [
        ...acc,
        gqlTypes.variableDefinition(
          gqlTypes.variable(gqlTypes.name(arg.name)),
          // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
          getGqlType(arg.type),
        ),
      ];
    }, []);
  // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
  return args;
};

export default buildGqlQuery;
