import type { PageServerLoad } from "./$types.js";
import { BETTER_AUTH_URL } from "$env/static/private";
import { superValidate, message } from "sveltekit-superforms";
import { loginSchema, signupSchema, forgotPasswordSchema } from "$lib/schema";
import { zod4 } from "sveltekit-superforms/adapters";
import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { APIError } from "better-auth";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, "/tabs");
	}

	const loginForm = await superValidate(zod4(loginSchema));
	const signupForm = await superValidate(zod4(signupSchema));
	const forgotPasswordForm = await superValidate(zod4(forgotPasswordSchema));

	return { loginForm, signupForm, forgotPasswordForm };
};

export const actions = {
	signup: async ({ request }) => {
		const form = await superValidate(request, zod4(signupSchema));

		if (!form.valid) {
			return message(form, "Unable to signup", {
				status: 401
			});
		}

		const name = `${form.data.firstName} ${form.data.lastName}`;

		if (form.data.password != form.data.confirmPassword) {
			return message(form, "Password do not match");
		}

		try {
			await auth.api.signUpEmail({
				body: {
					name,
					email: form.data.email,
					password: form.data.password
				}
			});
		} catch (err) {
			if (err instanceof APIError) {
				return fail(400, { message: err.message || "Signin failed" });
			}
			return fail(500, { message: "Unexpected error" });
		}

		return message(form, "Verification email sent");
	},
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
			return message(form, errorBody?.error?.message || "Login failed", {
				status: response.status as 400 | 401 | 403 | 404 | 500
			});
		}

		return message(form, "Login successful");
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
