<script lang="ts">
  import type { ICompetition } from '$components/_shared/Types';

  export let data: ICompetition;
</script>

<div class="relative h-[300px] w-[500px] overflow-hidden rounded-2xl border border-neutral-500">
  <img src="{data.cover}" alt="" class="max-h-full max-w-none object-none" />
  <div class="absolute bottom-0 right-0 pb-4 pr-8">
    <div class="w-[250px] rounded-2xl border-2 border-neutral-500 bg-neutral-200">
      <div class="flex flex-col gap-2 px-2 py-2">
        <div class="flex items-center gap-2">
          <div class="h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-full">
            <img src="{data.picture}" alt="" />
          </div>
          <div class="flex min-w-0 flex-col text-black">
            <div class="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm">{data.name}</div>
            <div class="text-xs">{data.description}</div>
          </div>
        </div>
        <div class="flex items-center gap-1 text-xs">
          {#each data.tags as tag}
            <div class="rounded-xl border border-neutral-500 bg-white px-1 py-0.5">{tag}</div>
          {/each}
        </div>
        <div class="flex items-center justify-center">
          <button class="rounded-xl bg-main-400 px-8 py-1 text-xs">Apply</button>
        </div>
      </div>
    </div>
  </div>
</div>
