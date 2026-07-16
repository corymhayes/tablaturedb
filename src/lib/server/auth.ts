import { BETTER_AUTH_URL, BETTER_AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { db } from "./db";
import { getRequestEvent } from "$app/server";
import { resend } from "./resend";

export const auth = betterAuth({
	baseURL: BETTER_AUTH_URL,
	secret: BETTER_AUTH_SECRET,
	user: {
		changeEmail: {
			enabled: true,
			sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
				void resend.emails.send({
					from: "TablatureDB <support@corymhayes.com>",
					to: user.email,
					subject: "Verify your email",
					template: {
						id: "change-email",
						variables: {
							first_name: user.name,
							new_email: newEmail,
							verification_url: url
						}
					}
				});
			}
		}
	},
	database: drizzleAdapter(db, {
		provider: "pg"
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }) => {
			resend.emails.send({
				from: "TablatureDB <support@corymhayes.com>",
				to: user.email,
				subject: "Reset your password",
				template: {
					id: "password-reset",
					variables: {
						first_name: user.name,
						reset_password_url: `${BETTER_AUTH_URL}/reset-password?token=${token}`
					}
				}
			});
		}
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			resend.emails.send({
				from: "TablatureDB <support@corymhayes.com>",
				to: user.email,
				subject: "Verify your email",
				template: {
					id: "verify-email-1",
					variables: {
						first_name: user.name,
						verification_url: url
					}
				}
			});
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true
	},
	socialProviders: {
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET
		},
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
