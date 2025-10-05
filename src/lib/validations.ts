import z from "zod";

export const signInSchema = z.object({
    identifier: z.string().min(1, "Username or email required"),
    password: z.string().min(6, "Password is required")
})

export const signUpSchema = z.object({
    username: z.string().min(2, "Username required" ),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password is required")
})