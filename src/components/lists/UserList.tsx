import {
  CreateButton,
  Datagrid,
  EmailField,
  ExportButton,
  FilterButton,
  List,
  SearchInput,
  TextField,
  TopToolbar,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import { SmartDateField } from "../fields/SmartDateField";

const userFilters = [<SearchInput source="q" alwaysOn key="q" />];

const UserListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const UserList = () => (
  <List
    actions={<UserListActions />}
    filters={userFilters}
    sort={{ field: "path", order: "ASC" }}
  >
    <Datagrid>
      <GlobalIdTextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="role" />
      <SmartDateField label="Updated" sortBy="updatedAt" />
    </Datagrid>
  </List>
);
