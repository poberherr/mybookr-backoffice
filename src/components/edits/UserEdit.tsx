import { Edit, SimpleForm, TextInput } from "react-admin";

import GenericAside from "../aside/GenericAside";

export const UserEdit = () => (
  <Edit mutationMode="pessimistic" aside={<GenericAside />}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="role" disabled defaultValue="operator" />
    </SimpleForm>
  </Edit>
);
