import * as React from "react";
import { useRecordContext } from "react-admin";

const DebugField = () => {
  const record = useRecordContext();
  return (
    <pre>
      <code>{JSON.stringify(record, null, 2)}</code>
    </pre>
  );
};

export default DebugField;
