<script lang="ts">
	import type { Tab } from "../tabs/columns";

	import { resolve } from "$app/paths";
	import DataTable from "../tabs/data-table.svelte";
	import { demoColumns } from "./demo-columns";

	const demoTabs: Tab[] = [
		{
			id: "demo-1",
			song: "Comfortably Numb",
			artist: "Pink Floyd",
			tuning: "Standard",
			link: null
		},
		{
			id: "demo-2",
			song: "Another Brick in the Wall, Pt. 2",
			artist: "Pink Floyd",
			tuning: "Standard",
			link: null
		},
		{
			id: "demo-3",
			song: "Shine On You Crazy Diamond (1-5)",
			artist: "Pink Floyd",
			tuning: "Standard",
			link: null
		},
		{
			id: "demo-4",
			song: "Creeping Death",
			artist: "Metallica",
			tuning: "Standard",
			link: null
		},
		{
			id: "demo-5",
			song: "Snow (Hey Oh)",
			artist: "Red Hot Chili Peppers",
			tuning: "Standard",
			link: null
		},
		{
			id: "demo-6",
			song: "Closer to Home (I'm Your Captain)",
			artist: "Grand Funk Railroad",
			tuning: "Standard",
			link: null
		},
		{
			id: "demo-7",
			song: "War Pigs",
			artist: "Black Sabbath",
			tuning: "Standard",
			link: null
		},
		{
			id: "demo-8",
			song: "Unholy Confessions",
			artist: "Avenged Sevenfold",
			tuning: "Drop D",
			link: null
		},
		{
			id: "demo-9",
			song: "You Won't Know",
			artist: "Brand New",
			tuning: "Standard",
			link: null
		},
		{
			id: "demo-10",
			song: "Sugar",
			artist: "System of a Down",
			tuning: "Drop C",
			link: null
		},
		{
			id: "demo-11",
			song: "Toxicity",
			artist: "System of a Down",
			tuning: "Drop C",
			link: null
		},
		{
			id: "demo-12",
			song: "In Keeping Secrets of Silent Earth: 3",
			artist: "Coheed and Cambria",
			tuning: "Standard",
			link: null
		},
		{
			id: "demo-13",
			song: "Welcome Home",
			artist: "Coheed and Cambria",
			tuning: "Half-step Down",
			link: null
		},
		{
			id: "demo-14",
			song: "Money for Nothing",
			artist: "Dire Straits",
			tuning: "Standard",
			link: null
		},
		{
			id: "demo-15",
			song: "Landing on the Mountains of Megiddo",
			artist: "Down",
			tuning: "Whole-step Down",
			link: null
		},
		{
			id: "demo-16",
			song: "Stairway to Heaven",
			artist: "Led Zeppelin",
			tuning: "Standard",
			link: null
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
			<DataTable data={demoTabs} columns={demoColumns} />
		</section>

		<section class="py-16 text-center">
			<h2 class="text-2xl uppercase">Ready to build your own collection?</h2>

			<a href={resolve("/")} class="mt-6 inline-block rounded bg-primary px-8 py-4 uppercase">
				Get started
			</a>
		</section>
	</main>
</div>
