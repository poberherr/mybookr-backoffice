import * as React from "react";

import { useRecordContext } from "react-admin";

import { decodeGlobalId } from "@/helpers/global-ids";

const GlobalIdTextField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const text = record?.[source] || "";
  const realId = decodeGlobalId(text);

  return <span title={text}>{realId.id}</span>;
};

export default GlobalIdTextField;
