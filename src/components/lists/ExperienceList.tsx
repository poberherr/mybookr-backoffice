import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  ReferenceArrayField,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";

export const ExperienceList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      <ReferenceField
        source="operator.id"
        reference="User"
        label="Operator"
        sortable={false}
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="slug" />
      <NumberField source="weight" label="Sort Weight" />
      <ReferenceField
        source="location.id"
        reference="Location"
        label="Location"
        sortable={false}
      >
        <TextField source="postalCode" /> <TextField source="city" />
        <br />
        <TextField source="country" />
      </ReferenceField>

      <ReferenceArrayField
        reference="Category"
        source="categoriesIds"
        label="Categories"
        sortable={false}
      />

      <ReferenceArrayField
        reference="Activity"
        source="activitiesIds"
        label="Activities"
        sortable={false}
      />
    </Datagrid>
  </List>
);
