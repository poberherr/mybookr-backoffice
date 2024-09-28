import React from "react";

import { Stack, Tooltip } from "@mui/material";

import { useRecordContext } from "react-admin";

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

export const SmartDateField: React.FC<{
  label: string;
}> = ({ label }) => {
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
    <Tooltip
      title={
        tooltipContent ? (
          <Stack>{tooltipContent}</Stack>
        ) : (
          `${label} ${displayDate}`
        )
      }
      arrow
      placement="right"
    >
      <span>{displayDate}</span>
    </Tooltip>
  );
};
