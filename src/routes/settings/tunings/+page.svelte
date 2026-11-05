<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import ManagementRow from "$lib/components/management-row.svelte";
	import * as Popover from "$lib/components/ui/popover";
	import * as RadioGroup from "$lib/components/ui/radio-group";
	import { Pencil } from "@lucide/svelte";

	type Tuning = {
		id: string;
		instrumentId: number;
		name: string;
		description: string;
		isDefault: boolean;
	};

	const instruments = [
		{
			id: 1,
			name: "Guitar",
			isDefault: true
		},
		{
			id: 2,
			name: "Bass",
			isDefault: false
		}
	];

	let tunings = $state<Tuning[]>([
		{
			id: "1",
			name: "Standard",
			description: "E A D G B E",
			isDefault: true,
			instrumentId: 2
		},
		{
			id: "2",
			name: "Drop D",
			description: "D A D G B E",
			isDefault: false,
			instrumentId: 2
		},
		{
			id: "3",
			name: "Open G",
			description: "D G D G B D",
			isDefault: false,
			instrumentId: 2
		},
		{
			id: "4",
			name: "A Really Long Custom Tuning Name That Should Truncate",
			description: "C G C F A D",
			isDefault: true,
			instrumentId: 1
		}
	]);

	let addPopoverOpen = $state(false);
	let editingTuningId = $state<string | null>(null);
	let errorInput = $state<string | null>(null);

	let selectedInstrument = $state("Guitar");
	let currentInstrument = $derived(
		instruments.find((instrument) => instrument.name === selectedInstrument)
	);
	let filteredTunings = $derived(
		tunings.filter((tuning) => tuning.instrumentId === currentInstrument?.id)
	);

	function handleSubmit(event: SubmitEvent, tuning?: Tuning) {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);

		const name = String(data.get("tuning") ?? "").trim();
		const notes = String(data.get("notes") ?? "").trim();

		if (!name || !notes || !currentInstrument) {
			errorInput = "Fields cannot be blank";
			return;
		}

		const duplicate = tunings.some(
			(item) =>
				item.instrumentId === currentInstrument?.id &&
				item.id !== tuning?.id &&
				item.name.toLowerCase() === name.toLowerCase()
		);

		if (duplicate) {
			errorInput = `${name} already exists`;
			return;
		}

		if (tuning) {
			// Edit existing tuning
			tuning.name = name;
			tuning.description = notes;
		} else {
			// Add new tuning
			tunings.push({
				id: crypto.randomUUID(),
				instrumentId: currentInstrument.id,
				name,
				description: notes,
				isDefault: false
			});
		}

		form.reset();
		addPopoverOpen = false;
		editingTuningId = null;
		errorInput = null;
	}

	let deleteTuning = (id: string) => {
		const tuning = tunings.find((item) => item.id === id);

		if (!tuning || tuning.isDefault) return;

		tunings = tunings.filter((item) => item.id !== id);
	};

	let clearFormError = () => {
		errorInput = null;
	};
</script>

<section class="flex max-w-xl flex-col gap-4">
	<h2 class="font-mono text-md font-light uppercase tracking-widest mb-6">Manage Tunings</h2>

	<div>
		<div class="flex justify-between items-end">
			<Popover.Root bind:open={addPopoverOpen} onOpenChange={clearFormError}>
				<Popover.Trigger class={buttonVariants({ variant: "default" })}>Add</Popover.Trigger>
				<Popover.Content align="start">
					{@render tuningForm()}
				</Popover.Content>
			</Popover.Root>

			<div class="flex flex-col items-end">
				<h3 class="font-light uppercase tracking-widest text-sm text-primary mb-4">Instrument</h3>
				<RadioGroup.Root
					bind:value={selectedInstrument}
					onValueChange={() => {
						addPopoverOpen = false;
						editingTuningId = null;
						errorInput = null;
					}}
					class="flex items-center gap-2"
				>
					{#each instruments as instrument (instrument.id)}
						<Label
							class={[
								"cursor-pointer border pl-0 pr-3 gap-0 py-2 font-mono text-xs uppercase transition-colors",
								selectedInstrument === instrument.name
									? "border-primary bg-primary text-primary-foreground"
									: "border-border text-muted-foreground hover:text-foreground"
							]}
						>
							<RadioGroup.Item value={instrument.name} class="sr-only" />
							{instrument.name}
						</Label>
					{/each}
				</RadioGroup.Root>
			</div>
		</div>
	</div>

	<div class="w-full h-px bg-border my-6"></div>

	{#if selectedInstrument === ""}
		<p class="text-sm tracking-widest font-light">Select a instrument to view its tuning.</p>
	{:else}
		{#each filteredTunings as tuning (tuning.id)}
			<Popover.Root
				open={editingTuningId === tuning.id}
				onOpenChange={(open) => {
					editingTuningId = open ? tuning.id : null;
					clearFormError();
				}}
			>
				<ManagementRow
					name={tuning.name}
					description={tuning.description}
					isDefault={tuning.isDefault}
					disableReason="Default tuning cannot be deleted"
					resource="tuning"
					onDelete={() => deleteTuning(tuning.id)}
				>
					{#snippet editAction()}
						<Popover.Trigger
							class={buttonVariants({ variant: "ghost", size: "icon" })}
							aria-label={`Edit ${tuning.name}`}
						>
							<Pencil class="size-4" />
						</Popover.Trigger>
					{/snippet}
				</ManagementRow>

				<Popover.Content side="left" class="w-80 bg-background">
					{@render tuningForm(tuning)}
				</Popover.Content>
			</Popover.Root>
		{/each}
	{/if}
</section>

{#snippet tuningForm(tuning?: Tuning)}
	{@const nameId = tuning ? `tuning-${tuning.id}` : "new-tuning"}
	{@const notesId = tuning ? `notes-${tuning.id}` : "new-notes"}

	<form onsubmit={(event) => handleSubmit(event, tuning)} class="flex flex-col gap-4">
		<Field.Field class="space-y-1.5">
			<Label for={nameId}>Tuning</Label>
			<Input id={nameId} name="tuning" value={tuning?.name ?? ""} class="font-sans" />
			{#if errorInput}
				<span class="text-destructive-foreground font-sans text-xs font-medium">{errorInput}</span>
			{/if}
		</Field.Field>

		<Field.Field class="space-y-1.5">
			<Label for={notesId}>Notes</Label>
			<Input id={notesId} name="notes" value={tuning?.description ?? ""} class="font-sans" />
		</Field.Field>

		<Button type="submit" class="w-fit self-end">{tuning ? "Save" : "Add"}</Button>
	</form>
{/snippet}
