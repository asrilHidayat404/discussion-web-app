"use client"

import { startTransition, useActionState } from "react";
import { DeleteComment } from "../action/script";

const DeleteButton = ({id}: {id: string | undefined}) => {
    const [error, action, isLoading] = useActionState(DeleteComment, null)
    console.log({error});
    
  return (
    <button
      className="text-red-500 text-sm font-bold hover:underline"
      aria-label="Delete comment"
      onClick={(e) => {
        e.preventDefault()
        startTransition(() => action(id))
      }}
    >
      Delete 
    </button>
  );
};

export default DeleteButton;
