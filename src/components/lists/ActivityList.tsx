import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import MarkdownTextField from "../fields/MarkdownField";
import PriceField from "../fields/PriceField";
import { createUpdateDeleteComboField } from "../fields/SmartDateField";

export const ActivityList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      {createUpdateDeleteComboField}
      <ReferenceField
        source="experience.id"
        reference="Experience"
        label="Experience"
      >
        <TextField source="title" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="slug" />
      <PriceField source="price" />
      <MarkdownTextField source="description" maxLength={42} />
      <NumberField source="guestMax" label="Maximum Guests" />
    </Datagrid>
  </List>
);
