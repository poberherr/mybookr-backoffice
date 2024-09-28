import * as React from "react";

import { Chip } from "@mui/material";

import { useRecordContext } from "react-admin";

const BookingStatusField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const text = record?.[source] || "";

  const color =
    text === "PAYMENT_FINISHED" || text === "BOOKING_CONFIRMED"
      ? "success"
      : text === "PAYMENT_STARTED"
        ? "warning"
        : text === "PAYMENT_FAILED" || text === "BOOKING_CANCELLED"
          ? "error"
          : "default";

  return <Chip label={text} color={color} />;
};

export default BookingStatusField;
