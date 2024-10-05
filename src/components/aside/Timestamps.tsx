import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import UpdateIcon from "@mui/icons-material/Update";

import { Stack, Typography } from "@mui/material";

import { DateField } from "react-admin";

const Timestamps: React.FC<{
  record: {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  };
}> = ({ record }) => (
  <>
    <Typography variant="h6">Timestamps</Typography>
    <Stack spacing={1} mt={1}>
      <Stack direction="row" alignItems="center" spacing={1} title="Created at">
        <MoreTimeIcon fontSize="small" />
        <DateField
          source="createdAt"
          showTime
          style={{ whiteSpace: "nowrap" }}
        />
      </Stack>
      {record.createdAt !== record.updatedAt && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          title="Updated at"
        >
          <UpdateIcon fontSize="small" />
          <DateField
            source="updatedAt"
            showTime
            style={{ whiteSpace: "nowrap" }}
          />
        </Stack>
      )}
      {record.deletedAt && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          title="Deleted at"
        >
          <DeleteIcon fontSize="small" />
          <DateField
            source="deletedAt"
            showTime
            style={{ whiteSpace: "nowrap" }}
          />
        </Stack>
      )}
    </Stack>
  </>
);

export default Timestamps;
