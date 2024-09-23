import { List, Datagrid, TextField, ChipField, DateField } from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import BookingStatusField from "../fields/BookingStatusField";
import PriceField from "../fields/PriceField";
import PaymentStatusField from "../fields/PaymentStatusField";

export const PaymentList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      <DateField source="date" />
      <PaymentStatusField source="status" />
      <PriceField source="amount" />
      <TextField source="externalPaymentId" />
      <ChipField source="paymentProvider" />
    </Datagrid>
  </List>
);


