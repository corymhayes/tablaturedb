<script lang="ts">
	import "./layout.css";
	import { Toaster } from "$lib/components/ui/sonner";
	import { ModeWatcher } from "mode-watcher";
	import favicon from "$lib/assets/favicon.svg";
	import { Button } from "$lib/components/ui/button";
	import * as Sidebar from "$lib/components/ui/sidebar";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Toaster />
<ModeWatcher />

<Sidebar.Provider>
	<Sidebar.Root>
		<Sidebar.Content>
			<Sidebar.Header>
				<h1 class="font-mono text-2xl tracking-widest font-medium">
					TABLATURE<span class="text-primary">DB</span>
				</h1>
				<div class="flex">
					<div class="size-4 border-l border-b"></div>
					<h4 class="block mt-1 pl-2 font-mono tracking-[0.2em] text-sm text-white/50">SETTINGS</h4>
				</div>
			</Sidebar.Header>

			<Button
				type="button"
				variant="outline"
				class="flex justify-start pl-4 mt-6 mb-10 normal-case tracking-wide font-light"
			>
				<img src="/plus.svg" alt="add a tab" /> Add a tab
			</Button>

			<div class="w-full h-px bg-border mb-6"></div>

			<nav>
				<ul class="flex flex-col gap-6">
					<li class="font-extralight tracking-wider text-sm pl-2 flex gap-2 hover:text-primary">
						<img src="/binary.svg" alt="settings menu option" class="background-primary" />
						<a href="/" class="hover:text-primary">Tab Library</a>
					</li>
					<li class="font-extralight tracking-wider text-sm pl-2 flex gap-2">
						<img src="/heart.svg" alt="settings menu option" class="background-primary" />
						<a href="/" class="hover:text-primary">Favorites</a>
					</li>
					<li
						class="font-extralight tracking-wider text-primary border-l border-primary pl-2 w-full flex gap-2 text-sm"
					>
						<img
							src="/gear-six-active.svg"
							alt="settings menu option"
							class="background-primary"
						/>Settings
					</li>
				</ul>
			</nav>
		</Sidebar.Content>
	</Sidebar.Root>

	<main class="pt-6 flex w-full">
		<div class="mt-4 ml-4 mr-8 h-fullr">
			<Sidebar.Trigger />
		</div>

		{@render children()}
	</main>
</Sidebar.Provider>
