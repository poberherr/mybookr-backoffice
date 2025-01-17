"use client";

import { useMemo } from "react";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PersonIcon from "@mui/icons-material/Person";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PlaceIcon from "@mui/icons-material/Place";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";

import { SignInButton } from "@clerk/nextjs";
import { GET_ONE } from "ra-core";
import buildGraphQLProvider, {
  buildQueryFactory,
} from "ra-data-graphql-simple";
import { Admin, CustomRoutes, EditGuesser, Resource } from "react-admin";
import { Route } from "react-router-dom";

import buildGqlQuery from "@/graphql/buildGqlQuery";
import buildVariables from "@/graphql/buildVariables";
import getResponseParser from "@/graphql/getResponseParser";

import useJwtToken from "@/helpers/clerk";

import { ActivityCreate } from "./creates/ActivityCreate";
import { CategoryCreate } from "./creates/CategoryCreate";
import { ExperienceCreate } from "./creates/ExperienceCreate";
import { LocationCreate } from "./creates/LocationCreate";
import { OperatorCreate } from "./creates/OperatorCreate";
import { UserCreate } from "./creates/UserCreate";
import Dashboard from "./Dashboard";
import { ActivityEdit } from "./edits/ActivityEdit";
import { BookingEdit } from "./edits/BookingEdit";
import { CategoryEdit } from "./edits/CategoryEdit";
import { ExperienceEdit } from "./edits/ExperienceEdit";
import { LocationEdit } from "./edits/LocationEdit";
import { MediaEdit } from "./edits/MediaEdit";
import { OperatorEdit } from "./edits/OperatorEdit";
import { UserEdit } from "./edits/UserEdit";
import { ActivityList } from "./lists/ActivityList";
import { BookingList } from "./lists/BookingList";
import { CategoryList } from "./lists/CategoryList";
import { ExperienceList } from "./lists/ExperienceList";
import { LocationList } from "./lists/LocationList";
import { MediaList } from "./lists/MediaList";
import { OperatorList } from "./lists/OperatorList";
import { PaymentList } from "./lists/PaymentList";
import { UserList } from "./lists/UserList";
import { MyLayout } from "./MyLayout";

const buildQuery = buildQueryFactory(
  buildVariables,
  buildGqlQuery,
  getResponseParser,
);

const AdminApp = () => {
  const token = useJwtToken();

  const dataProvider = useMemo(() => {
    if (!token) {
      return null;
    }
    return buildGraphQLProvider({
      clientOptions: {
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        headers: {
          Authorization: token,
          MybookrAuth: process.env.NEXT_PUBLIC_GRAPHQL_AUTH_HEADER || "",
        },
      },
      buildQuery,
      introspection: {
        operationNames: {
          [GET_ONE]: (resource) => resource.name.toLowerCase(),
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
        name="Booking"
        list={BookingList}
        edit={BookingEdit}
        icon={ReceiptIcon}
        recordRepresentation="id"
      />
      <Resource
        name="Payment"
        list={PaymentList}
        edit={EditGuesser}
        icon={CreditCardIcon}
        recordRepresentation="name"
      />
      <Resource
        name="Experience"
        list={ExperienceList}
        edit={ExperienceEdit}
        create={ExperienceCreate}
        icon={Diversity2Icon}
        recordRepresentation="title"
      />
      <Resource
        name="Activity"
        list={ActivityList}
        edit={ActivityEdit}
        create={ActivityCreate}
        icon={LocalActivityIcon}
        recordRepresentation="title"
      />
      <Resource
        name="Media"
        list={MediaList}
        edit={MediaEdit}
        icon={PhotoLibraryIcon}
        recordRepresentation="title"
      />
      <Resource
        name="Location"
        list={LocationList}
        edit={LocationEdit}
        create={LocationCreate}
        icon={PlaceIcon}
        recordRepresentation="addressLineOne"
      />
      <Resource
        name="Category"
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
        icon={FolderSpecialIcon}
        recordRepresentation="name"
      />
      <Resource
        name="User"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={PersonIcon}
        recordRepresentation="name"
      />
      <Resource
        name="Operator"
        list={OperatorList}
        edit={OperatorEdit}
        create={OperatorCreate}
        icon={SettingsAccessibilityIcon}
        recordRepresentation="name"
      />
      <Resource
        name="Log"
        hasCreate={false}
        hasEdit={false}
        // hasShow={false}
      />
      <CustomRoutes>
        <Route path="/" element={<Dashboard />} />
      </CustomRoutes>
    </Admin>
  );
};

export default AdminApp;
