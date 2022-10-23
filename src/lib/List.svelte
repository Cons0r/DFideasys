<script lang=ts>
    import { currentData, isBook, openBookID } from "$lib/store";
</script>

{#each $currentData as idea (idea._id) }
    <button class="w-full flex flex-col" on:click={() => {
        openBookID.set(idea._id.toString())
        isBook.set(true)
    }}>
        <span class="text-neutral-content">{idea.username}</span>
    </button>
{/each}