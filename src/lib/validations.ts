import z from "zod";

export const signInSchema = z.object({
    identifier: z.string().min(1, "Username or email required"),
    password: z.string().min(6, "Password is required")
})