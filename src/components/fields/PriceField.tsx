import * as React from "react";
import { useRecordContext } from "react-admin";
import { Chip } from "@mui/material";

const PriceField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const price = record?.[source] || "";

  const currency = record?.currency || "USD";

  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(
        price
      );
  } catch (error) {
    return `${price} ${currency}`;
  }

};

export default PriceField;
