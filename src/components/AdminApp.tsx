"use client";

import { useEffect, useMemo, useState } from "react";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PersonIcon from "@mui/icons-material/Person";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PlaceIcon from "@mui/icons-material/Place";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";

import { SignInButton, useAuth } from "@clerk/nextjs";
import {
  CREATE,
  DELETE,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
} from "ra-core";
import buildGraphQLProvider, {
  buildQueryFactory,
} from "ra-data-graphql-simple";
import {
  Admin,
  CustomRoutes,
  EditGuesser,
  ListGuesser,
  Resource,
} from "react-admin";
import { Route } from "react-router-dom";

import buildGqlQuery from "@/graphql/buildGqlQuery";
import buildVariables from "@/graphql/buildVariables";
import getResponseParser from "@/graphql/getResponseParser";

import Dashboard from "./Dashboard";
import { BookingEdit } from "./edits/BookingEdit";
import { LocationEdit } from "./edits/LocationEdit";
import { ActivityList } from "./lists/ActivityList";
import { BookingList } from "./lists/BookingList";
import { CategoryList } from "./lists/CategoryList";
import { ExperienceList } from "./lists/ExperienceList";
import { MediaList } from "./lists/MediaList";
import { PaymentList } from "./lists/PaymentList";
import { MyLayout } from "./MyLayout";

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
        icon={Diversity2Icon}
        recordRepresentation="title"
      />
      <Resource
        name="Activity"
        list={ActivityList}
        edit={EditGuesser}
        icon={LocalActivityIcon}
        recordRepresentation="title"
      />
      <Resource
        name="Booking"
        list={BookingList}
        edit={BookingEdit}
        icon={ReceiptIcon}
        recordRepresentation="id"
      />
      <Resource
        name="Category"
        list={CategoryList}
        edit={EditGuesser}
        icon={FolderSpecialIcon}
        recordRepresentation="name"
      />
      <Resource
        name="Location"
        list={ListGuesser}
        edit={LocationEdit}
        icon={PlaceIcon}
        recordRepresentation="addressLineOne"
      />
      <Resource
        name="Media"
        list={MediaList}
        edit={EditGuesser}
        icon={PhotoLibraryIcon}
        recordRepresentation="title"
      />
      <Resource
        name="Operator"
        list={ListGuesser}
        edit={EditGuesser}
        icon={SettingsAccessibilityIcon}
        recordRepresentation="name"
      />
      <Resource
        name="Payment"
        list={PaymentList}
        edit={EditGuesser}
        icon={CreditCardIcon}
        recordRepresentation="name"
      />
      <Resource
        name="User"
        list={ListGuesser}
        edit={EditGuesser}
        icon={PersonIcon}
        recordRepresentation="name"
      />
      <CustomRoutes>
        <Route path="/" element={<Dashboard />} />
      </CustomRoutes>
    </Admin>
  );
};

export default AdminApp;
