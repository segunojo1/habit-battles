"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FIELD_NAMES, FIELD_TYPES } from "@/lib/constants";
import Link from "next/link";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });

interface Props<T extends FieldValues> {
  type: "SIGNIN" | "SIGNUP";
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isSignIn = type == "SIGNIN";

  const form: UseFormReturn<FieldValues, any, T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    setLoading(true);

    const result = await onSubmit(data);
    if (result.success) {
      toast(isSignIn ? "Logged in successfully!" : "Signed up successfully!");
      router.push("/");
    } else {
      toast(isSignIn ? "Login failed" : "Sign up failed");
    }
  };

  return (
    <div className="nunito-sans w-full flex flex-col items-center mb-8">
      
      <h1 className="nunito-sans text-2xl font-bold text-slate-200">
        Habit Battles ⚔️
      </h1>
      <p className="text-slate-200 nunito-sans">
        {isSignIn ? "Sign in to Habit Battle" : "Sign up on Habit Battle"}
      </p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 w-[400px]">
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={field.name}
                    type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                    {...field}
                    className="form-input h-full bg-slate-800 border-slate-700 placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500 block rounded-md !p-3 text-slate-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {isSignIn && (
          <div className="text-right">
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-slate-300">Forgot Password?</Link>
          </div>
        )}
        <Button type="submit" className="nunito-sans h-full w-full flex justify-center !py-3 px-4 border border-transparent !rounded-md shadow-sm text-base font-semibold text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 cursor-pointer">
            {loading ? "Loading..." : isSignIn ? "Login" : "Sign up"}
        </Button>
      </form>
      <p className="text-center mt-6 text-sm text-slate-500">
        {isSignIn ? "Dont have an account?" : "Already have an account?"}
         <Link href={isSignIn ? "/auth/sign-up" : "/auth/login"} className="font-medium text-purple-400 hover:text-purple-300">{isSignIn ? "Sign Up" : "Login"}</Link>
      </p>
    </Form>
    </div>
  );
};

export default AuthForm;
