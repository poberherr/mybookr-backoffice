import {
  ArrayInput,
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

import DollarInput from "../inputs/DollarInput";

export const ActivityCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        source="experience.id"
        reference="Experience"
        label="Experience"
      />
      <TextInput source="title" />
      <TextInput source="description" minRows={3} maxRows={15} multiline />
      <DollarInput source="price" />
      <NumberInput source="durationMinutes" />
      <ArrayInput source="medias">
        <SimpleFormIterator>
          <ReferenceInput source="id" reference="Media" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);
