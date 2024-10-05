import {
  CreateButton,
  Datagrid,
  ExportButton,
  FilterButton,
  List,
  SearchInput,
  TextField,
  TopToolbar,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import { SmartDateField } from "../fields/SmartDateField";

const locationFilters = [<SearchInput source="q" alwaysOn key="q" />];

const LocationListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const LocationList = () => (
  <List
    actions={<LocationListActions />}
    filters={locationFilters}
    sort={{ field: "path", order: "ASC" }}
  >
    <Datagrid>
      <GlobalIdTextField source="id" />
      <TextField source="addressLineOne" />
      <TextField source="addressLineTwo" />
      <TextField source="postalCode" />
      <TextField source="city" />
      <TextField source="federalState" />
      <TextField source="country" />
      <SmartDateField label="Updated" sortBy="updatedAt" />
    </Datagrid>
  </List>
);
