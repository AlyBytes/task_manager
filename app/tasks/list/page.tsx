import React from "react";
import { Button, Table } from "@radix-ui/themes";
// import Link from "next/link";
import Link from "../../components/Link";
import prisma from "@/prisma/client";
import TaskStatusBadge from "../../components/TaskStatusBadge";
import delay from "delay";
import TaskActions from "./TaskActions";

const TasksPage = async () => {
  //here we will use prisma to fetch from DB

  const tasks = await prisma.task.findMany();
  // await delay(2000);
  return (
    //we add button comp, then Link component to route our button to a page for creating a new task
    <div>
      <TaskActions />
      {/* <div className="mb-5">
        <Button>
          {" "}
          <Link href="/tasks/new"> New Task</Link>
        </Button>
      </div> */}

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Task</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>{" "}
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                {/* <Link href={`/tasks/${task.id}`}>  {task.title}</Link>  -----> we're replacing Link from  nextJS with the Link that comes from RadixUI - but we loose client side navigation and the whole page reloads */}
                <Link href={`/tasks/${task.id}`}>{task.title}</Link>

                {/* <div className="block md:hidden">{task.status}</div> */}
                <div className="block md:hidden">
                  <TaskStatusBadge status={task.status} />{" "}
                </div>
              </Table.Cell>
              {/* <Table.Cell className="hidden md:table-cell">{task.status}</Table.Cell> --------> instead is below*/}
              <Table.Cell className="hidden md:table-cell">
                <TaskStatusBadge status={task.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.createdAt.toDateString()}{" "}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TasksPage;
