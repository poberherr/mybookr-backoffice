import React from "react";

import DataObjectIcon from "@mui/icons-material/DataObject";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";

import { ForeignEntities } from "@/gql/graphql";
import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";

import CategoryAside from "../aside/CategoryAside";
import EntityHistory from "../EntityHistory";
import PersistentTabs from "../PersistentTabs";
import { RawDataTab } from "../tabs/RawDataTab";

export const CategoryEdit: React.FC = () => (
  <Edit aside={<CategoryAside />} mutationMode="pessimistic">
    <PersistentTabs
      localStorageKey="category-edit-tabs"
      tabLabels={[
        { label: "Edit", icon: <EditIcon /> },
        { label: "History", icon: <HistoryIcon /> },
        { label: "Raw Data", icon: <DataObjectIcon /> },
      ]}
    >
      <SimpleForm>
        <TextInput source="name" label="Category Name" fullWidth />
        <TextInput source="path" label="Category Path" fullWidth />
        <NumberInput source="weight" label="Sort Weight" fullWidth />
      </SimpleForm>
      <EntityHistory type={ForeignEntities.Categories} />
      <RawDataTab />
    </PersistentTabs>
  </Edit>
);
