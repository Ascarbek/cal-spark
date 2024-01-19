<script lang="ts">
  import type { IProject } from '$components/_shared/Types';

  export let data: IProject;
</script>

<div class="flex items-center gap-4">
  <div
    class="h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg"
    style="{`background: center center url(\"${data.cover}\"); background-size: cover`}"
  ></div>
  <div class="flex flex-col">
    <div class="text-xl">{data.name}</div>
    <div class="mb-2">{data.description}</div>
    <div class="flex items-center gap-2">
      {#each data.tags as tag}
        <div class="rounded-2xl border border-neutral-400 px-2 py-0.5 text-xs">{tag}</div>
      {/each}
    </div>
  </div>
</div>
