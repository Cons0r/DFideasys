<script lang=ts>
	import { isBook, openBookID } from '$lib/store'
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	let book: string | Array<string> = "loading"
	onMount(async () => {
		const r = await fetch(`/api/ideas/${$openBookID}/book`)
		book = await r.json()
	})
	const page = writable<number>(1)
	const nav = {
		prev: () => {
			if($page === 1) return
			return $page--
		},
		next: () => {
			if($page === book.length) return
			return $page++
		}
	}

	function close() {
		isBook.set(false)
		openBookID.set(null)
	}
</script>

<div class="z-50 absolute top-0 right-0 flex h-screen w-screen flex-col backdrop-brightness-75">
	<div class="flex max-h-20 flex-grow flex-row">
		<div class="flex-grow"></div>
		<button class="kbd h-6 w-6 rounded-full translate-y-4 -translate-x-4" on:click={close}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</button>
	</div>
	<div class="flex flex-grow flex-row">
		<div class="flex max-w-[10rem] flex-grow items-end justify-center">
			<button class="kbd h-6 w-6 rounded-full" on:click={nav.prev}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
				</svg>
			</button>
		</div>
		<div class="flex-grow rounded-3xl bg-base-200 p-4 shadow-lg" class:f={book === "loading"}>
			{#if book === "loading"}
				<button class="btn btn-square loading"></button>
			{:else}
				{book[$page-1]}
			{/if}
		</div>
		<div class="flex max-w-[10rem] flex-grow items-end justify-center">
			<button class="kbd h-6 w-6 rounded-full" on:click={nav.next}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
				</svg>
			</button>
		</div>
	</div>
	<div class="max-h-20 flex-grow">
	</div>
</div>

<style lang=postcss>
	button {
		@apply hover:scale-150 transition-all
	}

	.f {
		@apply flex items-center justify-center
	}
</style>