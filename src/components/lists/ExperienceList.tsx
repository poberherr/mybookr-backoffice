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
import GlobalIdTextField from "../fields/GlobalIdTextField";

export const ExperienceList = () => (
  <List>
    <Datagrid>
      <GlobalIdTextField source="id" />
      <TextField source="title" />
      <TextField source="slug" />
      <TruncatedTextField source="description" maxLength={69} />
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
      <ReferenceArrayField source="categories" reference="Category">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField source="activities" reference="Activity">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField source="medias" reference="Media">
        <SingleFieldList>
          <ChipField source="url" />
        </SingleFieldList>
      </ReferenceArrayField>
    </Datagrid>
  </List>
);
