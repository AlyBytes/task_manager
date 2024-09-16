// "use client";

// import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// // import SimpleMDE from "react-simplemde-editor";
// import { Controller, useForm } from "react-hook-form";
// import "easymde/dist/easymde.min.css";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createTaskSchema } from "@/app/validationSchema";
// import { z } from "zod";
// import ErrorMessage from "@/app/components/ErrorMessage";
// import Spinner from "@/app/components/Spinner";
// import {Task} from "@prisma/client"

// //lazy loading is dynamically loading a component; navigator is abrowser api and is not available on the serve; 
// // we can disable ssr as part of lazy loading neccesary when we have client side components that access browser apis
// const SimpleMDE = dynamic(()=> import('react-simplemde-editor'), {ssr:false})
// //we will make interface dynamic and more generic ; we generate Interface based on our Schema
// type TaskForm = z.infer<typeof createTaskSchema>;
// //we define interface that spacify the shape of our Form
// // interface TaskForm {
// //   title: string;
// //   description: string;
// // }

// //we will use AXIOS to send data to our API
// //we will have to make this a client comp becuase it is a form that requires user interaction and we cannot do that on the server
// const NewTaskPage = ({task}:{task?:Task}) => {
//   const router = useRouter();

//   //we will call this Form hook inside of our component; we specify the shape of our form in angle brackets; we call this func and get an obj
//   //we destructure that obj and grab register func; using that func we can register our input fields with react hook form so it can keep track of them
//   //formState obj repreents everything we need to know about our Form
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TaskForm>({
//     //this is how we integrate react hook forms with zod
//     //when calling useForm hook we pass a config obe and set resolver to zodResolver
//     resolver: zodResolver(createTaskSchema),
//   });
//   // console.log(register('title'))
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const onSubmit = handleSubmit(async (data) => {
//     // console.log(data)
//     try {
//       setIsSubmitting(true);
//       await axios.post("/api/tasks", data);
//       // this will redirect user back to issues page after submitting a new tesk
//       router.push("/tasks");
//     } catch (error) {
//       setIsSubmitting(false);
//       //show generic error message using state hook
//       setError("An unexpected error has ocurred");
//     }
//   });
//   return (
//     <>
//       <div className="max-w-xl ">
//         {error && (
//           <Callout.Root color="red" className="mb-5">
//             <Callout.Text> {error} </Callout.Text>{" "}
//           </Callout.Root>
//         )}
//         <form
//           className="space-y-5"
//           onSubmit={onSubmit}
//           // onSubmit={handleSubmit(async (data) => {
//           //   // console.log(data)
//           //   try {
//           //     setIsSubmitting(true)
//           //     await axios.post("/api/tasks", data);
//           //     // this will redirect user back to issues page after submitting a new tesk
//           //     router.push("/tasks");
//           //   } catch (error) {
//           //     setIsSubmitting(false);
//           //     //show generic error message using state hook
//           //     setError("An unexpected error has ocurred");
//           //   }
//           // })}
//         >
//           {/* New Task Page */}
//           {/* calling register func inside our TextField will register the input with react hook form and we have to spread it because it (obj) has 4 other properties */}
//           <TextField.Root
//             color="green"
//             variant="classic"
//             placeholder="New Task"
//             {...register("title")}
//           >
//             {/* <TextField.Input  /> */}
//           </TextField.Root>
//           {/* {errors.title &&  */}
//           <ErrorMessage>{errors.title?.message}</ErrorMessage>
//           {/* <TextArea
//           color="green"
//           variant="soft"
//           radius="large"
//           placeholder="Describe New Task"
//         /> ---------> Replaced this with Simple MDE MArkdown Editor*/}
//           {/* cannot use same "register" technique with SimpleMDE because it doesnt suport it, but we can use Contoller component from react hook form to work around */}
//           <Controller
//             name="description"
//             control={control}
//             defaultValue={task?.description}
//             render={({ field }) => (
//               <SimpleMDE placeholder="Describe New Task" {...field} />
//             )}
//           />
//           {/* {errors.description &&  */}
//           <ErrorMessage>{errors.description?.message}</ErrorMessage>
//           <Button disabled={isSubmitting}>
//             Submit New Task {isSubmitting && <Spinner />}{" "}
//           </Button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default NewTaskPage;



//we moved all above into a separate componennt to make it reusable like so...


// import TaskForm from '../_components/TaskForm' // instead of importing it statically we will import dynamically
import dynamic from 'next/dynamic'
import TaskFormSkeleton from './loading'

const TaskForm = dynamic(
  () => import('@/app/tasks/_components/TaskForm'),
  {ssr:false,
    // loading:()=> <p>Loading</p>
    loading:()=> <TaskFormSkeleton />
  }
)

const NewTaskPage = () => {
  return (
   <TaskForm />
  )
}

export default NewTaskPage