<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		type SortingState,
		getCoreRowModel,
		getSortedRowModel
	} from "@tanstack/table-core";
	import { createSvelteTable, FlexRender } from "$lib/components/ui/data-table/index.js";
	import * as Table from "$lib/components/ui/table/index.js";

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
	};

	let { data, columns }: DataTableProps<TData, TValue> = $props();

	let sorting = $state<SortingState>([]);

	const table = createSvelteTable({
		get data() {
			return data;
		},
		get columns() {
			return columns;
		},
		// columns,
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
				<Table.Row class="h-14">
					{#each headerGroup.headers as header (header.id)}
						<Table.Head
							colspan={header.colSpan}
							class="font-mono font-medium uppercase text-[16px]"
						>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row data-state={row.getIsSelected() && "selected"} class="h-14 border-0">
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell class="font-mono text-sm font-extralight">
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
