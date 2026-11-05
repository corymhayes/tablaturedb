<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import * as Tooltip from "$lib/components/ui/tooltip";

	let { children } = $props();

	const links = [
		{ name: "Account", href: "/settings/account" },
		{ name: "Tunings", href: "/settings/tunings" },
		{ name: "Instruments", href: "/settings/instruments" }
	];
</script>

<div class="mt-20 w-full">
	<Tooltip.Provider>
		<div class="flex min-w-0 flex-col gap-8 lg:flex-row">
			<aside class="w-full shrink-0 lg:w-60">
				<nav aria-label="Settings">
					<ul class="flex flex-col gap-6">
						{#each links as link (link)}
							{#if page.url.pathname === link.href}
								<li class="border-l border-primary pl-3 -ml-3">
									<a
										href={resolve(link.href)}
										class="text-primary font-mono font-light uppercase tracking-widest text-sm"
										>{link.name}</a
									>
								</li>
							{:else}
								<li class="font-mono font-light hover:text-primary cursor-pointer">
									<a
										href={resolve(link.href)}
										class="font-mono font-light uppercase tracking-widest text-sm">{link.name}</a
									>
								</li>
							{/if}
						{/each}
					</ul>
				</nav>
			</aside>

			<div class="min-w-0 flex-1 lg:border-l lg:border-border lg:pl-10">
				{@render children()}
			</div>
		</div>
	</Tooltip.Provider>
</div>
