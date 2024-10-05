import { Stack } from "@mui/material";

import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  WrapperField,
} from "react-admin";

import BookingStatusField from "../fields/BookingStatusField";
import FormattedDateField from "../fields/FormattedDateField";
import GlobalIdTextField from "../fields/GlobalIdTextField";
import PriceField from "../fields/PriceField";
import { SmartDateField } from "../fields/SmartDateField";

export const BookingList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      <BookingStatusField source="status" />
      <WrapperField label="Booking Date" sortBy="bookedDate">
        <Stack>
          <FormattedDateField source="bookedDate" />
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

      <SmartDateField label="Updated" sortBy="updatedAt" />
    </Datagrid>
  </List>
);
