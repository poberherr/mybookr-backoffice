import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";
import TruncatedTextField from "../fields/TruncatedTextField";

export const ExperienceList = () => (
  <List>
<Datagrid>
    <TextField source="id" />
    <TextField source="title" />
    <TextField source="slug" />
    <TruncatedTextField source="description" maxLength={69} />
    <NumberField source="weight" />
    <ReferenceField source="operator.id" reference="users">
      <TextField source="operator.name" />
    </ReferenceField>
    <ReferenceField source="location.id" reference="locations">
      <TextField source="location.name" />
    </ReferenceField>
    <ReferenceArrayField source="categories" reference="categories">
      <SingleFieldList>
        <ChipField source="name" />
      </SingleFieldList>
    </ReferenceArrayField>
    <ReferenceArrayField source="activities" reference="activities">
      <SingleFieldList>
        <ChipField source="name" />
      </SingleFieldList>
    </ReferenceArrayField>
    <ReferenceArrayField source="medias" reference="medias">
      <SingleFieldList>
        <ChipField source="url" />
      </SingleFieldList>
    </ReferenceArrayField>
  </Datagrid>
  </List>
);