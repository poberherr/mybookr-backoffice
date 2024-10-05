import { useRecordContext } from "react-admin";

import { dateStringToDate, formatDate } from "@/helpers/date";

const FormattedDateField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const date = record?.[source] || "";

  return formatDate(dateStringToDate(date));
};

export default FormattedDateField;
