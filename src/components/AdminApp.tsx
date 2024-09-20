"use client";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import buildGraphQLProvider, { buildQueryFactory } from "ra-data-graphql-simple";
import { gql } from "@apollo/client";


import buildGqlQuery from "@/graphql/buildGqlQuery";
import getResponseParser from "@/graphql/getResponseParser";

const buildQuery = buildQueryFactory(
  // undefined,
  buildGqlQuery,
  getResponseParser
)

// const myBuildQuery: typeof buildQuery =
//   (introspection) => (fetchType, resource, params) => {
//     const builtQuery = buildQuery(introspection)(fetchType, resource, params);

//     if (fetchType === "GET_LIST") {
//       return {
//         // Use the default query variables and parseResponse
//         ...builtQuery,

//         parseResponse: (response) => {
//           console.log(response);

//           return {
//             data: response.data.allExperiences.edges.map(
//               (edge: any) => edge.node,
//             ),
//             total: response.data.allExperiences.totalCount,
//             pageInfo: response.data.allExperiences.pageInfo,
//           };
//         },

//         query: gql`
//           query Experience 
//           {
//             allExperiences {
//               edges {
//                 node {
//                   id
//                   description
//                   title
//                   operator {
//                     id
//                   }
//                   slug
//                   category {
//                     id
//                   }
//                   categories {
//                     id
//                   }
//                   activities {
//                     id
//                   }
//                   location {
//                     id
//                   }
//                   medias {
//                     id
//                   }
//                   weight
//                 }
//               }
//             }
//           }
//         `,
//       };
//     }

//     return builtQuery;
//   };

const dataProvider = buildGraphQLProvider({
  clientOptions: { uri: process.env.NEXT_PUBLIC_GRAPHQL_URL },
  buildQuery,
  introspection: {
    operationNames: {
      "GET_LIST": (type) => {
        console.log({type})
        return type.name
      }
    }
  }
});

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="Experience"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="title"
    />
    <Resource
      name="Booking"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="title"
    />
    <Resource
      name="Activity"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="title"
    />
    <Resource
      name="Category"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="name"
    />
    <Resource
      name="Location"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="addressLineOne"
    />
    <Resource
      name="Media"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="title"
    />
    <Resource
      name="Operator"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="name"
    />
    <Resource
      name="Payment"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="name"
    />
    <Resource
      name="User"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="name"
    />
  </Admin>
);

export default AdminApp;
