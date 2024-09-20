import * as React from "react";
import { useRecordContext } from "react-admin";

const TruncatedTextField = ({
  source,
  maxLength = 100,
}: {
  source: string;
  maxLength: number;
}) => {
  const record = useRecordContext();
  const text = record?.[source] || "";

  return (
    <span title={text}>
      {text.length > maxLength ? `${text.substring(0, maxLength)}...` : text}
    </span>
  );
};

export default TruncatedTextField;
