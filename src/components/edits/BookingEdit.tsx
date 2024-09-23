import {
  Edit,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import GlobalIdTextField from "../fields/GlobalIdTextField";
import { Stack } from "@mui/material";
import DollarInput from "../inputs/DollarInput";

export const BookingEdit = () => (
  <Edit>
    <SimpleForm>
      <Stack
        spacing={2}
        direction={"row"}
        sx={{
          padding: "2rem",
          marginBottom: "1rem",
          border: "2px solid #efefef",
        }}
      >
        <div>
          <strong>Booking Id:</strong> <GlobalIdTextField source="id" />
        </div>
        <div>
          <strong>Reference Code:</strong> <TextField source="referenceCode" />
        </div>
        <div>
          <strong>Activity:</strong> <ReferenceField source="activity.id" reference="Activity"/>
        </div>
        <div>
          <strong>Booking Date:</strong> @todo
        </div>
      </Stack>
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
