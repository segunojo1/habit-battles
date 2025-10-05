"use client";

import AuthForm from "@/components/auth/auth-form";
import { signInSchema } from "@/lib/validations";
import authService from "@/services/auth.service";
import React from "react";

const Login = () => {
  return (
    <div className="bg-[#0f172a] text-gray-300">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-sm">
          <AuthForm
            type="SIGNIN"
            schema={signInSchema}
            defaultValues={{ identifier: "", password: "" }}
            onSubmit={authService.login}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
