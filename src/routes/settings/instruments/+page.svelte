<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import ManagementRow from "$lib/components/management-row.svelte";
	import * as Popover from "$lib/components/ui/popover";
	import { Pencil } from "@lucide/svelte";

	type Instrument = {
		id: string;
		name: string;
		isDefault: boolean;
	};

	let instruments = $state<Instrument[]>([
		{ id: "1", name: "Guitar", isDefault: true },
		{ id: "2", name: "Bass", isDefault: false },
		{ id: "3", name: "Drums", isDefault: false }
	]);

	const setDefault = (id: string) => {
		let defaultInstrument = instruments.find((item) => item.isDefault === true);
		let instrument = instruments.find((item) => item.id === id);

		if (!defaultInstrument || !instrument) return;

		defaultInstrument.isDefault = false;
		instrument.isDefault = true;
	};

	let editingInstrumentId = $state<string | null>(null);
	let editErrorInput = $state<string | null>(null);
	let addErrorInput = $state<string | null>(null);

	function handleSubmit(event: SubmitEvent, action: "add" | "edit", instrument?: Instrument) {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);

		const name = String(data.get("instrument") ?? "").trim();

		if (!name) {
			if (action === "add") {
				addErrorInput = "Name field cannot be blank";
			} else {
				editErrorInput = "Name field cannot be blank";
			}
			return;
		}

		const duplicate = instruments.some(
			(item) => item.id !== instrument?.id && item.name.toLowerCase() === name.toLowerCase()
		);

		if (duplicate) {
			if (action === "add") {
				addErrorInput = `${name} already exists`;
			} else {
				editErrorInput = `${name} already exists`;
			}

			return;
		}

		if (instrument) {
			instrument.name = name;
		} else {
			instruments.push({
				id: crypto.randomUUID(),
				name,
				isDefault: false
			});
		}

		form.reset();
		editingInstrumentId = null;
		editErrorInput = null;
		addErrorInput = null;
	}

	let deleteInstrument = (id: string) => {
		const instrument = instruments.find((item) => item.id === id);

		if (!instrument || instrument.isDefault || instruments.length === 1) return;

		instruments = instruments.filter((item) => item.id !== id);
	};

	let clearFormError = () => {
		editErrorInput = null;
	};
</script>

<section class="flex max-w-xl flex-col gap-4">
	<h2 class="font-mono text-md font-light uppercase tracking-widest mb-6">Manage Instruments</h2>

	<form onsubmit={(event) => handleSubmit(event, "add")}>
		<Field.Field class="space-y-1.5 mt-6">
			<Label for="instrument">Instrument</Label>
			<div class="flex gap-2">
				<div class="w-full flex flex-col">
					<Input id="instrument" name="instrument" class="font-sans" />
					{#if addErrorInput}
						<span class="text-destructive-foreground font-sans text-xs font-medium">
							{addErrorInput}
						</span>
					{/if}
				</div>
				<Button type="submit">Add</Button>
			</div>
		</Field.Field>
	</form>

	<div class="w-full h-px bg-border"></div>
	{#each instruments as instrument (instrument.id)}
		<Popover.Root
			open={editingInstrumentId === instrument.id}
			onOpenChange={(open) => {
				editingInstrumentId = open ? instrument.id : null;
				clearFormError();
			}}
		>
			<ManagementRow
				name={instrument.name}
				isDefault={instrument.isDefault}
				disableReason="Set a different default to delete"
				resource="instrument"
				onDelete={() => deleteInstrument(instrument.id)}
				setDefault={() => setDefault(instrument.id)}
			>
				{#snippet editAction()}
					<Popover.Trigger
						class={buttonVariants({ variant: "ghost", size: "icon" })}
						aria-label={`Edit ${instrument.name}`}
					>
						<Pencil class="size-4" />
					</Popover.Trigger>
				{/snippet}
			</ManagementRow>

			<Popover.Content side="left" class="w-80 bg-background">
				{@render instrumentForm(instrument)}
			</Popover.Content>
		</Popover.Root>
	{/each}
</section>

{#snippet instrumentForm(instrument: Instrument)}
	{@const inputId = `instrument-${instrument.id}`}

	<form onsubmit={(event) => handleSubmit(event, "edit", instrument)} class="flex flex-col gap-4">
		<Field.Field class="space-y-1.5">
			<Label for={inputId}>Instrument</Label>
			<div>
				<Input id={inputId} name="instrument" value={instrument.name} class="font-sans" />
				{#if editErrorInput}
					<span class="text-destructive-foreground font-sans text-xs font-medium">
						{editErrorInput}
					</span>
				{/if}
			</div>
		</Field.Field>
		<Button type="submit" class="w-fit self-end">Save</Button>
	</form>
{/snippet}
