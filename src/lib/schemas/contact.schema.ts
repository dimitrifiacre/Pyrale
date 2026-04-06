import { z } from "zod"

export const CONTACT_CONSTRAINTS = {
  pseudoMin: 3,
  pseudoMax: 16,
  messageMin: 50,
  messageMax: 2000,
} as const

export interface ContactSchemaMessages {
  pseudoMin: string
  pseudoMax: string
  emailInvalid: string
  messageMin: string
  messageMax: string
}

export function createContactSchema(messages: ContactSchemaMessages) {
  return z.object({
    pseudo: z
      .string()
      .min(CONTACT_CONSTRAINTS.pseudoMin, messages.pseudoMin)
      .max(CONTACT_CONSTRAINTS.pseudoMax, messages.pseudoMax),
    email: z.string().email(messages.emailInvalid),
    message: z
      .string()
      .min(CONTACT_CONSTRAINTS.messageMin, messages.messageMin)
      .max(CONTACT_CONSTRAINTS.messageMax, messages.messageMax),
    company: z.string(), // honeypot – never shown to users
  })
}

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>
