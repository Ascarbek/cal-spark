<script lang="ts">
  import type { ICompetition } from '$components/_shared/Types';

  export let data: ICompetition;
</script>

<div class="rounded-2xl border border-neutral-500 bg-neutral-200 px-3 py-2">
  <div class="flex w-[200px] flex-col gap-2">
    <div class="h-[100px] w-full overflow-hidden rounded-2xl">
      <img alt="" src="{data.cover}" class="object-fit max-h-full max-w-none" />
    </div>

    <div class="flex min-w-0 max-w-full items-center gap-2">
      <div class="h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-full">
        <img alt="" src="{data.picture}" />
      </div>
      <div class="flex min-w-0 flex-1 flex-col">
        <div class="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {data.name}
        </div>
        <div class="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
          {data.description}
        </div>
      </div>
    </div>

    <div class="flex items-center gap-1 text-xs">
      {#each data.tags as tag}
        <div class="rounded-xl border border-neutral-500 bg-white px-1 py-0.5">{tag}</div>
      {/each}
    </div>
  </div>
</div>
