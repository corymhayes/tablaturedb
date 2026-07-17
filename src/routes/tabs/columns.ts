import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table";
import DataTableActions from "./data-table-actions.svelte";
import DataTableHeaderButton from "./data-table-header-button.svelte";
import LinkCell from "./link-cell.svelte";

export type Tab = {
	song: string;
	artist: string;
	tuning: string;
	link: string;
};

export const columns: ColumnDef<Tab>[] = [
	{
		accessorKey: "song",
		header: ({ column }) =>
			renderComponent(DataTableHeaderButton, {
				header: "Song",
				column
			})
	},
	{
		accessorKey: "artist",
		header: ({ column }) =>
			renderComponent(DataTableHeaderButton, {
				header: "Artist",
				column
			})
	},
	{
		accessorKey: "tuning",
		header: ({ column }) =>
			renderComponent(DataTableHeaderButton, {
				header: "Tuning",
				column
			})
	},
	{
		accessorKey: "link",
		header: "Link",
    cell: ({ cell }) => {
      const link = cell.getValue() as string
      return renderComponent(LinkCell, { link })
		}
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return renderComponent(DataTableActions, { id: row.original.id, tab: row.original });
		}
	}
];
