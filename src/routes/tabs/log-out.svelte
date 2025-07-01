<script lang="ts">
	import { enhance } from "$app/forms";

	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Button from "$lib/components/ui/button/button.svelte";

	let { open = $bindable(false) } = $props();
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content class="w-100 leading-3">
		<AlertDialog.Header>
			<AlertDialog.Description class="mb-3">Are you sure you want to log out?</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<form action="?/logout" method="POST" use:enhance class="flex gap-2">
				<Button type="submit">Log out</Button>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
