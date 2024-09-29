import React from "react";

import { useTheme } from "@mui/material";

import { useRecordContext } from "react-admin";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialOceanic,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

export const RawDataTab: React.FC = () => {
  const record = useRecordContext();
  const theme = useTheme();

  const codeStyle =
    theme.palette.mode === "dark" ? materialDark : materialOceanic;

  return (
    <div style={{ fontSize: "0.85em" }}>
      <SyntaxHighlighter language="json" style={codeStyle}>
        {JSON.stringify(record, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
};
