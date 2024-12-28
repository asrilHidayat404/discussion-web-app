"use client";
import React, { useActionState, useEffect, useState } from "react";
import { PostQuestion } from "../action/script";
import toast from "react-hot-toast";
const notify = (error: string) => toast.error(error);

type MessageStatus = {
  status: boolean,
  message: string | undefined
}

const Form = () => {
  const [error, action, isLoading] = useActionState(PostQuestion, null);
  useEffect(() => {
    if (error?.error) {
      notify(error.error);
    }
  }, [error]);
  const [message, setMessage] = useState<MessageStatus>(
    {
      status: true, 
      message: ""
    }
  )
  console.log(message?.message?.length);
  
  return (
    <div className="mb-8">
      <form action={action}>
        <textarea
          className="w-full p-4 border border-gray-300 rounded mb-4"
          placeholder="Ask your question"
          rows={4}
          name="question"
          value={message.message}
          required
          onChange={(e) => {
            const value = e.target.value.trim();
            setMessage({
              status: value.length === 0,
              message: value,
            });
          }}
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded"
          disabled={isLoading || message?.status}
        >
          Submit question
        </button>
        {/* {error && <LoginLink className="text-center text-red-500 underline block">s</LoginLink>} */}
      </form>
    </div>
  );
};

export default Form;
