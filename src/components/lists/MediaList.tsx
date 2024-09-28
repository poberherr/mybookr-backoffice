import { Datagrid, ImageField, List, TextField } from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import { createUpdateDeleteComboField } from "../fields/SmartDateField";

export const MediaList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      {createUpdateDeleteComboField}
      <TextField source="title" />
      <ImageField
        source="url"
        sx={{ "& img": { maxWidth: 80, maxHeight: 80, objectFit: "contain" } }}
      />
      <TextField source="width" />
      <TextField source="height" />
      <TextField source="mediaType" />
    </Datagrid>
  </List>
);
