import {
  ArrayInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

import GenericAside from "../aside/GenericAside";

export const ExperienceEdit = () => (
  <Edit mutationMode="pessimistic" aside={<GenericAside />}>
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
  </Edit>
);
