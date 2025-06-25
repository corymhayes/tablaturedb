<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import Input from "$lib/components/input.svelte";
	import { superForm, type SuperValidated, type Infer } from "sveltekit-superforms";
	import { type AddTabSchema } from "$lib/tab-schema";
	import { toast } from "svelte-sonner";

	let { data }: { data: SuperValidated<Infer<AddTabSchema>> } = $props();

	const { form, errors, constraints, enhance } = superForm(data, {
		id: `tab-${data.id}`,
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
			}
		}
	});
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "default" })}>Add tab</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add tab</Dialog.Title>
		</Dialog.Header>
		<form action="?/addTab" method="POST" use:enhance>
			<div class="my-7 flex flex-col gap-5">
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
			<Dialog.Footer>
				<Button type="submit">Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
