import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  ReferenceArrayField,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import MarkdownTextField from "../fields/MarkdownField";

export const ExperienceList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      <TextField source="title" />
      <TextField source="slug" />
      <MarkdownTextField source="description" maxLength={69} />
      <NumberField source="weight" />
      <ReferenceField source="operator.id" reference="User">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="location.id" reference="Location">
        <TextField source="addressLineOne" />
        <br />
        <TextField source="addressLineTwo" />
        <br />
        <NumberField source="postalCode" /> <TextField source="city" />
      </ReferenceField>

      <ReferenceArrayField
        reference="Category"
        source="categoriesIds"
        label="Categories"
      />

      <ReferenceArrayField
        reference="Activity"
        source="activitiesIds"
        label="Activities"
      />
    </Datagrid>
  </List>
);
