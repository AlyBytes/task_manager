import { z } from "zod"
//we extracted this code from our route.ts file to make it more generable and reusable by other files
//after we installed this package npm i @hookform/resolvers
//it allows react hook forms integrate with various data validation libraries like zod


//generate Interface based on our schema dynamically
const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, "Please describe new task in a few words")
})

export {taskSchema}
