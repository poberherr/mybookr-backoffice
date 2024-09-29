import React from "react";

import { Create, NumberInput, SimpleForm, TextInput } from "react-admin";

export const CategoryCreate: React.FC = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Category Name" fullWidth />
      <TextInput source="path" label="Category Path" fullWidth />
      <NumberInput source="weight" label="Sort Weight" fullWidth />
    </SimpleForm>
  </Create>
);
