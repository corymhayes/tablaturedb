<script lang="ts">
	import { enhance } from "$app/forms";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Spinner } from "$lib/components/ui/spinner";
	import { toast } from "svelte-sonner";

	let { open, onOpenChange, id } = $props();
	let loading = $state(false);
</script>

<AlertDialog.Root {open} {onOpenChange}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete tuning</AlertDialog.Title>
			<AlertDialog.Description>Are you sure you want to delete this tuning?</AlertDialog.Description
			>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form
				method="POST"
				action="?/deleteTuning"
				onsubmit={() => (loading = true)}
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result?.type === "success") {
							update();
							loading = false;
							onOpenChange(false);
							toast.success("Tuning deleted successfully");
						}
					};
				}}
			>
				<input type="hidden" name="id" value={id} />
				<AlertDialog.Action type="submit" disabled={loading}>
					{#if loading}
						<Spinner />
					{:else}
						Continue
					{/if}
				</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
