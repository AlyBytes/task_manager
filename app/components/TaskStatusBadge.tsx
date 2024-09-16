import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

//utility type in TS that allows to define key-value pairs where keys and values have a particular type
const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

//we defined this statusMap outside of component because we don't need this every time to render - we just define it once
//this component should receive the Status as a Prop - we have a type of Status that is defined in Prisma Client , - a type which was generated based on our model
// so when using Prisma we don't have to explicitly define types for our Models - they are automatically generated 
const TaskStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default TaskStatusBadge;
