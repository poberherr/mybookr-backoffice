import {
  ChipField,
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceArrayField,
  ReferenceField,
  TextField,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";

export const CategoryList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      <TextField source="path" />
      <NumberField source="depth" />
      <NumberField source="weight" />
      <TextField source="name" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <DateField source="deletedAt" />
      <ReferenceField source="parent.id" reference="Category" label="Parent">
        <ChipField source="name" />
      </ReferenceField>
      <ReferenceArrayField
        source="children"
        reference="Category"
        label="Categories"
      />
    </Datagrid>
  </List>
);
