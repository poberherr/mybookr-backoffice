import * as React from "react";

import { Chip } from "@mui/material";

import { useRecordContext } from "react-admin";

const PaymentStatusField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const text = record?.[source] || "";

  const color =
    text === "Pending"
      ? "warning"
      : text === "Expired"
        ? "error"
        : text === "Paid"
          ? "success"
          : text === "Settled"
            ? "success"
            : text === "XenditEnumDefaultFallback"
              ? "warning"
              : "default";

  return <Chip variant="outlined" label={text} color={color} />;
};

export default PaymentStatusField;
