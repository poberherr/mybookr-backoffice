import React from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UpdateIcon from "@mui/icons-material/Update";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

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
    <Box width={300} ml={2} sx={{ padding: "2rem" }}>
      <Typography variant="h6">Category Information</Typography>
      <Divider sx={{ marginY: "1rem" }} />

      <Typography variant="body2" gutterBottom>
        <strong>ID:</strong> {decodeGlobalId(record.id).id}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Global ID:</strong> {record.id}
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
      <Accordion sx={{ marginTop: "2rem" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="debug-content"
          id="debug-header"
        >
          <Typography variant="h6">Debug Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <pre
            style={{
              maxWidth: "100%",
              overflowX: "auto",
              fontSize: "0.75em",
            }}
          >
            <code>{JSON.stringify(record, null, 2)}</code>
          </pre>
        </AccordionDetails>
      </Accordion>
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
