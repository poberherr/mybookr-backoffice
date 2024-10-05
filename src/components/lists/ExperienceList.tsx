import {
  CreateButton,
  Datagrid,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceArrayField,
  ReferenceField,
  SearchInput,
  TextField,
  TopToolbar,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import { SmartDateField } from "../fields/SmartDateField";

const ExperienceListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const experienceFilters = [<SearchInput source="q" alwaysOn key="q" />];

export const ExperienceList = () => (
  <List actions={<ExperienceListActions />} filters={experienceFilters}>
    <Datagrid>
      <GlobalIdTextField source="id" />

      <ReferenceField
        source="operator.id"
        reference="User"
        label="Operator"
        sortable={false}
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="slug" />
      <NumberField source="weight" label="Sort Weight" />
      <ReferenceField
        source="location.id"
        reference="Location"
        label="Location"
        sortable={false}
      >
        <TextField source="postalCode" /> <TextField source="city" />
        <br />
        <TextField source="country" />
      </ReferenceField>

      <ReferenceArrayField
        reference="Category"
        source="categoriesIds"
        label="Categories"
        sortable={false}
      />

      <ReferenceArrayField
        reference="Activity"
        source="activitiesIds"
        label="Activities"
        sortable={false}
      />

      <SmartDateField label="Updated" sortBy="updatedAt" />
    </Datagrid>
  </List>
);
