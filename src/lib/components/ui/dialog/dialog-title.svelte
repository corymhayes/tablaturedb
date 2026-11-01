<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.TitleProps = $props();
</script>

<DialogPrimitive.Title
	bind:ref
	data-slot="dialog-title"
	class={cn(
		"font-mono tracking-[0.2em] text-base uppercase font-light underline decoration-border underline-offset-16 ",
		className
	)}
	{...restProps}
/>
