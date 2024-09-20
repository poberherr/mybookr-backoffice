import { decodeGlobalId } from "@/helpers/global-ids";
import * as React from "react";
import { useRecordContext } from "react-admin";

const GlobalIdTextField = ({ source }) => {
  const record = useRecordContext();
  const text = record?.[source] || "";
  const realId = decodeGlobalId(text)

  return (
    <span title={text}>
      {realId.id}
    </span>
  );
};

export default GlobalIdTextField;
