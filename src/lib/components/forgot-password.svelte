<script lang="ts">
	import { untrack } from "svelte";
	import * as Form from "$lib/components/ui/form";
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Spinner } from "$lib/components/ui/spinner";
	import { toast } from "svelte-sonner";

	import { forgotPasswordSchema, type ForgotPasswordSchema } from "$lib/schema";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";

	let {
		form: initialForm
	}: {
		form: SuperValidated<Infer<ForgotPasswordSchema>>;
	} = $props();

	let loading = $state(false);
	let open = $state(false);

	const form = superForm(
		untrack(() => initialForm),
		{
			validators: zod4Client(forgotPasswordSchema),
			onSubmit() {
				loading = true;
			},
			onResult() {
				loading = false;
			},
			onUpdated({ form }) {
				if (form.valid) {
					open = false;
					toast.message("Reset password link sent", {
						description: "Check your email for the reset link."
					});
				}
			}
		}
	);
	const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
	<button type="button" class="cursor-pointer" tabindex="-1" onclick={() => (open = true)}>
		Forgot password?
	</button>
	<Dialog.Content class="`sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Forgot Password?</Dialog.Title>
			<Dialog.Description>Enter your email to reset your password.</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/forgotPassword" use:enhance class="space-y-4">
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} required bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
			</Form.Field>
			<Dialog.Footer>
				<Dialog.Close type="button" class={buttonVariants({ variant: "outline" })}>
					Cancel
				</Dialog.Close>
				<Button type="submit" disabled={loading}>
					{#if loading}
						<Spinner />
					{:else}
						Request link
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
