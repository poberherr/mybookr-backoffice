import * as React from "react";
import { useRecordContext } from "react-admin";
import { Chip } from "@mui/material";

const PaymentStatusField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const text = record?.[source] || "";

  const color = 
    text === "Pending" ? "warning" :
    text === "Expired" ? "error" :
    text === "Paid" ? "success" :
    text === "Settled" ? "success" :
    text === "XenditEnumDefaultFallback" ? "warning" :
    "default";

  return <Chip variant="outlined" label={text} color={color}/>;
};

export default PaymentStatusField;



