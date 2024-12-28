"use client";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useActionState } from "react";
import { PostQuestion } from "../action/script";

const Form = () => {
  
    const [error, action, isLoading] = useActionState(PostQuestion, null)
  return (
    <div className="mb-8">
      <form action={action}>
        <textarea
          className="w-full p-4 border border-gray-300 rounded mb-4"
          placeholder="Ask your question"
          rows={4}
          name="question"
        />
        {error && <LoginLink className="text-center text-red-500 underline block">{error}</LoginLink>}
        <button type="submit" className="bg-black text-white py-2 px-4 rounded">
          Submit question
        </button>
      </form>
    </div>
  );
};

export default Form;
