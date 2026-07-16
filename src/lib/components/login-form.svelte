<script lang="ts">
	import { untrack } from "svelte";
	import * as Form from "$lib/components/ui/form";
	import * as Card from "$lib/components/ui/card";
	import * as Field from "$lib/components/ui/field";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Spinner } from "$lib/components/ui/spinner";
	import { toast } from "svelte-sonner";

	import { loginSchema, type ForgotPasswordSchema, type LoginSchema } from "$lib/schema";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { authClient } from "$routes/auth-client";

	import ForgotPassword from "./forgot-password.svelte";

	let {
		loginForm: initialForm,
		forgotPasswordForm,
		changeValue
	}: {
		loginForm: SuperValidated<Infer<LoginSchema>>;
		forgotPasswordForm: SuperValidated<Infer<ForgotPasswordSchema>>;
		changeValue: (value: string) => void;
	} = $props();

	let loading = $state(false);

	const form = superForm(
		untrack(() => initialForm),
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
		const data = await authClient.signIn.social({
			provider: "google"
		});

		if (!data.error) {
			toast.success("Login successful");
		} else {
			toast.error(data.error.message!);
		}
		loading = false;
	};

	const githubLogin = async () => {
		loading = true;
		const data = await authClient.signIn.social({
			provider: "github"
		});

		if (!data.error) {
			toast.success("Login successful");
		} else {
			toast.error(data.error.message!);
		}
		loading = false;
	};
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Login</Card.Title>
		<Card.Description>Use your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="post" action="?/signin" class="flex flex-col gap-4" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} required bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<div class="mb-0.75 flex items-center justify-between">
							<Form.Label>Password</Form.Label>
							<ForgotPassword form={forgotPasswordForm} />
						</div>
						<Input type="password" {...props} required bind:value={$formData.password} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="self-start text-xs" />
			</Form.Field>

			<Form.Button disabled={loading}>
				{#if loading}
					<Spinner />
				{:else}
					Login
				{/if}
			</Form.Button>
		</form>
		<Field.Separator class="my-4">Or continue with a provider</Field.Separator>
		<Field.Set>
			<Field.Group class="flex flex-row gap-4">
				<Field.Field>
					<Button variant="outline" class="h-8" onclick={googleLogin} disabled={loading}>
						<img src="google.svg" alt="Google icon" class="mr-1 size-3.5" />
					</Button>
				</Field.Field>
				<Field.Field>
					<Button variant="outline" class="h-8" onclick={githubLogin} disabled={loading}>
						<img src="github.svg" alt="Github icon" class="mr-1 size-3.5" />
					</Button>
				</Field.Field>
			</Field.Group>
			<Field.Description class="flex items-center justify-center gap-1">
				Don't have an account?
				<Button variant="link" class="p-0 text-foreground" onclick={() => changeValue("signup")}>
					Sign up
				</Button>
			</Field.Description>
		</Field.Set>
	</Card.Content>
</Card.Root>
