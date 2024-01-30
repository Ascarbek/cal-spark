<script lang="ts">
  import { CurrentUser } from '$components/_shared/Stores';
  import { postCall, uploadCall } from '$api/BackendCalls';
  import { tick } from 'svelte';
  import type { IUser } from '$components/_shared/Types';
  import { PUBLIC_UPLOADS_PATH } from '$env/static/public';

  let displayName = '';
  let editingDisplayName = false;
  let displayNameEl: HTMLInputElement;

  let bio = '';
  let editingBio = false;
  let bioEl: HTMLTextAreaElement;

  const onFileSelect = async (e: any, fieldName: string) => {
    if (!$CurrentUser) return;

    const files = (e.target as HTMLInputElement).files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const formData = new FormData();
    formData.append('attached_file', file);
    formData.append('name', file.name);

    const resp = await uploadCall(`/api/upload-image`, formData);
    const id = resp.id;

    if (fieldName === 'cover') {
      $CurrentUser.cover = `${PUBLIC_UPLOADS_PATH}/${id}`;
    }
    if (fieldName === 'picture') {
      $CurrentUser.picture = `${PUBLIC_UPLOADS_PATH}/${id}`;
    }
    await postCall<IUser, {}>(`/api/user/edit`, $CurrentUser);
  };

  const editDisplayName = async () => {
    if (!$CurrentUser) return;
    displayName = $CurrentUser.displayName;
    editingDisplayName = true;
    await tick();
    displayNameEl.focus();
  };

  const editBio = async () => {
    if (!$CurrentUser) return;
    bio = $CurrentUser?.bio ?? '';
    editingBio = true;
    await tick();
    bioEl.focus();
  };

  const onSave = async (fieldName: string) => {
    if (!$CurrentUser) return;
    if (fieldName === 'displayName') {
      $CurrentUser.displayName = displayName;
      editingDisplayName = false;
    }
    if (fieldName === 'bio') {
      $CurrentUser.bio = bio;
      editingBio = false;
    }

    await postCall<IUser, {}>(`/api/user/edit`, $CurrentUser);
  };
</script>

{#if $CurrentUser}
  <div class="mx-auto max-w-[1100px]">
    <div class="group relative h-[200px] bg-neutral-300">
      <div class="relative h-full overflow-hidden">
        {#if $CurrentUser.cover?.length}
          <img alt="" src="{$CurrentUser.cover}" class="absolute inset-0 m-auto max-w-full object-cover" />
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

    <div class="flex pt-[50px]">
      <div class="relative flex flex-1 flex-col gap-4">
        <div class="absolute inset-x-0 mx-auto w-[90px]">
          <div class="absolute -top-[96px]">
            <div
              class="group relative h-[90px] w-[90px] overflow-hidden rounded-full border border-neutral-500 bg-white"
            >
              {#if $CurrentUser.picture?.length}
                <img
                  alt=""
                  src="{$CurrentUser.picture}"
                  class="absolute inset-0 m-auto max-h-full max-w-full object-cover"
                />
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

        <div class="flex items-center justify-center text-2xl">
          <div class="group relative" on:click="{editDisplayName}">
            {#if editingDisplayName}
              <input
                bind:this="{displayNameEl}"
                bind:value="{displayName}"
                on:blur="{() => onSave('displayName')}"
                class="border-b border-neutral-400 text-center"
              />
            {:else}
              {$CurrentUser.displayName}
            {/if}
            <button
              class="absolute left-full px-4 text-[20px] text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>
        </div>
        <div
          class="relative mr-8 min-h-[150px] rounded-2xl p-2 transition-colors duration-300 hover:bg-neutral-200"
          on:click="{editBio}"
        >
          {#if editingBio}
            <textarea
              bind:this="{bioEl}"
              bind:value="{bio}"
              on:blur="{() => onSave('bio')}"
              class="h-full w-full border border-neutral-400"
            ></textarea>
          {:else}
            {$CurrentUser?.bio ?? ''}
          {/if}
        </div>

        <div class="flex items-center gap-4">
          <div class="tab-item">Competitions</div>
          <div class="tab-item">Projects</div>
          <div class="tab-item">Bounties</div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div>Latest Contributions</div>
        <div class="flex flex-col gap-2">
          <div class="rounded-2xl bg-neutral-200 py-4"></div>
          <div class="rounded-2xl bg-neutral-200 py-4"></div>
          <div class="rounded-2xl bg-neutral-200 py-4"></div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  .tab-item {
    @apply text-2xl font-semibold text-neutral-500;
  }
</style>
