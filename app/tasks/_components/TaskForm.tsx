"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import dynamic from "next/dynamic";
// import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Task } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });    ----> apparently we're not dynamically loading it anymore

type TaskFormData = z.infer<typeof taskSchema>;

// interface Props{
//   task?:Task
// }

const TaskForm = ({ task }: { task?: Task }) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if(task) 
        await axios.patch(`/api/tasks/${task.id}`, data);
      else
        await axios.post("/api/tasks", data);
      // this will redirect user back to issues page after submitting a new task
      router.push("/tasks/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);  
      console.error('Error updating task:', error);
      //show generic error message using state hook
      setError("An unexpected error has ocurred");
    }
  });
  return (
    <>
      <div className="max-w-xl ">
        {error && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>{" "}
          </Callout.Root>
        )}
        <form className="space-y-5" onSubmit={onSubmit}>
          <TextField.Root
            color="green"
            variant="classic"
            defaultValue={task?.title}
            placeholder="New Task"
            {...register("title")}>
            {/* <TextField.Input  /> */}</TextField.Root>
          {/* {errors.title &&  */}
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          {/* <TextArea
          color="green"
          variant="soft"
          radius="large"
          placeholder="Describe New Task"
        /> ---------> Replaced this with Simple MDE MArkdown Editor*/}
          {/* cannot use same "register" technique with SimpleMDE because it doesnt suport it, but we can use Contoller component from react hook form to work around */}
          <Controller
            name="description"
            control={control}
            defaultValue={task?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Describe New Task" {...field} />
            )}/>
          {/* {errors.description &&  */}
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button disabled={isSubmitting}>
            {task ? "Update Task" : "Submit New Task"}{" "}
            {isSubmitting && <Spinner />}{" "}
          </Button>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
