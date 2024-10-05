import {
  CreateButton,
  Datagrid,
  ExportButton,
  FilterButton,
  ImageField,
  List,
  SearchInput,
  TextField,
  TopToolbar,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import { SmartDateField } from "../fields/SmartDateField";

const mediaFilters = [<SearchInput source="q" alwaysOn key="q" />];

const MediaListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const MediaList = () => (
  <List
    actions={<MediaListActions />}
    filters={mediaFilters}
    sort={{ field: "path", order: "ASC" }}
  >
    <Datagrid>
      <GlobalIdTextField source="id" />
      <TextField source="title" />
      <ImageField
        source="url"
        sx={{ "& img": { maxWidth: 80, maxHeight: 80, objectFit: "contain" } }}
      />
      <TextField source="width" />
      <TextField source="height" />
      <TextField source="mediaType" />

      <SmartDateField label="Updated" sortBy="updatedAt" />
    </Datagrid>
  </List>
);
