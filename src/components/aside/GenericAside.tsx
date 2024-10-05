import React from "react";

import { Box, Divider, Typography } from "@mui/material";

import { useRecordContext } from "react-admin";

import { decodeGlobalId } from "@/helpers/global-ids";

import Timestamps from "./Timestamps";

const GenericAside: React.FC = () => {
  const record = useRecordContext<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }>();

  if (!record) {
    return null;
  }

  return (
    <Box width={300} ml={2} sx={{ padding: "2rem" }}>
      <Typography variant="h6">Meta Information</Typography>
      <Divider sx={{ marginY: "1rem" }} />

      <Typography variant="body2" gutterBottom style={{ whiteSpace: "nowrap" }}>
        <strong>ID:</strong> {decodeGlobalId(record.id).id} ({record.id})
      </Typography>

      <Divider sx={{ marginY: "1rem" }} />

      <Timestamps record={record} />
    </Box>
  );
};

export default GenericAside;
