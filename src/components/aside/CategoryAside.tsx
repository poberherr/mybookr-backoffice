import React from "react";

import { Box, Divider, Typography } from "@mui/material";

import { Category } from "@/gql/graphql";
import {
  ChipField,
  ReferenceArrayField,
  ReferenceField,
  useRecordContext,
} from "react-admin";

import { decodeGlobalId } from "@/helpers/global-ids";

import Timestamps from "./Timestamps";

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

      <Timestamps record={record} />
    </Box>
  );
};

export default CategoryAside;
