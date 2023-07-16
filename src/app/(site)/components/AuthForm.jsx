"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import {BsGithub, BsGoogle} from 'react-icons/bs';

function AuthForm() {
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") setVariant("REGISTER");
    else setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // axios register
    }

    if (variant == "LOGIN") {
      // next auth sign in
    }
  };

  const socialAction = (action) => {
    setIsLoading(true);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input register={register} id="name" label="name" errors={errors} />
          )}
          <Input
            id="email"
            label="email address"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="password"
            type="password"
            register={register}
            errors={errors}
          />

          <Button disabled={isLoading} type="submit" fullWidth>
            {variant === "LOGIN" ? "LOGIN" : "REGISTER"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-300" />
            </div>

            <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                    Or continue with
                </span>
            </div>
          </div>

            <div className="mt-6 flex gap-2">
                <AuthSocialButton icon= {BsGithub} onClick={()=>socialAction('github')}/>
                <AuthSocialButton icon= {BsGoogle} onClick={()=>socialAction('google')}/>
            </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
                {variant === "LOGIN" ? "New to Messenger?" : "Already have an account?"}
            </div>
            <div onClick={toggleVariant}
            className="underline cursor-pointer"
            >
                {variant === "LOGIN"?"Create an account?":"Log in"}
            </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
