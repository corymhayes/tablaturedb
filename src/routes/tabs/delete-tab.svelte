<script lang="ts">
	import { enhance } from "$app/forms";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Trash } from "@lucide/svelte";

	let { id }: { id: string } = $props();
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button size="icon" variant="destructive"><Trash /></Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<form action="?/delete" method="POST" use:enhance>
			<AlertDialog.Header>
				<AlertDialog.Title>Delete Tab</AlertDialog.Title>
				<AlertDialog.Description>
					Are you sure? This will permanently delete the tab from your account.
					{id}
					<input type="hidden" name="id" value={id} />
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button variant="destructive" type="submit">Delete</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
