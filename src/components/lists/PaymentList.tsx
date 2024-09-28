import { ChipField, Datagrid, DateField, List, TextField } from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import PaymentStatusField from "../fields/PaymentStatusField";
import PriceField from "../fields/PriceField";
import { createUpdateDeleteComboField } from "../fields/SmartDateField";

export const PaymentList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      {createUpdateDeleteComboField}
      <DateField source="date" />
      <PaymentStatusField source="status" />
      <PriceField source="amount" />
      <TextField source="externalPaymentId" />
      <ChipField source="paymentProvider" />
    </Datagrid>
  </List>
);
