<script lang="ts">
	// import type { ComponentProps } from "svelte";
	import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
	import { Button } from "$lib/components/ui/button/index.js";

	let { header, column, ...restProps } = $props();
</script>

<Button
	variant="ghost"
	class="p-0 font-mono uppercase text-[16px]"
	onclick={column.getToggleSortingHandler()}
	{...restProps}
>
	{header}
	<ArrowUpDownIcon class="ms-2" />
</Button>
