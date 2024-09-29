import React from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Box, Divider, Stack, Typography } from "@mui/material";

import { Category } from "@/gql/graphql";
import {
  ChipField,
  DateField,
  Edit,
  NumberInput,
  ReferenceArrayField,
  ReferenceField,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";

import { decodeGlobalId } from "@/helpers/global-ids";

const CategoryAside: React.FC = () => {
  const record = useRecordContext<
    Category & {
      "parent.id": string;
      childrenIds: string[];
    }
  >();

  if (!record) {
    return null;
  }

  return (
    <Box width={300} ml={2}>
      <Typography variant="h6" mb="4">
        Id: {decodeGlobalId(record.id).id}
      </Typography>
      <Divider />
      <Typography variant="h6" mb="4">
        Global Id: {record.id}
      </Typography>
      <Divider />
      <Typography variant="h6" mb="4">
        Depth: {record.depth}
      </Typography>
      <Divider />
      <Typography variant="h6">Parent:</Typography>
      <Divider />
      <Box my={2}>
        {record["parent.id"] ? (
          <ReferenceField source="parent.id" reference="Category">
            <ChipField source="name" />
          </ReferenceField>
        ) : (
          <Typography variant="body2">No parent category</Typography>
        )}
      </Box>

      <Typography variant="h6">Children:</Typography>
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

      <Typography variant="h6">Timestamps:</Typography>
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
        {record.deletedAt && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <DeleteIcon />
            <DateField source="deletedAt" label="Deleted at" showTime />
          </Stack>
        )}
      </Stack>

      <Typography variant="h6">Debug:</Typography>
      <Divider />
      <pre style={{ fontSize: "0.8em", maxWidth: "100%", padding: "0.5rem" }}>
        <code>{JSON.stringify(record, null, 2)}</code>
      </pre>
    </Box>
  );
};

export const CategoryEdit: React.FC = () => (
  <Edit aside={<CategoryAside />}>
    <SimpleForm>
      <TextInput source="name" label="Category Name" fullWidth />
      <TextInput source="path" label="Category Path" fullWidth />
      <NumberInput source="weight" label="Sort Weight" fullWidth />
    </SimpleForm>
  </Edit>
);
