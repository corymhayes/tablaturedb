<script lang="ts">
	import { resolve } from "$app/paths";

	type DemoTab = {
		id: string;
		song: string;
		artist: string;
		tuning: string;
		link: string;
	};

	const demoTabs: DemoTab[] = [
		{
			id: "demo-1",
			song: "Fight Fire with Fire",
			artist: "Metallica",
			tuning: "Standard",
			link: "https://tabs.ultimate-guitar.com"
		},
		{
			id: "demo-2",
			song: "Another Brick in the Wall, pt. 2",
			artist: "Pink Floyd",
			tuning: "Standard",
			link: "https://www.pinkfloyd.com"
		},
		{
			id: "demo-3",
			song: "Testify",
			artist: "Rage Against the Machine",
			tuning: "Drop D",
			link: "https://www.ratm.com"
		},
		{
			id: "demo-4",
			song: "Scar Tissue",
			artist: "Red Hot Chili Peppers",
			tuning: "Standard",
			link: "https://www.rhcp.com"
		},
		{
			id: "demo-5",
			song: "Pneuma",
			artist: "Tool",
			tuning: "Drop D",
			link: "https://www.toolband.com"
		}
	];
</script>

<svelte:head>
	<title>Try the Demo — TablatureDB</title>
	<meta
		name="description"
		content="Explore a sample TablatureDB collection without creating an account."
	/>
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a] p-6 font-mono">
	<header
		class="mx-auto flex max-w-7xl items-center justify-between border-b border-[#292929] pb-6"
	>
		<a href={resolve("/")} class="text-2xl font-medium">
			TABLATURE<span class="text-primary">DB</span>
		</a>

		<div class="flex gap-4">
			<a href={resolve("/")} class="rounded border border-[#292929] px-5 py-3 uppercase">
				Log in
			</a>

			<a href={resolve("/")} class="rounded bg-primary px-5 py-3 uppercase"> Sign up </a>
		</div>
	</header>

	<main class="mx-auto max-w-7xl">
		<section class="py-16 text-center">
			<h1 class="text-4xl uppercase md:text-5xl">
				Explore a sample <span class="text-primary">tab library.</span>
			</h1>

			<p class="mx-auto mt-6 max-w-2xl text-[#a3a3a3]">
				This is a read-only demo using example songs. Create an account to save and organize your
				own tabs.
			</p>
		</section>

		<section class="overflow-hidden rounded border border-[#292929]">
			<div class="grid grid-cols-4 border-b border-[#292929] p-5 font-bold">
				<span>Song</span>
				<span>Artist</span>
				<span>Tuning</span>
				<span>Link</span>
			</div>

			{#each demoTabs as tab (tab.id)}
				<div class="grid grid-cols-4 border-b border-[#292929] p-5 last:border-b-0">
					<span>{tab.song}</span>
					<span>{tab.artist}</span>
					<span>{tab.tuning}</span>
					<a href={tab.link} target="_blank" rel="external" class="truncate underline">
						Open tab
					</a>
				</div>
			{/each}
		</section>

		<section class="py-16 text-center">
			<h2 class="text-2xl uppercase">Ready to build your own collection?</h2>

			<a href={resolve("/")} class="mt-6 inline-block rounded bg-primary px-8 py-4 uppercase">
				Get started
			</a>
		</section>
	</main>
</div>
