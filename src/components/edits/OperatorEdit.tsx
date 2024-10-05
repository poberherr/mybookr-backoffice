import { Edit, ReferenceInput, SimpleForm, TextInput } from "react-admin";

import GenericAside from "../aside/GenericAside";

export const OperatorEdit = () => (
  <Edit mutationMode="pessimistic" aside={<GenericAside />}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" minRows={3} maxRows={15} multiline />
      <TextInput source="contactEmail" />
      <TextInput source="contactWhatsapp" />
      <TextInput source="website" />
      <TextInput source="websiteBooking" />
      <TextInput source="xenditUserId" />
      <ReferenceInput source="user.id" reference="User" label="User" />
      <ReferenceInput source="logo.id" reference="Media" label="Logo" />
      <ReferenceInput source="media.id" reference="Media" label="Media" />
    </SimpleForm>
  </Edit>
);
