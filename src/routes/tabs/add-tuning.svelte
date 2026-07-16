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
	import { addTuningSchema, type AddTuningSchema } from "$lib/schema.js";
	const addTuning = getContext("addTuning") as SuperValidated<Infer<AddTuningSchema>>;

	let { open, onOpenChange, tuning = $bindable() } = $props();
	let loading = $state(false);

	const form = superForm(addTuning, {
		id: "add-tuning",
		validators: zod4Client(addTuningSchema),
		onSubmit() {
			loading = true;
		},
		onResult({ result }) {
			loading = false;
			if (result.type === "success") {
				tuning = result.data?.newTuningId ?? "";
			}
		},
		onUpdated({ form: _form }) {
			if (_form.valid) {
			  form.reset();
				onOpenChange(false);
				toast.success("Tuning added");
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root {open} {onOpenChange}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add tuning</Dialog.Title>
		</Dialog.Header>
		<form method="POST" action="?/addTuning" use:enhance class="space-y-4">
			<Form.Field {form} name="tuning">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Tuning</Form.Label>
						<Input {...props} type="text" required bind:value={$formData.tuning} />
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
						Add
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
