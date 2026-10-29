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
					artist: tab.artist ?? "",
					tuning: tuningId ?? "",
					link: tab.link ?? ""
				},
				newState: {
					song: tab.song,
					artist: tab.artist ?? "",
					tuning: tuningId ?? "",
					link: tab.link ?? ""
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
		<span class="group relative block size-4 cursor-pointer">
			<img
				src="/pencil-simple-fill.svg"
				alt="Edit tab"
				class="absolute inset-0 size-full opacity-100 transition-opacity duration-250 ease-in-out group-hover:opacity-0"
			/>
			<img
				src="/pencil-simple-fill-hover.svg"
				alt=""
				aria-hidden="true"
				class="absolute inset-0 size-full opacity-0 transition-opacity duration-250 ease-in-out group-hover:opacity-100"
			/>
		</span>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-106.25 bg-[#0a0a0a] border border-[#292929]">
		<Dialog.Header>
			<Dialog.Title class="font-mono uppercase tracking-wider">Edit tab</Dialog.Title>
		</Dialog.Header>
		<form method="POST" action="?/updateTab" use:updateEnhance class="space-y-4 font-mono">
			<input type="hidden" name="id" value={tab.id} />
			<Form.Field {form} name="song">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="uppercase tracking-wider">Song</Form.Label>
						<Input
							{...props}
							required
							bind:value={$updateForm.song}
							class="bg-background! focus:border-primary! h-10"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="mt-4 mb-2 flex gap-3">
				<Form.Field {form} name="artist" class="min-w-0 flex-1">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="uppercase tracking-wider">Artist</Form.Label>
							<Input
								{...props}
								bind:value={$updateForm.artist}
								class="bg-background! focus:border-primary! h-10 w-full"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="tuning" class="min-w-0 flex-1">
					<Form.Control>
						{@render selectComp()}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Field {form} name="link">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="uppercase tracking-wider">Link</Form.Label>
						<Input
							{...props}
							type="url"
							bind:value={$updateForm.link}
							class="bg-background! focus:border-primary! h-10"
						/>
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
	<Form.Label class="uppercase tracking-wider">Tuning</Form.Label>
	<Select.Root type="single" name="tuning" bind:value>
		<Select.Trigger class="bg-background! focus:border-primary! h-10! w-full">
			<BitsSelect.Value class="truncate uppercase">{triggerContent}</BitsSelect.Value>
		</Select.Trigger>
		<Select.Content>
			{#each tunings as tuning (tuning.id)}
				<Select.Item value={tuning.id} class="truncate uppercase font-mono"
					>{tuning.name}</Select.Item
				>
			{/each}
		</Select.Content>
	</Select.Root>
{/snippet}
