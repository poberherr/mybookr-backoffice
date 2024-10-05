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
import DollarInput from "../inputs/DollarInput";

export const ActivityEdit = () => (
  <Edit mutationMode="pessimistic" aside={<GenericAside />}>
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
  </Edit>
);
