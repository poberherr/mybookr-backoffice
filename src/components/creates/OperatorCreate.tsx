import { Create, ReferenceInput, SimpleForm, TextInput } from "react-admin";

export const OperatorCreate = () => (
  <Create>
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
  </Create>
);
