import React from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import UpdateIcon from "@mui/icons-material/Update";

import { Box, Divider, Stack, Typography } from "@mui/material";

import { Category, ForeignEntities } from "@/gql/graphql";
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

import EntityHistory from "../EntityHistory";
import PersistentTabs from "../PersistentTabs";
import { RawDataTab } from "../tabs/RawDataTab";

interface ICategoryEdit extends Category {
  "parent.id": string;
  childrenIds: string[];
}

const CategoryAside: React.FC = () => {
  const record = useRecordContext<ICategoryEdit>();

  if (!record) {
    return null;
  }

  return (
    <Box width={300} ml={2} sx={{ padding: "2rem" }}>
      <Typography variant="h6">Category Information</Typography>
      <Divider sx={{ marginY: "1rem" }} />

      <Typography variant="body2" gutterBottom>
        <strong>ID:</strong> {decodeGlobalId(record.id).id} ({record.id})
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Depth:</strong> {record.depth}
      </Typography>

      <Divider sx={{ marginY: "1rem" }} />

      <Typography variant="h6">Parent</Typography>
      {record["parent.id"] ? (
        <ReferenceField source="parent.id" reference="Category" link="show">
          <ChipField source="name" />
        </ReferenceField>
      ) : (
        <Typography variant="body2">No parent category</Typography>
      )}

      <Divider sx={{ marginY: "1rem" }} />

      <Typography variant="h6">Children</Typography>
      {record["childrenIds"] && record["childrenIds"].length > 0 ? (
        <ReferenceArrayField
          source="childrenIds"
          reference="Category"
          label="Children"
        />
      ) : (
        <Typography variant="body2">No children</Typography>
      )}

      <Divider sx={{ marginY: "1rem" }} />

      <Typography variant="h6">Timestamps</Typography>
      <Stack spacing={1} mt={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <AccessTimeIcon fontSize="small" />
          <DateField source="createdAt" label="Created at" showTime />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <UpdateIcon fontSize="small" />
          <DateField source="updatedAt" label="Updated at" showTime />
        </Stack>
        {record.deletedAt && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <DeleteIcon fontSize="small" />
            <DateField source="deletedAt" label="Deleted at" showTime />
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export const CategoryEdit: React.FC = () => (
  <Edit aside={<CategoryAside />}>
    <PersistentTabs
      localStorageKey="category-edit-tabs"
      tabLabels={[
        { label: "Edit", icon: <EditIcon /> },
        { label: "History", icon: <HistoryIcon /> },
        { label: "Raw Data", icon: <DataObjectIcon /> },
      ]}
    >
      <SimpleForm>
        <TextInput source="name" label="Category Name" fullWidth />
        <TextInput source="path" label="Category Path" fullWidth />
        <NumberInput source="weight" label="Sort Weight" fullWidth />
      </SimpleForm>
      <EntityHistory type={ForeignEntities.Categories} />
      <RawDataTab />
    </PersistentTabs>
  </Edit>
);
