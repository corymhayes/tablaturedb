<script lang="ts">
	import { untrack } from "svelte";
	import * as Form from "$lib/components/ui/form/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Field from "$lib/components/ui/field/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Spinner } from "$lib/components/ui/spinner";

	import { signupSchema, type SignupSchema } from "$lib/schema";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { authClient } from "$routes/auth-client";
	import { toast } from "svelte-sonner";

	let {
		form: initialForm,
		changeValue
	}: { form: SuperValidated<Infer<SignupSchema>>; changeValue: (value: string) => void } = $props();

	let loading = $state(false);

	const form = superForm(
		untrack(() => initialForm),
		{
			validators: zod4Client(signupSchema),
			onSubmit() {
				loading = true;
			},
			onResult() {
				loading = false;
			},
			onUpdated({ form }) {
				if (form.valid) {
					toast.success("Verification email sent");
					changeValue("signin");
				} else {
					toast.error("Unable to send verification email");
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
			loading = false;
		} else {
			toast.error("Error");
			loading = false;
		}
	};

	const githubLogin = async () => {
		loading = true;
		const data = await authClient.signIn.social({
			provider: "github"
		});

		if (!data.error) {
			toast.success("Login successful");
			loading = false;
		} else {
			toast.error("Error");
			loading = false;
		}
	};
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Create an account</Card.Title>
		<Card.Description>Use your email to sign up for an account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="post" action="?/signup" class="flex flex-col gap-4" use:enhance>
			<div class="flex flex-row gap-4">
				<Form.Field {form} name="firstName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>First name</Form.Label>
							<Input
								type="text"
								{...props}
								required
								placeholder="John"
								bind:value={$formData.firstName}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="lastName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Last name</Form.Label>
							<Input type="text" {...props} placeholder="Doe" bind:value={$formData.lastName} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input
							type="text"
							{...props}
							required
							placeholder="tab@example.com"
							bind:value={$formData.email}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="flex justify-between">
							Password
							<Form.Description class="text-xs">Must be at least 8 characters</Form.Description>
						</Form.Label>
						<Input type="password" {...props} required bind:value={$formData.password} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="m-0 p-0 text-xs/relaxed" />
			</Form.Field>
			<Form.Field {form} name="confirmPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm password</Form.Label>
						<Input type="password" {...props} bind:value={$formData.confirmPassword} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Field.Field class="mt-1">
				<Button type="submit" class="w-full" disabled={loading}>
					{#if loading}
						<Spinner />
					{:else}
						Create account
					{/if}
				</Button>
			</Field.Field>
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
				Already have an account?
				<Button variant="link" class="p-0 text-foreground" onclick={() => changeValue("signin")}>
					Sign in
				</Button>
			</Field.Description>
		</Field.Set>
	</Card.Content>
</Card.Root>
