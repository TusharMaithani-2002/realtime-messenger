"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div
      className="py-4 px-4 bg-white border-t 
        flex items-center gap-2 lg:gap-4 w-full
        "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="xokfxu1b"
      >
        <HiPhoto size={30} className="text-purple-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          placeholder="Write a message"
          required
        />

        <button
          type="submit"
          className="
        rounded-full
        p-2
        bg-purple-600
        cursor-pointer
        hover:bg-purple-700
        transition
        "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
