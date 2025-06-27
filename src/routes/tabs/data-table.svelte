<script lang="ts" generics="TData, TValue">
	import { type ColumnDef, type SortingState, getCoreRowModel, getSortedRowModel } from "@tanstack/table-core";
	import { createSvelteTable, FlexRender } from "$lib/components/ui/data-table";
	import * as Table from "$lib/components/ui/table";
	import type { Infer, SuperValidated } from "sveltekit-superforms";
	import type { DeleteTabSchema, EditTabSchema } from "$lib/tab-schema";
	import RowActions from "./row-actions.svelte";
	import type { Tab } from "$lib/types/Tab";

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		editTabAction: SuperValidated<Infer<EditTabSchema>>;
		deleteTabAction: SuperValidated<Infer<DeleteTabSchema>>;
		tunings: string[];
		instruments: string[];
	};

	let { data, columns, editTabAction, deleteTabAction, tunings, instruments }: DataTableProps<TData, TValue> = $props();
	let sorting = $state<SortingState>([]);

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: (updater) => {
			if (typeof updater === "function") {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		state: {
			get sorting() {
				return sorting;
			}
		}
	});
</script>

<div>
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row class="h-12">
					{#each headerGroup.headers as header (header.id)}
						<Table.Head>
							{#if !header.isPlaceholder}
								<FlexRender content={header.column.columnDef.header} context={header.getContext()} />
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row data-state={row.getIsSelected() && "selected"} class="h-12">
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
					<Table.Cell>
						<RowActions tab={row.original as Tab} {editTabAction} {deleteTabAction} {tunings} {instruments} />
					</Table.Cell>
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">No tabs found</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
