import type { PageServerLoad } from "./$types.js";
import { BETTER_AUTH_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

import { loginSchema, forgotPasswordSchema } from "$lib/schema";
import { auth } from "$lib/server/auth";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, "/tabs");
	}

	const loginForm = await superValidate(zod4(loginSchema));
	const forgotPasswordForm = await superValidate(zod4(forgotPasswordSchema));

	return { loginForm, forgotPasswordForm };
};

export const actions = {
	signin: async ({ request }) => {
		const form = await superValidate(request, zod4(loginSchema));

		if (!form.valid) {
			return fail(400, form.errors);
		}

		const response = await auth.api.signInEmail({
			body: {
				email: form.data.email,
				password: form.data.password
			},
			asResponse: true
		});

		if (response.status !== 200) {
			const errorBody = await response.json().catch(() => {});
			return message(form, errorBody?.error?.message || "User/password not found", {
				status: response.status as 400 | 401 | 403 | 404 | 500
			});
		}

		throw redirect(303, "/tabs");
	},
	forgotPassword: async ({ request }) => {
		const form = await superValidate(request, zod4(forgotPasswordSchema));

		if (!form.valid) {
			return fail(400, form.errors);
		}

		const { email } = form.data;

		const data = await auth.api.requestPasswordReset({
			body: {
				email,
				redirectTo: BETTER_AUTH_URL
			}
		});

		if (data.status) {
			return { form };
		}
	}
};
