import { renderComponent, renderSnippet } from "$lib/components/ui/data-table";
import { createRawSnippet } from "svelte";
import SortingButton from "./sorting-button.svelte";
import type { ColumnDef } from "@tanstack/table-core";
import type { Tab } from "$lib/types/Tab";

export const columns: ColumnDef<Tab>[] = [
	{
		accessorKey: "song",
		header: ({ column }) =>
			renderComponent(SortingButton, {
				name: "Song",
				onclick: () => column.toggleSorting(column.getIsSorted() === "asc")
			})
	},
	{
		accessorKey: "artist",
		header: ({ column }) =>
			renderComponent(SortingButton, {
				name: "Artist",
				onclick: () => column.toggleSorting(column.getIsSorted() === "asc")
			})
	},
	{
		accessorKey: "tuning",
		header: ({ column }) =>
			renderComponent(SortingButton, {
				name: "Tuning",
				onclick: () => column.toggleSorting(column.getIsSorted() === "asc")
			})
	},
	{
		accessorKey: "instrument",
		header: ({ column }) =>
			renderComponent(SortingButton, {
				name: "Instrument",
				onclick: () => column.toggleSorting(column.getIsSorted() === "asc")
			})
	},
	{
		accessorKey: "link",
		header: "Link",
		cell: ({ row }) => {
			const linkFormat = createRawSnippet(() => ({
				render: () => `<a href=${row.original.link} target="_blank">${row.original.link}</a>`
			}));

			return renderSnippet(linkFormat, "");
		}
	}
];
