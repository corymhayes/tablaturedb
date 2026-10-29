<script lang="ts">
	import { untrack } from "svelte";
	import { resolve } from "$app/paths";
	import { superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import * as Sentry from "@sentry/sveltekit";

	import * as Field from "$lib/components/ui/field";
	import * as Form from "$lib/components/ui/form";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Spinner } from "$lib/components/ui/spinner";
	import { loginSchema } from "$lib/schema";
	import { authClient } from "$routes/auth-client.js";
	import ForgotPassword from "$lib/components/forgot-password.svelte";

	let { data } = $props();

	let loading = $state(false);

	const form = superForm(
		untrack(() => data.loginForm),
		{
			validators: zod4Client(loginSchema),
			onSubmit() {
				loading = true;
			},
			onResult() {
				loading = false;
			},
			onUpdated({ form }) {
				if (form.valid) {
					toast.success("Login successful");
				} else {
					toast.error(form.message);
				}
			}
		}
	);

	const { form: formData, enhance } = form;

	const googleLogin = async () => {
		loading = true;
		toast.info("Continuing with Google...");
		const data = await authClient.signIn.social({
			provider: "google"
		});

		if (data.error) {
			Sentry.captureException(data.error);
			toast.error(data.error.message ?? "Failed to redirect");
			loading = false;
		}
	};

	const githubLogin = async () => {
		loading = true;
		toast.info("Continuing with GitHub...");
		const data = await authClient.signIn.social({
			provider: "github"
		});

		if (data.error) {
			Sentry.captureException(data.error);
			toast.error(data.error.message ?? "Failed to redirect");
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Log in — TablatureDB</title>
	<meta name="description" content="Log in to your TablatureDB account." />
</svelte:head>

<main class="min-h-screen bg-[#0a0a0a] font-mono text-white lg:grid lg:grid-cols-2">
	<!-- Left column: brand, login content, and the landing-page glow. -->
	<section
		class="relative isolate flex min-h-screen flex-col overflow-hidden border-b border-[#292929] bg-[#0a0a0a] lg:min-h-screen lg:border-0"
	>
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_70%_at_8%_100%,rgba(243,111,33,0.38),transparent_72%)]"
		></div>

		<div class="relative z-10 flex items-center px-6 py-6 sm:px-10 lg:px-14 lg:py-10">
			<a
				href={resolve("/")}
				class="whitespace-nowrap text-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-2xl"
				aria-label="TablatureDB home"
			>
				TABLATURE<span class="text-primary">DB</span>
			</a>
		</div>

		<!-- Keep the auth form/content in this area. -->
		<div
			class="relative z-10 flex flex-1 items-center justify-center px-6 pb-10 sm:px-10 lg:px-14 lg:pb-14 self-end"
		>
			<div class="max-w-sm!">
				<p class="text-center mb-6">
					<span class="text-3xl uppercase tracking-[0.1em] text-white">Welcome back!<br /> </span>
					<span class="text-[#c8c8c8] font-light">Log in to view your tabs</span>
				</p>
				<form method="post" action="?/signin" class="flex flex-col gap-4" use:enhance>
					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label class="uppercase font-light text-sm">Email</Form.Label>
								<Input
									{...props}
									required
									bind:value={$formData.email}
									class="bg-background! w-sm focus:border-primary! h-10"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<div class="flex justify-between">
									<Form.Label class="uppercase font-light text-sm">Password</Form.Label>
									<ForgotPassword form={data.forgotPasswordForm} />
								</div>
								<Input
									type="password"
									{...props}
									required
									bind:value={$formData.password}
									class="bg-background! w-sm focus:border-primary! h-10"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Button
						disabled={loading}
						class="uppercase text-sm font-light h-10 tracking-[0.1em]"
					>
						{#if loading}
							<Spinner />
						{:else}
							Login
						{/if}
					</Form.Button>
				</form>
				<Field.Set>
					<Field.Group class="flex flex-row gap-4 mt-6 mb-3">
						<Field.Field>
							<Button variant="outline" class="h-8" onclick={githubLogin} disabled={loading}>
								<img src="github.svg" alt="Github icon" class="mr-1 size-3.5 dark:invert" />
							</Button>
						</Field.Field>
						<Field.Field>
							<Button variant="outline" class="h-8" onclick={googleLogin} disabled={loading}>
								<img src="google.svg" alt="Google icon" class="mr-1 size-3.5 dark:invert" />
							</Button>
						</Field.Field>
					</Field.Group>
					<Field.Description
						class="uppercase flex items-center justify-center gap-1 tracking-[0.1em]"
					>
						Don't have an account?
						<a href={resolve("/signup")} class="p-0 text-primary underline cursor-pointer">
							Sign up
						</a>
					</Field.Description>
				</Field.Set>
				<!-- <p class="max-w-sm text-sm leading-6 text-[#a3a3a3]">
					Save your favorite tabs, keep them organized, and get back to playing.
				</p> -->
			</div>
		</div>
	</section>

	<!-- Right column: supporting landing-page message or the login form. -->
	<section
		class="min-h-[55svh] items-center bg-[#0a0a0a] px-6 py-16 sm:px-10 lg:min-h-screen lg:px-20 hidden sm:flex"
	>
		<div class="max-w-xl">
			<h1 class="text-5xl uppercase leading-tight tracking-[0.1em] sm:text-5xl lg:text-8xl">
				Less<br />
				searching.<br />
				<span class="text-primary">
					More<br />
					playing.
				</span>
			</h1>
		</div>
	</section>
</main>
