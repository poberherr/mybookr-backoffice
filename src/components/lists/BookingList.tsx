import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  WrapperField,
} from "react-admin";
import { Stack } from "@mui/material";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import BookingStatusField from "../fields/BookingStatusField";
import PriceField from "../fields/PriceField";

export const BookingList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      <BookingStatusField source="status" />
      <WrapperField label="Booker" sortBy="name">
        <Stack>
          <TextField source="name" />
          <Stack direction={"column"}>
            <TextField source="email" />
            <TextField source="telephone" />
          </Stack>
        </Stack>
      </WrapperField>
      <TextField source="referenceCode" label="Booking Reference Code" />

      <PriceField source="totalCost" />

      <ReferenceField
        source="activity.id"
        reference="Activity"
        label="Activity Title"
      >
        <TextField source="title" />
      </ReferenceField>
    </Datagrid>
  </List>
);
