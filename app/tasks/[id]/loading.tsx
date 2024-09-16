import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { Heading, Flex, Card, Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const LoadingTaskDetail = () => {
  return (
    // <div>Loading...l</div>

    <Box className="max-w-xl">
      {" "}
      {/* <Heading>{task.title}</Heading> */}
      <Skeleton />
      <Flex gap="5">
        {" "}
        {/* <TaskStatusBadge status={task.status} /> */}
        <Skeleton width="5rem" />
        {/* <Text>{task.createdAt.toDateString()}</Text> */}
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        {/* <ReactMarkdown>{task.description} </ReactMarkdown> */}
        <Skeleton count={3} />
      </Card>{" "}
    </Box>
  );
};

export default LoadingTaskDetail;
