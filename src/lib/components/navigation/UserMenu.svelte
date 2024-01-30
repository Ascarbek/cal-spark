<script lang="ts">
  import { CurrentUser } from '$components/_shared/Stores';
  import { createEventDispatcher } from 'svelte';
  import { AUTHORIZATION_KEY } from '$components/_shared/constants';

  const dispatch = createEventDispatcher();

  const onLogoutClick = () => {
    localStorage.removeItem(AUTHORIZATION_KEY);
    $CurrentUser = undefined;
  };

  let el: HTMLDivElement;
  let initial = true;

  const documentClick = (e: any) => {
    if (initial) {
      initial = false;
      return;
    }
    if (el.contains(e.target)) {
      return;
    }
    dispatch('close');
  };
</script>

<svelte:window on:click="{documentClick}" />

<div bind:this="{el}" class="absolute right-0 top-[35px] z-20">
  <div class="rounded-xl border border-neutral-500 bg-white">
    <div class="flex min-w-[200px] flex-col items-start gap-2 p-4" on:click="{() => dispatch('close')}">
      <a href="/profile">Profile</a>
      <a href="/settings">Settings</a>
      <div class="h-[1px] w-full bg-neutral-400"></div>
      <a href="/competitions/create">New Competition</a>
      <a href="/projects/create">New Project</a>
      <a href="/bounties/create">New Bounty</a>
      <div class="h-[1px] w-full bg-neutral-400"></div>
      <button class="w-full text-left text-neutral-700 hover:text-black hover:underline" on:click="{onLogoutClick}">
        Logout
      </button>
    </div>
  </div>
</div>

<style lang="postcss">
  a {
    @apply w-full text-left text-neutral-700 hover:text-black hover:underline;
  }
</style>
