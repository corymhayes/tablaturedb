<script lang="ts">
	import { untrack } from "svelte";
	import * as Form from "$lib/components/ui/form";
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import * as Select from "$lib/components/ui/select";
	import { Select as BitsSelect } from "bits-ui";
	import { Spinner } from "$lib/components/ui/spinner";
	import { toast } from "svelte-sonner";
	import { CirclePlus } from "@lucide/svelte/icons";

	import { addTabSchema, type AddTabSchema } from "$lib/schema";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import AddTuning from "./add-tuning.svelte";

	let {
		showAddDialog,
		closeAddDialog,
		form: initialForm,
		tunings
	}: {
		showAddDialog: boolean;
		closeAddDialog: () => void;
		form: SuperValidated<Infer<AddTabSchema>>;
		tunings: Array<{ id: string; name: string; userId: string | null; createdAt: Date }>;
	} = $props();

	let loading = $state(false);
	let open = $state(false);
	let onOpenChange = $state(() => (open = false));
	let tuning = $state("");

	const form = superForm(
		untrack(() => initialForm),
		{
			validators: zod4Client(addTabSchema),
			onSubmit() {
				loading = true;
			},
			onResult() {
				loading = false;
			},
			onUpdated({ form: _form }) {
				if (_form.valid) {
				  form.reset();
					closeAddDialog();
					toast.success("Tab added successfully");
				}
			}
		}
	);
	const { form: formData, enhance } = form;

	/* INFO: used for the select input */
	let value = $state("");
	const triggerContent = $derived(tunings.find((f) => f.id === value)?.name ?? "");

	$effect(() => {
		if (tuning) {
			value = tuning;
		}
	});
</script>

<Dialog.Root
	bind:open={showAddDialog}
	onOpenChange={() => {
		closeAddDialog();
		value = "";
		form.reset();
	}}
>
	<Dialog.Content class="`sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Add tab</Dialog.Title>
		</Dialog.Header>
		<form method="POST" action="?/addTab" use:enhance class="space-y-4">
			<Form.Field {form} name="song">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Song <span class="text-xs text-foreground/20">(required)</span></Form.Label>
						<Input {...props} required bind:value={$formData.song} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="mt-4 mb-2 flex gap-3">
				<Form.Field {form} name="artist">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Artist</Form.Label>
							<Input {...props} bind:value={$formData.artist} class="w-50" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="tuning">
					<Form.Control>
						{@render selectComp()}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Field {form} name="link">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Link</Form.Label>
						<Input {...props} type="url" bind:value={$formData.link} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Dialog.Footer>
				<Dialog.Close type="button" class={buttonVariants({ variant: "outline" })}>
					Cancel
				</Dialog.Close>
				<Button type="submit" disabled={loading}>
					{#if loading}
						<Spinner />
					{:else}
						Save changes
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

{#snippet selectComp()}
	<Form.Label class="flex">
		Tuning
		<button type="button" onclick={() => (open = true)}>
			<CirclePlus size={12} class="cursor-pointer text-primary" />
		</button>
	</Form.Label>
	<Select.Root type="single" name="tuning" bind:value>
		<Select.Trigger class="w-35">
			<BitsSelect.Value class="truncate">{triggerContent}</BitsSelect.Value>
		</Select.Trigger>
		<Select.Content>
			{#each tunings as tuning (tuning.id)}
				<Select.Item value={tuning.id} class="truncate">{tuning.name}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
{/snippet}

<AddTuning {open} {onOpenChange} bind:tuning />
