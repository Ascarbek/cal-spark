<script lang="ts">
  import { postCall, putCall, uploadCall } from '$api/BackendCalls';
  import { goto } from '$app/navigation';
  import TagsInput from '$components/_shared/TagsInput.svelte';
  import { PUBLIC_UPLOADS_PATH } from '$env/static/public';

  let name = '';
  let description = '';
  let fullDescription = '';
  let cover = '';
  let picture = '';
  let category = '';
  let incentive = '';
  let amount = '';
  let tags: string[] = [];

  let categories = ['Hackaton', 'Research'];
  let incentives = ['Money Prize', 'Knowledge'];

  const onFileSelect = async (e: any, fieldName: string) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const formData = new FormData();
    formData.append('attached_file', file);
    formData.append('name', file.name);

    const resp = await uploadCall(`/api/upload-image`, formData);
    const id = resp.id;

    if (fieldName === 'cover') {
      cover = `${PUBLIC_UPLOADS_PATH}/${id}`;
    }
    if (fieldName === 'picture') {
      picture = `${PUBLIC_UPLOADS_PATH}/${id}`;
    }
  };

  const onCreateClick = async () => {
    await putCall<
      {
        name: string;
        description: string;
        fullDescription: string;
        picture: string;
        cover: string;
        tags: string[];
        incentive: string;
        category: string;
      },
      {}
    >(`/api/project`, {
      name,
      description,
      fullDescription,
      picture,
      cover,
      tags,
      incentive: incentive === 'Money Prize' ? amount : incentive,
      category,
    });

    await goto(`/projects`);
  };
</script>

<div class="container mx-auto">
  <div class="group relative h-[200px] bg-neutral-300">
    <div class="relative h-full overflow-hidden">
      {#if cover.length}
        <img alt="" src="{cover}" class="absolute inset-0 m-auto max-w-full object-cover" />
      {/if}
      <div
        class="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <i class="text-[80px] text-white">
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </i>
      </div>
      <input type="file" on:change="{(e) => onFileSelect(e, 'cover')}" class="absolute inset-0 opacity-0" />
    </div>
  </div>

  <div class="relative">
    <div class="absolute -top-[45px] left-[40px]">
      <div class="group relative h-[90px] w-[90px] overflow-hidden rounded-full border border-neutral-500 bg-white">
        {#if picture.length}
          <img alt="" src="{picture}" class="absolute inset-0 m-auto max-h-full max-w-full object-cover" />
        {/if}
        <div
          class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <i class="text-[40px] text-white">
            <i class="fa-solid fa-cloud-arrow-up"></i>
          </i>
        </div>
        <input type="file" on:change="{(e) => onFileSelect(e, 'picture')}" class="absolute inset-0 opacity-0" />
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-4 py-8">
    <div class="flex flex-col gap-2">
      <span>Name</span>
      <input bind:value="{name}" />
    </div>

    <div class="flex flex-col gap-2">
      <span>Short Description</span>
      <input bind:value="{description}" />
    </div>

    <div class="flex flex-col gap-2">
      <span>Tags</span>
      <TagsInput bind:data="{tags}" />
    </div>

    <div class="flex flex-col gap-2">
      <span>Category</span>
      <select bind:value="{category}">
        <option>Select category</option>
        {#each categories as cat}
          <option value="{cat}">{cat}</option>
        {/each}
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <span>Incentive</span>
      <select bind:value="{incentive}">
        <option>Select incentive</option>
        {#each incentives as inc}
          <option value="{inc}">{inc}</option>
        {/each}
      </select>
    </div>

    {#if incentive === 'Money Prize'}
      <div class="flex flex-col gap-2">
        <span>Prize Amount</span>
        <input bind:value="{amount}" />
      </div>
    {/if}

    <div class="flex flex-col gap-2">
      <span>Description</span>
      <textarea bind:value="{fullDescription}"></textarea>
    </div>

    <div class="flex items-center justify-center">
      <button class="bg-main-400 px-12 py-2" on:click="{onCreateClick}">Create Project</button>
    </div>
  </div>
</div>

<style lang="postcss">
  input,
  textarea,
  select {
    @apply rounded border border-neutral-300 px-2 py-1;
  }

  textarea {
    @apply h-[400px];
  }
</style>
