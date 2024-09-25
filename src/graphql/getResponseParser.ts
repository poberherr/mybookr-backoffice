// Based on: https://github.com/marmelab/react-admin/blob/master/packages/ra-data-graphql-simple/src/getResponseParser.ts

import {
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  UPDATE_MANY,
} from "ra-core";
import { IntrospectionResult, IntrospectedResource } from "ra-data-graphql";
import { IntrospectionField } from "graphql";
import { ApolloQueryResult } from "@apollo/client";

const getResponseParser = (_introspectionResults: IntrospectionResult) =>
  (
    raFetchMethod: string,
    _resource: IntrospectedResource,
    _queryType: IntrospectionField,
  ) =>
  (response: ApolloQueryResult<any>) => {
    const data = response.data;

    if (
      raFetchMethod === GET_LIST ||
      raFetchMethod === GET_MANY ||
      raFetchMethod === GET_MANY_REFERENCE
    ) {
      const pageInfo = data.data.edges[data.data.edges.length - 1].node.id;

      return {
        data: data.data.edges
          // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
          .map((edge: unknown) => edge.node)
          .map(sanitizeResource),
        pageInfo,
        // total: response.data.total.count,
      };
    } else if (raFetchMethod === DELETE_MANY || raFetchMethod === UPDATE_MANY) {
      return { data: sanitizeResource(data.data).ids };
    }

    return { data: sanitizeResource(data.data) };
  };

  // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
const sanitizeResource = (data: unknown) => {
  // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
  const result = Object.keys(data).reduce((acc, key) => {
    if (key.startsWith("_")) {
      return acc;
    }
    // @ts-expect-error error inherited from copy of react-admin-source-graphql-simple
    const dataForKey = data[key];

    if (dataForKey === null || dataForKey === undefined) {
      return acc;
    }

    if (Array.isArray(dataForKey)) {
      if (
        typeof dataForKey[0] === "object" &&
        dataForKey[0] != null &&
        // If there is no id, it's not a reference but an embedded array
        dataForKey[0].id != null
      ) {
        return {
          ...acc,
          [key]: dataForKey.map(sanitizeResource),
          [`${key}Ids`]: dataForKey.map((d) => d.id),
        };
      } else {
        return { ...acc, [key]: dataForKey };
      }
    }

    if (
      typeof dataForKey === "object" &&
      dataForKey != null &&
      // If there is no id, it's not a reference but an embedded object
      dataForKey.id != null
    ) {
      return {
        ...acc,
        ...(dataForKey &&
          dataForKey.id && {
            [`${key}.id`]: dataForKey.id,
          }),
        // We should only sanitize gql types, not objects
        [key]: dataForKey.__typename
          ? sanitizeResource(dataForKey)
          : dataForKey,
      };
    }

    return { ...acc, [key]: dataForKey };
  }, {});

  return result;
};

export default getResponseParser