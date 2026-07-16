import { z } from "zod";

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(8, "Password must be at least 8 characters")
});

export const signupSchema = z
	.object({
		firstName: z.string().max(50),
		lastName: z.string().max(50),
		email: z.email(),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(8)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

export const addTabSchema = z.object({
	song: z.string(),
	artist: z.string(),
	tuning: z.string(),
	link: z.url()
});

export const updateTabSchema = z.object({
	id: z.string(),
	song: z.string(),
	artist: z.string(),
	tuning: z.string(),
	link: z.url()
});

export const deleteTabSchema = z.object({
	id: z.string()
});

export const forgotPasswordSchema = z.object({
	email: z.email()
});

export const resetPasswordSchema = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(8)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

export const changeEmailSchema = z.object({
	email: z.email(),
	currentPassword: z.string().min(8, "Password must be at least 8 characters")
});

export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(8, "Password must be at least 8 characters"),
		newPassword: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(8)
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

export const addTuningSchema = z.object({
	tuning: z.string().max(50)
});

export const editTuningSchema = z.object({
	id: z.string(),
	name: z.string().max(50)
});

export type LoginSchema = typeof loginSchema;
export type SignupSchema = typeof signupSchema;
export type AddTabSchema = typeof addTabSchema;
export type UpdateTabSchema = typeof updateTabSchema;
export type DeleteTabSchema = typeof deleteTabSchema;
export type ForgotPasswordSchema = typeof forgotPasswordSchema;
export type ResetPasswordSchema = typeof resetPasswordSchema;
export type ChangeEmailSchema = typeof changeEmailSchema;
export type NewPasswordSchema = typeof changePasswordSchema;
export type AddTuningSchema = typeof addTuningSchema;
export type EditTuningSchema = typeof editTuningSchema;
