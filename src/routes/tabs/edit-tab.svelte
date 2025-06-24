<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Input from "$lib/components/input.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Pencil, Plus } from "@lucide/svelte";
	import type { Tab } from "$lib/types/Tab";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { type EditTabSchema } from "$lib/tab-schema";

	let { tab, data }: { tab: Tab; data: SuperValidated<Infer<EditTabSchema>> } = $props();

	const { form, errors, constraints, enhance } = superForm(data, {
		id: `${tab.id}`
	});
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button size="icon">
			<Pencil />
		</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content class="w-96">
		<AlertDialog.Header>
			<AlertDialog.Title>Edit tab</AlertDialog.Title>
		</AlertDialog.Header>
		<form action="?/edit" method="POST" use:enhance>
			<div class="mb-7 flex flex-col gap-5">
				<Input name="id" type="hidden" label="" value={`${tab.id}`} />
				<Input
					name="song"
					type="text"
					label="Song"
					value={tab.song as string}
					errors={$errors.song}
					constraints={$constraints.song}
				/>
				<Input
					name="artist"
					type="text"
					label="Artist"
					value={tab.artist as string}
					errors={$errors.artist}
					constraints={$constraints.artist}
				/>
				<div class="flex justify-between gap-5">
					<Input
						name="tuning"
						type="text"
						label="Tuning"
						value={tab.tuning as string}
						errors={$errors.tuning}
						constraints={$constraints.tuning}
					/>
					<Input
						name="instrument"
						type="text"
						label="Instrument"
						value={tab.instrument as string}
						errors={$errors.instrument}
						constraints={$constraints.instrument}
					/>
				</div>
				<Input
					name="link"
					type="text"
					label="Link"
					value={tab.link as string}
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
