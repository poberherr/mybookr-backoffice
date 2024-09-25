"use client";
import { useEffect, useMemo, useState } from "react";
import { Admin, Resource, ListGuesser, EditGuesser, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
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
import { SignInButton, useAuth } from "@clerk/nextjs";

import buildVariables from "@/graphql/buildVariables";
import buildGqlQuery from "@/graphql/buildGqlQuery";
import getResponseParser from "@/graphql/getResponseParser";

import { ExperienceList } from "./lists/ExperienceList";
import { CategoryList } from "./lists/CategoryList";
import { BookingList } from "./lists/BookingList";
import { ActivityList } from "./lists/ActivityList";
import { MediaList } from "./lists/MediaList";
import { PaymentList } from "./lists/PaymentList";
import { BookingEdit } from "./edits/BookingEdit";
import { LocationEdit } from "./edits/LocationEdit";

import { MyLayout } from "./MyLayout";
import Dashboard from "./Dashboard";

const buildQuery = buildQueryFactory(
  buildVariables,
  buildGqlQuery,
  getResponseParser,
);

const AdminApp = () => {
  const { getToken } = useAuth();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };

    fetchToken();
  }, [getToken]);

  const dataProvider = useMemo(() => {
    if (!token) {
      return null;
    }
    return buildGraphQLProvider({
      clientOptions: {
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          MybookrAuth: process.env.NEXT_PUBLIC_GRAPHQL_AUTH_HEADER || "",
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
  }, [token]);

  if (dataProvider === null) {
    return <SignInButton />;
  }
  return (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
      <Resource
        name="Experience"
        list={ExperienceList}
        edit={EditGuesser}
        recordRepresentation="title"
      />
      <Resource
        name="Booking"
        list={BookingList}
        edit={BookingEdit}
        recordRepresentation="id"
      />
      <Resource
        name="Activity"
        list={ActivityList}
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
        edit={LocationEdit}
        recordRepresentation="addressLineOne"
      />
      <Resource
        name="Media"
        list={MediaList}
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
        list={PaymentList}
        edit={EditGuesser}
        recordRepresentation="name"
      />
      <Resource
        name="User"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="name"
      />
      <CustomRoutes>
        <Route path="/" element={<Dashboard />} />
      </CustomRoutes>
    </Admin>
  );
};

export default AdminApp;
