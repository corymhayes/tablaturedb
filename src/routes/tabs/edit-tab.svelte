<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Input from "$lib/components/input.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Pencil } from "@lucide/svelte";
	import type { Tab } from "$lib/types/Tab";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { type EditTabSchema } from "$lib/tab-schema";
	import SettingsSelect from "$lib/components/settings-select.svelte";
	import { toast } from "svelte-sonner";

	let {
		tab,
		data,
		tunings,
		instruments
	}: { tab: Tab; data: SuperValidated<Infer<EditTabSchema>>; tunings: string[]; instruments: string[] } = $props();

	const { form, errors, constraints, enhance } = superForm(data, {
		id: `edit-${tab.id}`,
		resetForm: false,
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
			}
		}
	});

	form.update(($form) => {
		$form.id = tab.id;
		$form.song = tab.song;
		$form.artist = tab.artist;
		$form.tuning = tab.tuning;
		$form.instrument = tab.instrument;
		$form.link = tab.link;
		return $form;
	});
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button size="icon">
			<Pencil />
		</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content class="w-[500px]">
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
					value={$form.song}
					errors={$errors.song}
					constraints={$constraints.song}
				/>
				<Input
					name="artist"
					type="text"
					label="Artist"
					value={$form.artist}
					errors={$errors.artist}
					constraints={$constraints.artist}
				/>
				<div class="flex justify-between gap-5">
					<SettingsSelect label="Tuning" name="tuning" settings={tunings} bind:value={$form.tuning} />
					<SettingsSelect label="Instrument" name="instrument" settings={instruments} bind:value={$form.instrument} />
				</div>
				<Input
					name="link"
					type="text"
					label="Link"
					value={$form.link}
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
