<script lang="ts">
	import { getContext, untrack } from "svelte";
	import * as Form from "$lib/components/ui/form";
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import * as Select from "$lib/components/ui/select";
	import { Select as BitsSelect } from "bits-ui";
	import { updateTabSchema, type UpdateTabSchema } from "$lib/schema";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { Pencil } from "@lucide/svelte";
	import { Spinner } from "$lib/components/ui/spinner";
	import { toast } from "svelte-sonner";

	const initialForm = getContext("form") as SuperValidated<Infer<UpdateTabSchema>>;
	const tuningsState = getContext("tunings") as {
		items: Array<{
			id: string;
			name: string;
			userId: string | null;
			createdAt: Date;
		}>;
	};

	let { tab } = $props();
	const tunings = $derived(tuningsState.items);
	let open = $state(false);
	let loading = $state(false);

	const form = superForm(initialForm, {
		id: untrack(() => `update-${tab.id}`),
		validators: zod4Client(updateTabSchema),
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
				toast.success("Tab updated successfully");
			}
		}
	});
	const { form: updateForm, enhance: updateEnhance } = form;

	$effect(() => {
		if (open && tab) {
			const tuningId = tunings.find((t) => t.name === tab.tuning)?.id ?? "";
			form.reset({
				data: {
					song: tab.song,
					artist: tab.artist,
					tuning: tuningId,
					link: tab.link
				},
				newState: {
					song: tab.song,
					artist: tab.artist,
					tuning: tuningId,
					link: tab.link
				}
			});
			value = tuningId;
		}
	});

	/* INFO: used for the select input */
	let value = $state("");
	const triggerContent = $derived(tunings.find((f) => f.id === value)?.name ?? "");
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Pencil size={16} />
	</Dialog.Trigger>
	<Dialog.Content class="`sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Edit tab</Dialog.Title>
		</Dialog.Header>
		<form method="POST" action="?/updateTab" use:updateEnhance class="space-y-4">
			<input type="hidden" name="id" value={tab.id} />
			<Form.Field {form} name="song">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Song</Form.Label>
						<Input {...props} required bind:value={$updateForm.song} />
					{/snippet}
				</Form.Control>
			</Form.Field>
			<div class="mt-4 mb-2 flex gap-3">
				<Form.Field {form} name="artist">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Artist</Form.Label>
							<Input {...props} bind:value={$updateForm.artist} class="w-50" />
						{/snippet}
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="tuning">
					<Form.Control>
						{@render selectComp()}
					</Form.Control>
				</Form.Field>
			</div>
			<Form.Field {form} name="link">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Link</Form.Label>
						<Input {...props} bind:value={$updateForm.link} />
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
						Save changes
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

{#snippet selectComp()}
	<Form.Label>Tuning</Form.Label>
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
