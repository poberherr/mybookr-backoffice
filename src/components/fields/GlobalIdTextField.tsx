import * as React from "react";
import { decodeGlobalId } from "@/helpers/global-ids";
import { useRecordContext } from "react-admin";

const GlobalIdTextField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const text = record?.[source] || "";
  const realId = decodeGlobalId(text);

  return <span title={text}>{realId.id}</span>;
};

export default GlobalIdTextField;
