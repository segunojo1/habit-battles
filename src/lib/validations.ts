import z from "zod";

export const signInSchema = z.object({
    Email: z.string().min(1, "Username or email required"),
    Password: z.string().min(5, "Password is required")
})

export const signUpSchema = z.object({
    username: z.string().min(2, "Username required" ),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password is required"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})