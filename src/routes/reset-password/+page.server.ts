import { superValidate, message } from "sveltekit-superforms";
import { resetPasswordSchema } from "$lib/schema";
import { zod4 } from "sveltekit-superforms/adapters";
import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import { APIError } from "better-auth";

export const load = async ({ url }) => {
	const resetPasswordForm = await superValidate(zod4(resetPasswordSchema));

	return {
		callbackURL: url.searchParams.get("callbackURL"),
		resetPasswordForm
	};
};

export const actions = {
	default: async ({ request, url }) => {
		const token = url.searchParams.get("token");
		const form = await superValidate(request, zod4(resetPasswordSchema));

		if (!token) return message(form, "Invalid token", { status: 400 });
		if (!form.valid) return message(form, "Invalid form", { status: 400 });

		const { password, confirmPassword } = form.data;
		if (password !== confirmPassword)
			return message(form, "Passwords do not match", { status: 400 });

		try {
			await auth.api.resetPassword({
				body: {
					newPassword: password,
					token
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return message(form, error.body?.message, { status: 500 });
			}
		}

		throw redirect(308, "/");
	}
};
