"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useActionState } from "react";
import { PostQuestion } from "../action/script";

const Form = () => {
  
    const [state, action, isLoading] = useActionState(PostQuestion, null)
  return (
    <div className="mb-8">
      <form action={action}>
        <textarea
          className="w-full p-4 border border-gray-300 rounded mb-4"
          placeholder="Ask your question"
          rows={4}
          name="question"
        />
        <button type="submit" className="bg-black text-white py-2 px-4 rounded">
          Submit question
        </button>
      </form>
    </div>
  );
};

export default Form;
