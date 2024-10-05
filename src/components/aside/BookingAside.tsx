import React from "react";

import { Box, Divider, Typography } from "@mui/material";

import { Booking } from "@/gql/graphql";
import { DateField, ReferenceField, useRecordContext } from "react-admin";

import { decodeGlobalId } from "@/helpers/global-ids";

import Timestamps from "./Timestamps";

const BookingAside: React.FC = () => {
  const record = useRecordContext<Booking>();

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
        <strong>Reference Code:</strong> {record.referenceCode}
      </Typography>

      <Typography variant="body2" gutterBottom style={{ whiteSpace: "nowrap" }}>
        <strong>Booked Date:</strong>{" "}
        <DateField record={record} source="bookedDate" />
      </Typography>

      <Divider sx={{ marginY: "1rem" }} />

      <Typography variant="h6">Activity:</Typography>

      <ReferenceField
        source="activity.id"
        reference="Activity"
        record={record}
      />

      <Divider sx={{ marginY: "1rem" }} />

      <Timestamps record={record} />
    </Box>
  );
};

export default BookingAside;
