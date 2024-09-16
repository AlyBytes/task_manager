import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'   
import prisma from "@/prisma/client";
import {taskSchema} from '../../validationSchema'


export async function POST(request:NextRequest){
    //we get this request "body" - to make sure we don't get bad data we use validation - zod; install zod 
    const body = await request.json();
    const validation= taskSchema.safeParse(body); //this returns and obj we store itin a var
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400}) //more "friendly" way to read error messages; we will need to validate some data like unique username on server side 
        // return NextResponse.json(validation.error.errors, {status: 400})
    //otherwise we should store this task in our DB -  to do that we need to import Prisma client; ther should always be a single isntance of Prisma client
    const newTask = await prisma.task.create({
        data:{title:body.title, description: body.description}
    })
    return NextResponse.json(newTask, {status:201})
}