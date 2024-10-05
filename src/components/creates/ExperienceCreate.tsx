import {
  ArrayInput,
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

export const ExperienceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="slug" />
      <NumberInput source="weight" />
      <TextInput source="description" minRows={3} maxRows={15} multiline />

      <ReferenceInput
        source="location.id"
        reference="Location"
        label="Location"
      />

      <ReferenceInput source="operator.id" reference="User" label="User" />

      <ArrayInput source="categories">
        <SimpleFormIterator>
          <ReferenceInput source="id" reference="Category" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="medias">
        <SimpleFormIterator>
          <ReferenceInput source="id" reference="Media" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);
