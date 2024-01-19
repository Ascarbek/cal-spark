<script lang="ts">
  import { onMount } from 'svelte';
  import { getCall } from '$api/BackendCalls';
  import type { IProject } from '$components/_shared/Types';
  import ProjectItem from '$components/projects/ProjectItem.svelte';

  let items: IProject[] = [];

  onMount(async () => {
    items = await getCall<{}, IProject[]>(`/api/project`, {});
  });
</script>

<div class="border-b border-t border-neutral-500 bg-neutral-200 py-8">
  <div class="container mx-auto">
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <div class="text-3xl font-semibold">Projects</div>
      </div>
    </div>
  </div>
</div>

<div class="container mx-auto">
  <div class="flex items-center justify-center pt-8">
    <div class="flex gap-4">
      <div class="text-xl text-neutral-500">My Projects</div>
      <div class="h-40px w-[1px] bg-neutral-500"></div>
      <div class="text-xl text-neutral-500">All Projects</div>
    </div>
  </div>
  <div class="flex flex-col gap-8 py-8">
    {#each items as item, index}
      <ProjectItem data="{item}"></ProjectItem>
    {/each}
  </div>
</div>
