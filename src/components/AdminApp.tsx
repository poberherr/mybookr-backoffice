"use client";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import buildGraphQLProvider, { buildQuery } from "ra-data-graphql-simple";
import { gql } from "@apollo/client";

const myBuildQuery: typeof buildQuery =
  (introspection) => (fetchType, resource, params) => {
    const builtQuery = buildQuery(introspection)(fetchType, resource, params);

    if (fetchType === "GET_LIST") {
      return {
        // Use the default query variables and parseResponse
        ...builtQuery,

        parseResponse: (response) => {
          console.log(response);

          return {data: response.data.allExperiences.edges.map((edge: any) => edge.node),
            total: response.data.allExperiences.totalCount,
            pageInfo: response.data.allExperiences.pageInfo,
          };
        },
        // Override the query

        // `query Command($id: ID!) {
        //     data: Command(id: $id) {
        //         id
        //         reference
        //         customer {
        //             id
        //             firstName
        //             lastName
        //         }
        //     }
        // }`
        //   allPosts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: PostFilter): [Post]

        query: gql`
          query Experience
          # (
          #   # $page: Int
          #   # $perPage: Int
          #   # $sortField: String
          #   # $sortOrder: String
          #   # $filter: PostFilter
          # ) 
          {
            allExperiences {
              edges {
                node {
                  id
                  description
                  title
                  operator {
                    id
                  }
                  slug
                  category {
                    id
                  }
                  categories {
                    id
                  }
                  activities {
                    id
                  }
                  location {
                    id
                  }
                  medias {
                    id
                  }
                  weight
                }
              }
            }
          }
        `,
      };
    }

    return builtQuery;
  };

const dataProvider = buildGraphQLProvider({
  clientOptions: { uri: process.env.NEXT_PUBLIC_GRAPHQL_URL },
  buildQuery: myBuildQuery,
});

console.log(process.env.NEXT_PUBLIC_GRAPHQL_URL);

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
      name="Payment"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="title"
    />
    {/* <Resource name="comments" list={ListGuesser} edit={EditGuesser} /> */}
  </Admin>
);

export default AdminApp;

// import React from 'react';
// import { PostCreate, PostEdit, PostList } from './posts';

// const App = () => (
//     <Admin dataProvider={dataProvider} >
//         <Resource name="Post" list={PostList} edit={PostEdit} create={PostCreate} />
//     </Admin>
// );

// export default App;
