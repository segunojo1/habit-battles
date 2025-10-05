"use client";

import AuthForm from "@/components/auth/auth-form";
import { signUpSchema } from "@/lib/validations";
import authService from "@/services/auth.service";
import React from "react";

const SignUp = () => {
  return (
    <div className="bg-[#0f172a] text-gray-300">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-sm">
          <AuthForm
            type="SIGNUP"
            schema={signUpSchema}
            defaultValues={{ username: "", email: "", password: "", confirmPassword: "" }}
            onSubmit={(data) => authService.signup(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
