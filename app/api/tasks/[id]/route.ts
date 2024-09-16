import { taskSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest, {params}: {params:{id:string}}) {
    const body = await request.json();
  
    const validation= taskSchema.safeParse(body); //this returns and obj we store itin a var
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400}) //more "friendly" way to read error messages; we will need to validate some data like unique username on server side 
        // return NextResponse.json(validation.error.errors, {status: 400})
    //otherwise we should store this task in our DB -  to do that we need to import Prisma client; ther should always be a single isntance of Prisma client
    const task = await prisma.task.findUnique({
        where:{id:parseInt(params.id)}
      })
    if (!task)    
        return NextResponse.json({error:"Invalid Issue"}, {status:400})
    const updatedTask = await prisma.task.update({
        where:{id:task.id},
        data:{
            title:body.title,
            description:body.description
        }
    });
    return NextResponse.json(updatedTask);
}



export async function DELETE(request:NextRequest, {params}: {params:{id:string}}){
    const task = await prisma.task.findUnique({
        where:{id:parseInt(params.id)}
    })

    if(!task) return NextResponse.json({error:'Invalid Task'}, {status:404});
    
    await prisma.task.delete({ where:{id:parseInt(params.id)}});

    return NextResponse.json({})
}