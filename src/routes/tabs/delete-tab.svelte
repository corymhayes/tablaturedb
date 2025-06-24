<script lang="ts">
	// import { enhance } from "$app/forms";
	import Input from "$lib/components/input.svelte";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Button from "$lib/components/ui/button/button.svelte";
	import type { DeleteTabSchema } from "$lib/tab-schema";
	import { Trash } from "@lucide/svelte";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";

	let { id, data }: { id: string; data: SuperValidated<Infer<DeleteTabSchema>> } = $props();

	const {
		form: deleteTabForm,
		errors: deleteTabErrors,
		constraints: deleteTabConstraints,
		enhance: deleteTabEnhance
	} = superForm(data, {
		id: id
	});
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button size="icon" variant="secondary"><Trash /></Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Tab</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure? This will permanently delete the tab from your account.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<form action="?/delete" method="POST" use:deleteTabEnhance class="flex gap-2">
				<Input
					name="id"
					type="hidden"
					bind:value={$deleteTabForm.id}
					errors={$deleteTabErrors.id}
					constraints={$deleteTabConstraints.id}
				/>
				<Button variant="destructive" type="submit">Delete</Button>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
