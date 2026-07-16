<script lang="ts">
	import { enhance } from "$app/forms";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Spinner } from "$lib/components/ui/spinner";
	let {
		showLogOutAlert,
		closeLogOutAlert
	}: {
		showLogOutAlert: boolean;
		closeLogOutAlert: () => void;
	} = $props();

	let loading = $state(false);
</script>

<AlertDialog.Root bind:open={showLogOutAlert} onOpenChange={() => closeLogOutAlert()}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Log out</AlertDialog.Title>
			<AlertDialog.Description>Are you sure you want to log out?</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form method="POST" action="?/signOut" onsubmit={() => (loading = true)} use:enhance>
				<AlertDialog.Action type="submit" disabled={loading}>
					{#if loading}
						<Spinner />
					{:else}
						Log out
					{/if}
				</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
