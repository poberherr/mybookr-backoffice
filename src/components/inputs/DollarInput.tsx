import * as React from "react";
import { NumberInput, NumberInputProps } from "react-admin";

const DollarInput = (props: NumberInputProps) => (
  <NumberInput
    {...props}
    format={(value) => {
      // Convert cents to dollars and format to 2 decimal places
      return value ? (value / 100).toFixed(2) : "";
    }}
    parse={(value) => {
      // Convert dollars back to cents
      return value ? Math.round(parseFloat(value) * 100) : "";
    }}
  />
);

export default DollarInput;
