<script lang="ts">
  export let data: string = '';
  export let active = false;
</script>

<button class:active on:click>
  {data}
</button>

<style lang="postcss">
  button {
    @apply rounded-2xl border border-neutral-300 px-4 py-1;
  }

  .active {
    @apply border-main-700 bg-main-200 ;
  }
</style>
