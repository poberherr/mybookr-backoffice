import {
  ArrayInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

import DollarInput from "../inputs/DollarInput";
import MilkdownInput from "../inputs/MilkdownInput";

export const ActivityEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        source="experience.id"
        reference="Experience"
        label="Experience"
      />
      <TextInput source="title" />
      <MilkdownInput source="description" />
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
