import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import UpdateIcon from "@mui/icons-material/Update";
import { Stack, Tooltip } from "@mui/material";

import { useRecordContext, WrapperField } from "react-admin";

export const SmartDateField: React.FC<{
  source: string;
  label: string;
  icon: React.ReactNode;
}> = ({ source, label, icon }) => {
  const record = useRecordContext();
  const date = record?.[source];

  if (!date) return null;

  // Short format for display
  const displayDate = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));

  // Verbose format for tooltip
  const tooltipDate = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "long",
  }).format(new Date(date));

  return (
    <Tooltip title={`${label} ${tooltipDate}`} arrow>
      <Stack direction="row" alignItems="center" spacing={1}>
        {icon}
        <span>{displayDate}</span>
      </Stack>
    </Tooltip>
  );
};

export const createUpdateDeleteComboField = (
  <WrapperField label="Dates" sortBy="createdAt">
    <Stack spacing={0} mb={2} fontSize={"0.8em"} color={"GrayText"}>
      <SmartDateField
        source="createdAt"
        label="Created at"
        icon={<HourglassTopIcon fontSize={"small"} />}
      />
      <SmartDateField
        source="updatedAt"
        label="Updated at"
        icon={<UpdateIcon fontSize={"small"} />}
      />
      <SmartDateField
        source="deletedAt"
        label="Deleted at"
        icon={<DeleteIcon fontSize={"small"} />}
      />
    </Stack>
  </WrapperField>
);
