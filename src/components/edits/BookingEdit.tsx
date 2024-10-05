import { Stack } from "@mui/material";

import {
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

import BookingAside from "../aside/BookingAside";
import DollarInput from "../inputs/DollarInput";

export const BookingEdit = () => (
  <Edit mutationMode="pessimistic" aside={<BookingAside />}>
    <SimpleForm>
      <Stack direction="row" spacing={2}>
        <div>
          <SelectInput
            source="status"
            choices={[
              { id: "STARTED", name: "STARTED" },
              { id: "DATA_COLLECTED", name: "DATA_COLLECTED" },
              { id: "PAYMENT_STARTED", name: "PAYMENT_STARTED" },
              { id: "PAYMENT_FINISHED", name: "PAYMENT_FINISHED" },
              { id: "PAYMENT_FAILED", name: "PAYMENT_FAILED" },
              { id: "BOOKING_CONFIRMED", name: "BOOKING_CONFIRMED" },
              { id: "BOOKING_CANCELLED", name: "BOOKING_CANCELLED" },
            ]}
          />
        </div>
        <div>
          <ReferenceInput
            source="booker.id"
            reference="User"
            label="Booking User"
          />
        </div>
      </Stack>
      <TextInput source="name" />
      <TextInput source="additionalInformation" />
      <Stack direction="row" spacing={2}>
        <TextInput source="email" />
        <TextInput source="telephone" />
      </Stack>
      <Stack direction="row" spacing={2}>
        <DollarInput source="totalCost" />
        <TextInput source="currency" />
      </Stack>
    </SimpleForm>
  </Edit>
);
