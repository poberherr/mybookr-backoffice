import {
  CreateButton,
  Datagrid,
  ExportButton,
  FilterButton,
  ImageField,
  List,
  ReferenceField,
  SearchInput,
  TextField,
  TopToolbar,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import { SmartDateField } from "../fields/SmartDateField";

const operatorFilters = [<SearchInput source="q" alwaysOn key="q" />];

const OperatorListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const OperatorList = () => (
  <List
    actions={<OperatorListActions />}
    filters={operatorFilters}
    sort={{ field: "path", order: "ASC" }}
  >
    <Datagrid>
      <GlobalIdTextField source="id" />
      <TextField source="name" />
      <ReferenceField source="logo.id" reference="Media" label="Logo">
        <ImageField
          source="url"
          sx={{
            "& img": { maxWidth: 80, maxHeight: 80, objectFit: "contain" },
          }}
        />
      </ReferenceField>
      <TextField source="contactEmail" />
      <TextField source="contactWhatsapp" />
      <TextField source="website" />
      <ReferenceField source="user.id" reference="User" label="User">
        <TextField source="name" />
      </ReferenceField>

      <SmartDateField label="Updated" sortBy="updatedAt" />
    </Datagrid>
  </List>
);
