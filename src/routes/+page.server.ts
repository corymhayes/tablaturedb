import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";

// form validation
import { setError, superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { loginSchema, registerSchema } from "$lib/account-schema.js";

export const load = (async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		return redirect(303, "/tabs");
	}

	const loginForm = await superValidate(zod4(loginSchema));
	const registerForm = await superValidate(zod4(registerSchema));

	return { loginForm, registerForm };
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ locals, request }) => {
		const registerForm = await superValidate(request, zod4(registerSchema));

		if (!registerForm.valid) {
			return fail(400, { registerForm });
		}

		const account_info = {
			first_name: registerForm.data.first_name,
			last_name: registerForm.data.last_name,
			email: registerForm.data.email,
			password: registerForm.data.password,
			passwordConfirm: registerForm.data.password_confirm
		};

		try {
			await locals.pb.collection("users").create(account_info);
			await locals.pb.collection("users").requestVerification(registerForm.data.email.toString());
			await locals.pb
				.collection("users")
				.authWithPassword(registerForm.data.email.toString(), registerForm.data.password.toString());
		} catch {
			return setError(registerForm, "password", "Username/password are incorrect");
		}

		return { registerForm };
	},
	login: async ({ locals, request }) => {
		const loginForm = await superValidate(request, zod4(loginSchema));

		if (!loginForm.valid) {
			return fail(400, { loginForm });
		}

		try {
			await locals.pb
				.collection("users")
				.authWithPassword(loginForm.data.email.toString(), loginForm.data.password.toString());
		} catch {
			return (
				setError(loginForm, "email", "Username/password are incorrect"),
				setError(loginForm, "password", "Username/password are incorrect")
			);
		}

		return { loginForm };
	}
} satisfies Actions;
