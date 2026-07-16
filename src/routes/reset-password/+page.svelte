<script lang="ts">
	import { untrack } from "svelte";
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";

	import { resetPasswordSchema } from "$lib/schema";
	import { superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import * as Card from "$lib/components/ui/card";
	import { Spinner } from "$lib/components/ui/spinner";
	import { toast } from "svelte-sonner";

	const { data } = $props();
	let loading = $state(false);

	const form = superForm(
		untrack(() => data.resetPasswordForm),
		{
			validators: zod4Client(resetPasswordSchema),
			onSubmit() {
				loading = true;
			},
			onResult() {
				loading = false;
			},
			onUpdated({ form }) {
				if (!form.valid) {
					toast.error(form.message);
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<div class="flex min-h-screen w-screen flex-col items-center justify-center">
	<div class="absolute top-0 left-0 px-6 pt-6">
		<h1 class="text-3xl font-bold tracking-tighter">
			Tablature<span class="text-primary">DB</span>
		</h1>
	</div>
	<Card.Root class="h-fit w-full max-w-sm">
		<Card.Header>
			<Card.Title>Create new password</Card.Title>
		</Card.Header>
		<Card.Content>
			<form method="POST" class="space-y-4" use:enhance>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input {...props} type="password" required bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="confirmPassword">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm Password</Form.Label>
							<Input {...props} type="password" required bind:value={$formData.confirmPassword} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button disabled={loading}>
					{#if loading}
						<Spinner />
					{:else}
						Reset Password
					{/if}
				</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
