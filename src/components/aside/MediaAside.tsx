import React from "react";

import { Box, Divider, Typography } from "@mui/material";

import { Media } from "@/gql/graphql";
import { ImageField, useRecordContext } from "react-admin";

import { decodeGlobalId } from "@/helpers/global-ids";

import Timestamps from "./Timestamps";

const MediaAside: React.FC = () => {
  const record = useRecordContext<Media>();

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

      <Typography variant="body2" gutterBottom style={{ whiteSpace: "nowrap" }}>
        <strong>Type:</strong> {record.mediaType}
      </Typography>

      <Typography variant="body2" gutterBottom style={{ whiteSpace: "nowrap" }}>
        <strong>Dimensions:</strong> {record.width}px{" "}
        <span style={{ fontSize: "0.69em" }}>✕</span> {record.height}px
      </Typography>

      <Typography variant="body2" gutterBottom style={{ whiteSpace: "nowrap" }}>
        <strong>Aspect Ratio:</strong> {record.aspectRatio}
      </Typography>

      <ImageField source="url" record={record} />

      <Divider sx={{ marginY: "1rem" }} />

      <Timestamps record={record} />
    </Box>
  );
};

export default MediaAside;
