import { Table } from "@radix-ui/themes";
import React from "react";
import TaskStatusBadge from "../../components/TaskStatusBadge";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TaskActions from "./TaskActions";
//when nextJS finds a loading file next to a page file it will load this file while the page component is being rendered

const LoadingTaskPage = () => {
  const tasks = [1, 2, 3, 4, 5];

  return (
    // <div>Loading...</div>
    <div>
      <div>
        <TaskActions />
      </div>
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
            <Table.Row key={task}>
              <Table.Cell>
                <Skeleton />
                {/* <div className="block md:hidden">{task.status}</div> */}
                <div className="block md:hidden">
                  <Skeleton />{" "}
                </div>
              </Table.Cell>
              {/* <Table.Cell className="hidden md:table-cell">{task.status}</Table.Cell> --------> instead is below*/}
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingTaskPage;
