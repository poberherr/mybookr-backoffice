import { Edit, SimpleForm, TextInput } from "react-admin";

import GenericAside from "../aside/GenericAside";
import MapInput from "../inputs/MapInput";

export const LocationEdit = () => (
  <Edit mutationMode="pessimistic" aside={<GenericAside />}>
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
