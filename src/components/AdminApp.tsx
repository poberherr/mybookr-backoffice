"use client";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import buildGraphQLProvider, {
  buildQueryFactory,
} from "ra-data-graphql-simple";

import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from "ra-core";

import buildGqlQuery from "@/graphql/buildGqlQuery";
import getResponseParser from "@/graphql/getResponseParser";
import { ExperienceList } from "./lists/ExperienceList";
import { CategoryList } from "./lists/CategoryList";
import { BookingEdit } from "./edits/BookingEdit";

const buildQuery = buildQueryFactory(
  undefined,
  buildGqlQuery,
  getResponseParser,
);

const dataProvider = buildGraphQLProvider({
  clientOptions: {
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    headers: {
      Authorization: process.env.NEXT_PUBLIC_GRAPHQL_AUTH_HEADER || "",
    },
  },
  buildQuery,
  introspection: {
    operationNames: {
      [GET_LIST]: (resource) => `${resource.name}s`.toLowerCase(),
      [GET_ONE]: (resource) => resource.name.toLowerCase(),
      [GET_MANY]: (resource) => `${resource.name}s`.toLowerCase(),
      [GET_MANY_REFERENCE]: (resource) => `${resource.name}s`.toLowerCase(),
      [CREATE]: (resource) => `create${resource.name}`,
      [UPDATE]: (resource) => `update${resource.name}`,
      [DELETE]: (resource) => `delete${resource.name}`,
    },
  },
});

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="Experience"
      list={ExperienceList}
      edit={EditGuesser}
      recordRepresentation="title"
    />
    <Resource
      name="Booking"
      list={ListGuesser}
      edit={BookingEdit}
      recordRepresentation="id"
    />
    <Resource
      name="Activity"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="title"
    />
    <Resource
      name="Category"
      list={CategoryList}
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
