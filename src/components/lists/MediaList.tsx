import { List, Datagrid, TextField, ImageField } from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import BookingStatusField from "../fields/BookingStatusField";
import PriceField from "../fields/PriceField";
export const MediaList = () => (
  <List>
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
    </Datagrid>
  </List>
);
