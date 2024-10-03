import React from "react";

import { Stack, Tooltip } from "@mui/material";

import { FieldProps, useRecordContext } from "react-admin";

const formatDate = (date: string | Date | undefined): string => {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h24",
  }).format(new Date(date));
};

export const SmartDateField: React.FC<Omit<FieldProps, "source">> = () => {
  const record = useRecordContext<{
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }>();

  // Short format for display
  const displayDate = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
  }).format(new Date(record?.createdAt || ""));

  const tooltipContent = [
    <div key="created">Created at: {formatDate(record?.createdAt)}</div>,
    record?.createdAt !== record?.updatedAt && (
      <div key="updated">Updated at: {formatDate(record?.updatedAt)}</div>
    ),
    record?.deletedAt && (
      <div key="deleted">Deleted at: ${formatDate(record.deletedAt)}</div>
    ),
  ].filter(Boolean);

  return (
    <Tooltip title={<Stack>{tooltipContent}</Stack>} arrow placement="right">
      <span style={{ whiteSpace: "nowrap" }}>{displayDate}</span>
    </Tooltip>
  );
};
