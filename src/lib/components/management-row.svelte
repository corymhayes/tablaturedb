<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Pencil from "@lucide/svelte/icons/pencil";
	import Trash2 from "@lucide/svelte/icons/trash";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import Delete from "./delete.svelte";
	import type { Snippet } from "svelte";

	let {
		name,
		description,
		isDefault,
		disableReason,
		resource,
		onEdit,
		onDelete,
		setDefault,
		editAction
	}: {
		name: string;
		description?: string;
		isDefault?: boolean;
		disableReason?: string;
		resource: "instrument" | "tuning";
		onEdit?: () => void;
		onDelete?: () => void;
		setDefault?: () => void;
		editAction?: Snippet;
	} = $props();
</script>

<Tooltip.Provider>
	<div class="flex min-w-0 items-center justify-between gap-4 py-3 hover:bg-white/2 -mx-3 px-3">
		<!-- Main content -->
		<div class="flex min-w-0 flex-1 flex-col gap-1">
			<div class="flex min-w-0 items-center justify-between gap-2">
				<span class="min-w-0 truncate text-sm font-light tracking-wide font-sans">
					{name}
				</span>
			</div>

			{#if description}
				<span class="truncate text-xs text-muted-foreground tracking-widest font-mono">
					{description}
				</span>
			{/if}
		</div>

		<!-- Actions -->
		<div class="flex shrink-0 items-center gap-2">
			{#if isDefault}
				{@render defaultBadge("Default")}
			{/if}

			{#if resource === "instrument" && !isDefault}
				<Button class="text-[10px] px-3 h-6" onclick={setDefault}>Set default</Button>
			{/if}

			{#if editAction}
				{@render editAction()}
			{:else}
				<Button variant="ghost" size="icon" aria-label={`Edit ${name}`} onclick={onEdit}>
					<Pencil class="size-4" />
				</Button>
			{/if}

			{#if isDefault}
				<Tooltip.Root>
					<Tooltip.Trigger>
						<span class="inline-flex">
							<Button variant="destructive" size="icon" aria-label={`Delete ${name}`} disabled>
								<Trash2 class="size-4" />
							</Button>
						</span>
					</Tooltip.Trigger>
					<Tooltip.Content side="right" class="max-w-40">{disableReason}</Tooltip.Content>
				</Tooltip.Root>
			{:else}
				<Delete {name} resource="instrument" {onDelete} />
			{/if}
		</div>
	</div>
</Tooltip.Provider>

{#snippet defaultBadge(value: string)}
	<span
		class="shrink-0 border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase text-primary tracking-[0.2em]"
	>
		{value}
	</span>
{/snippet}
