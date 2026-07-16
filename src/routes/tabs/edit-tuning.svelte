<script lang="ts">
	import { getContext } from "svelte";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Form from "$lib/components/ui/form";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Spinner } from "$lib/components/ui/spinner";
	import { toast } from "svelte-sonner";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { editTuningSchema, type EditTuningSchema } from "$lib/schema.js";
	const editTuning = getContext("editTuning") as SuperValidated<Infer<EditTuningSchema>>;

	let { open, onOpenChange, tuning } = $props();
	let loading = $state(false);

	const form = superForm(editTuning, {
		id: "edit-tuning",
		validators: zod4Client(editTuningSchema),
		onSubmit() {
			loading = true;
		},
		onResult() {
			loading = false;
		},
		onUpdated({ form: _form }) {
			if (_form.valid) {
			  form.reset();
				open = false;
				toast.success("Tuning updated");
			}
		}
	});

	$effect(() => {
		if (open && tuning) {
			$formData.id = tuning.id;
			$formData.name = tuning.name;
		}
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root {open} {onOpenChange}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit tuning</Dialog.Title>
		</Dialog.Header>
		<form method="POST" action="?/editTuning" use:enhance class="space-y-4">
			<input type="hidden" name="id" value={$formData.id} />
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Tuning</Form.Label>
						<Input {...props} type="text" required bind:value={$formData.name} />
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
						Update
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
