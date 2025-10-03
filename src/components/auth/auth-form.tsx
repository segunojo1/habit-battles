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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                    type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="cursor-pointer">
            {loading ? "Loading..." : isSignIn ? "Login" : "Sign up"}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
