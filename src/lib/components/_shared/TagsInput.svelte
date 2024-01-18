<script lang="ts">
  export let data: string[] = [];

  let value = '';

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      data = [...data, value];
      value = '';
    }
  };
</script>

<div class="flex items-center gap-2 rounded border border-neutral-300 px-2">
  {#each data as item}
    <div class="flex items-center rounded-2xl border border-neutral-500 py-0.5 pl-2 text-xs">
      <span>{item}</span>

      <button class="px-2 py-1 hover:text-main-500">x</button>
    </div>
  {/each}
  <input class="flex-1 py-2" bind:value on:keydown="{onKeyDown}" />
</div>
