import type { PageServerLoad } from "./$types.js";
import { redirect } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";

import { auth } from "$lib/server/auth";
import { APIError } from "better-auth";
import { signupSchema } from "$lib/schema.js";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, "/tabs");
	}

	const signupForm = await superValidate(zod4(signupSchema));

	return { signupForm };
};

export const actions = {
	signup: async ({ request }) => {
		const form = await superValidate(request, zod4(signupSchema));

		if (!form.valid) {
			return message(form, "Unable to sign up", { status: 400 });
		}

		try {
			await auth.api.signUpEmail({
				body: {
					name: `${form.data.firstName} ${form.data.lastName}`,
					email: form.data.email,
					password: form.data.password
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return message(form, error.message || "Unable to sign up", { status: 400 });
			}
			return message(form, "Unexpected error", { status: 500 });
		}

		return message(form, "Verification email sent");
	}
};
