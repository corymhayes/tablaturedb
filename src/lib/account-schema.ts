import { z } from "zod/v4";

export const loginSchema = z.object({
	email: z.email({ pattern: z.regexes.email }),
	password: z.string().min(8)
});

export const registerSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email: z.email().nonoptional(),
	password: z.string().nonempty().min(8),
	password_confirm: z.string()
});

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;
