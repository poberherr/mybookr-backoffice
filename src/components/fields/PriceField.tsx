import { useRecordContext } from "react-admin";

const PriceField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const price = record?.[source] || "";

  const currency = record?.currency || "USD";

  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(
        price / 100
      );
  } catch {
    return `${price / 100} ${currency}`;
  }

};

export default PriceField;
