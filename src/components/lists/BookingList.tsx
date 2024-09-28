import { Stack } from "@mui/material";

import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
  WrapperField,
} from "react-admin";

import BookingStatusField from "../fields/BookingStatusField";
import GlobalIdTextField from "../fields/GlobalIdTextField";
import PriceField from "../fields/PriceField";

export const BookingList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      <BookingStatusField source="status" />
      <WrapperField label="Booking Date" sortBy="bookedDate">
        <Stack>
          <DateField source="bookedDate" />
          <DateField source="bookedDate" showTime showDate={false} />
        </Stack>
      </WrapperField>

      <WrapperField label="Booker" sortBy="name">
        <Stack>
          <TextField source="name" sx={{ fontWeight: "bold" }} />
          <Stack direction={"column"}>
            <TextField source="email" />
            <TextField source="telephone" />
          </Stack>
        </Stack>
      </WrapperField>
      <TextField source="referenceCode" label="Reference Code" />

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
