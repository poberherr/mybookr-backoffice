import { ChipField, Datagrid, DateField, List, TextField } from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import PaymentStatusField from "../fields/PaymentStatusField";
import PriceField from "../fields/PriceField";
import { SmartDateField } from "../fields/SmartDateField";

export const PaymentList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      <DateField source="date" label="Payment Date" />
      <PaymentStatusField source="status" />
      <PriceField source="amount" />
      <TextField source="externalPaymentId" />
      <ChipField source="paymentProvider" />
      <TextField source="mediaType" />
      <SmartDateField label="Updated" sortBy="updatedAt" />
    </Datagrid>
  </List>
);
