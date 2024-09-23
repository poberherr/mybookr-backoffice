import { Edit, SimpleForm, TextInput } from "react-admin";
import MapInput from "../inputs/MapInput";

export const LocationEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="addressLineOne" />
      <TextInput source="addressLineTwo" />
      <TextInput source="postalCode" />
      <TextInput source="city" />
      <TextInput source="country" />
      <TextInput source="federalState" />
      <MapInput />
    </SimpleForm>
  </Edit>
);
