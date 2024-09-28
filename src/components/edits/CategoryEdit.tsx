import React from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Box, Divider, Stack, Typography } from "@mui/material";

import {
  ChipField,
  DateField,
  Edit,
  NumberInput,
  ReferenceArrayField,
  ReferenceArrayInput,
  ReferenceField,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";

import { decodeGlobalId } from "@/helpers/global-ids";

const CategoryAside: React.FC = () => {
  const record = useRecordContext();

  return (
    <Box width={300} ml={2}>
      <Typography variant="h6" mb="4">
        Depth: {record?.depth}
      </Typography>
      <Typography variant="h6">Parent</Typography>
      <Divider />
      <Box my={2}>
        {record && record["parent.id"] ? (
          <ReferenceField source="parent.id" reference="Category">
            <ChipField source="name" />
          </ReferenceField>
        ) : (
          <Typography variant="body2">No parent category</Typography>
        )}
      </Box>

      <Typography variant="h6">Children</Typography>
      <Divider />
      <Box my={2}>
        {record && record["childrenIds"] ? (
          <ReferenceArrayField
            source="childrenIds"
            reference="Category"
            label="Children"
          />
        ) : (
          <Typography variant="body2">No children</Typography>
        )}
      </Box>

      <Typography variant="h6">Timestamps</Typography>
      <Divider />
      <Stack spacing={2} mt={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <AccessTimeIcon />
          <DateField source="createdAt" label="Created at" showTime />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <UpdateIcon />
          <DateField source="updatedAt" label="Updated at" showTime />
        </Stack>
        {record?.deletedAt && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <DeleteIcon />
            <DateField source="deletedAt" label="Deleted at" showTime />
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export const CategoryEdit: React.FC = () => (
  <Edit aside={<CategoryAside />}>
    <SimpleForm>
      {/* Basic Details */}
      <TextInput
        source="id"
        label="Category ID"
        disabled
        fullWidth
        format={(v) => decodeGlobalId(v).id}
      />
      <TextInput source="name" label="Category Name" fullWidth />
      <TextInput source="path" label="Category Path" fullWidth />
      <NumberInput source="weight" label="Sort Weight" fullWidth />

      {/* Relations */}
      <Typography variant="h6" mt={4}>
        Relations
      </Typography>
      <Divider />
      <Box mt={2}>
        <ReferenceArrayInput
          source="childrenIds"
          reference="Category"
          label="Children Categories"
          format={(value) => value.map((v: any) => v.id)}
          parse={(value) => value.map((v: any) => ({ id: v }))}
        >
          <SelectInput
            optionText={(record) => `${record.path} - ${record.name}`}
          />
        </ReferenceArrayInput>
      </Box>
    </SimpleForm>
  </Edit>
);
