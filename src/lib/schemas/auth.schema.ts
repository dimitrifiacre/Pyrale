import { z } from "zod"

export const registerSchema = z
  .object({
    username: z.string().min(3).max(32),
    email: z.email(),
    password: z.string().min(8).max(72),
    confirmPassword: z.string().min(1),
    terms: z.literal(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional(),
})

export type RegisterPayload = z.infer<typeof registerSchema>
export type LoginPayload = z.infer<typeof loginSchema>
