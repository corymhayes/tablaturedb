import type { ColumnDef } from "@tanstack/table-core";
import type { Tab } from "../tabs/columns";
import { renderComponent } from "$lib/components/ui/data-table";
import DataTableHeaderButton from "../tabs/data-table-header-button.svelte";
import LinkCell from "../tabs/link-cell.svelte";
import DemoActions from "./demo-actions.svelte";

export const demoColumns: ColumnDef<Tab>[] = [
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
			}),
		cell: ({ cell }) => {
			return cell.getValue() ?? "";
		}
	},
	{
		accessorKey: "tuning",
		header: ({ column }) =>
			renderComponent(DataTableHeaderButton, {
				header: "Tuning",
				column
			}),
		cell: ({ cell }) => {
			return cell.getValue() ?? "";
		}
	},
	{
		accessorKey: "link",
		header: "Link",
		cell: ({ cell }) => {
			const link = cell.getValue() as string | null;
			return renderComponent(LinkCell, { link });
		}
	},
	{
		id: "actions",
		cell: () => {
			return renderComponent(DemoActions);
		}
	}
];
