import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import prisma from "@/prisma/client";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import EditButton from "./EditButton";
import TaskDetails from "./TaskDetails";
import DeleteTaskButton from "./DeleteTaskButton";

interface Props {
  params: { id: string };
}

const TaskDetailPage = async ({ params }: Props) => {
  //   if (typeof params.id !== 'number') notFound();

  //we will use Prisma to fetch a task from DB
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return (
    // <div>
    // <Grid columns="2">
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      {/* <div>TaskDetailPage</div>  */}
      <Box className="md:col-span-4">
        <TaskDetails task={task} />
      </Box>
      <Box>
        <Flex direction="column" gap="4"> 
        <EditButton taskId={task.id} />
        <DeleteTaskButton taskId={task.id} />
      </Flex></Box>
    </Grid>
    // </div>
  );
};

export default TaskDetailPage;
