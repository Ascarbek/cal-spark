<script lang="ts">
  import { CurrentUser } from '$components/_shared/Stores';
  import { showLogin } from '$components/_shared/Modals';
  import UserNav from '$components/navigation/UserNav.svelte';

  const onSignInClick = () => {
    showLogin();
  };
</script>

{#if $CurrentUser}
  <UserNav />
{:else}
  <div class="flex items-center gap-4">
    <button on:click="{onSignInClick}">Sign In</button>
    <a href="/register" class="rounded-xl bg-main-400 px-8 py-2 text-white">Register</a>
  </div>
{/if}
