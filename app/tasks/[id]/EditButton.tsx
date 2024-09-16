import { MagicWandIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EditButton = ({taskId}:{taskId:number}) => {
  return (
    <Button>
    <MagicWandIcon/>
    <Link href={`/tasks/edit/${taskId}`}>Edit Task</Link>
    </Button>
  )
}

export default EditButton