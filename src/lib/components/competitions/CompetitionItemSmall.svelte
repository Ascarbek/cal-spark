<script lang="ts">
  import type { ICompetition } from '$components/_shared/Types';

  export let data: ICompetition;
</script>

<div class="w-[350px] rounded-2xl border border-neutral-500 bg-white">
  <div class="flex gap-2 p-2">
    <div class="flex flex-1 items-center gap-2">
      <div class="h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-full">
        <img src="{data.picture}" alt="" />
      </div>

      <div class="flex flex-1 flex-col gap-1">
        <div class="text-sm">{data.name}</div>
        <div class="text-xs">{data.description}</div>
        <div class="text-xs">Lorem Ipsum</div>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <div class="rounded-lg border border-neutral-500 bg-neutral-100 px-1 py-0.5 text-center text-xs text-neutral-500">
        open
      </div>
      <div class="rounded-lg border border-neutral-500 bg-neutral-100 px-1 py-0.5 text-center text-xs text-neutral-500">
        Feb 10
      </div>
    </div>
  </div>
</div>
