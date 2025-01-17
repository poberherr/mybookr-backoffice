import * as React from "react";

import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot, { TimelineDotProps } from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";

import { ForeignEntities, Log, LogActions } from "@/gql/graphql";
import {
  DateField,
  ReferenceField,
  TextField,
  useGetList,
  useRecordContext,
} from "react-admin";

const EntityHistory: React.FC<{ type: ForeignEntities }> = ({ type }) => {
  const record = useRecordContext();

  const { data, total, isPending, error, refetch, meta } = useGetList<Log>(
    "Log",
    {
      filter: {
        id: record?.id || "",
        type,
      },
    },
  );

  if (isPending || !data || data?.length === 0) {
    return null;
  }

  return (
    <Timeline position="right">
      {data.map((log, i) => {
        let label = "Created";
        let color: TimelineDotProps["color"] = "success";
        if (log.action === LogActions.Update) {
          label = "Updated";
          color = "warning";
        }
        if (log.action === LogActions.Delete) {
          label = "Deleted";
          color = "error";
        }
        return (
          <TimelineItem key={log.id}>
            <TimelineOppositeContent color="text.secondary">
              <DateField record={log} source="date" showTime />
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={color}
                title={JSON.stringify(log.inputValue, null, 2)}
              />
              {i < data.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <span style={{ fontSize: "0.85em" }}>{label} by </span>
              <ReferenceField source="authorId" reference="User" record={log}>
                <TextField source="name" />
              </ReferenceField>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default EntityHistory;
