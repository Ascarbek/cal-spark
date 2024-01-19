<script lang="ts">
  import { CurrentUser } from '$components/_shared/Stores.js';
  import UserMenu from '$components/navigation/UserMenu.svelte';

  let showUserMenu = false;
</script>

<div class="relative">
  <button on:click="{() => (showUserMenu = !showUserMenu)}" class="relative flex items-center gap-2">
    <div
      class="flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-full border border-neutral-300 bg-white"
    >
      <i class="text-[20px] text-neutral-200">
        <i class="fa-solid fa-user"></i>
      </i>
    </div>
    <span class="text-neutral-600">{$CurrentUser?.displayName}</span>
  </button>
  {#if showUserMenu}
    <UserMenu on:close="{() => (showUserMenu = false)}" />
  {/if}
</div>
