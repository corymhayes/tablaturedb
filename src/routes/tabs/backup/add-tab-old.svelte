<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Button } from "$lib/components/ui/button";
	import { Plus } from "@lucide/svelte";
	import Input from "$lib/components/input.svelte";
	import { superForm, type SuperValidated, type Infer } from "sveltekit-superforms";
	import { type AddTabSchema } from "$lib/tab-schema";

	// let {
	// 	openDialog = $bindable(),
	// 	data
	// }: { openDialog: boolean; data: SuperValidated<Infer<AddTabSchema>> } = $props();
	let { data }: { data: SuperValidated<Infer<AddTabSchema>> } = $props();

	const { form, errors, constraints, enhance } = superForm(data);

	// function handleKeyDown(e: KeyboardEvent) {
	// 	if (e.key === "n") {
	// 		openDialog = true;
	// 	}
	// }
</script>

<!-- <svelte:window onkeydown={handleKeyDown} /> -->

<!-- <AlertDialog.Root open={openDialog} onOpenChange={(open) => (openDialog = open)}> -->
<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button><Plus />Add Tab</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Add tab</AlertDialog.Title>
		</AlertDialog.Header>
		<form action="?/addTab" method="POST" use:enhance>
			<div class="mb-7 flex flex-col gap-5">
				<Input
					name="song"
					type="text"
					label="Song"
					bind:value={$form.song}
					errors={$errors.song}
					constraints={$constraints.song}
				/>
				<Input
					name="artist"
					type="text"
					label="Artist"
					bind:value={$form.artist}
					errors={$errors.artist}
					constraints={$constraints.artist}
				/>
				<div class="flex justify-between gap-5">
					<Input
						name="tuning"
						type="text"
						label="Tuning"
						bind:value={$form.tuning}
						errors={$errors.tuning}
						constraints={$constraints.tuning}
					/>
					<Input
						name="instrument"
						type="text"
						label="Instrument"
						bind:value={$form.instrument}
						errors={$errors.instrument}
						constraints={$constraints.instrument}
					/>
				</div>
				<Input
					name="link"
					type="text"
					label="Link"
					bind:value={$form.link}
					errors={$errors.link}
					constraints={$constraints.link}
				/>
			</div>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button type="submit">Save</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
