import { renderComponent, renderSnippet } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import DataTableActions from "./data-table-actions.svelte";
import DataTableHeaderButton from "./data-table-header-button.svelte";

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
		cell: ({ row }) => {
			const linkCellSnippet = createRawSnippet<[{ link: string }]>((getLink) => {
				const { link } = getLink();
				return {
					render: () =>
						`<a href=${link} target="_blank" class="underline underline-offset-4">${link}</a>`
				};
			});

			return renderSnippet(linkCellSnippet, {
				link: row.original.link
			});
		}
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return renderComponent(DataTableActions, { id: row.original.id, tab: row.original });
		}
	}
];
