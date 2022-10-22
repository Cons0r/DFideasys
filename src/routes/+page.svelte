<script lang=ts>
    import { onMount } from "svelte";
    import { currentData } from '$lib/store'
    const wait = (ts: number) => new Promise((res) => {
        setTimeout(res, ts)
    })
    onMount(refresh)
    async function getData() {
        const r = await fetch('/api/ideas', {
            method: 'GET'
        })
        return await r.json()
    }

    async function refresh(e?: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
        console.log(e)
        e?.currentTarget?.querySelector('svg')?.classList.add('animate-spin')
        const target = e?.currentTarget
        const data = await getData()
        await wait(400)
        currentData.set(data)
        target?.querySelector('svg')?.classList.remove('animate-spin')
    }
</script>

<div class="h-screen w-screen flex flex-col">
    <div class="w-full max-h-24 px-2 bg-base-300 flex items-center">
        <button class="mykbd" on:click={refresh}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <div class="w-2"></div>
            <span>Refresh</span>    
        </button>
    </div>
</div>


<style lang=postcss>
    .mykbd {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-width: 1px;
        border-color: hsl(var(--nf, var(--n)) / var(--tw-border-opacity));
        --tw-border-opacity: 0.2;
        --tw-bg-opacity: 1;
        background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border-radius: var(--rounded-btn, 0.5rem);
        border-bottom-width: 2px;
    }
</style>