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
	<AlertDialog.Content class="bg-[#0a0a0a] border-[#c8c8c8]">
		<AlertDialog.Header>
			<AlertDialog.Title class="font-mono uppercase tracking-wider">Log out</AlertDialog.Title>
			<AlertDialog.Description class="font-mono font-light"
				>Are you sure you want to log out?</AlertDialog.Description
			>
		</AlertDialog.Header>
		<AlertDialog.Footer class="font-mono">
			<AlertDialog.Cancel class="h-8">Cancel</AlertDialog.Cancel>
			<form method="POST" action="?/signOut" onsubmit={() => (loading = true)} use:enhance>
				<AlertDialog.Action type="submit" disabled={loading} class="h-8">
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
