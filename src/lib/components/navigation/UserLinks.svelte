<script lang="ts">
  import { CurrentUser } from '$components/_shared/Stores';
  import { showLogin } from '$components/_shared/Modals';

  const onSignInClick = () => {
    showLogin();
  };
</script>

{#if $CurrentUser}
  <div class="flex items-center gap-2">
    <i class="text-[40px] text-main-500">
      <i class="fa-solid fa-user"></i>
      <span>{$CurrentUser.displayName}</span>
    </i>
  </div>
{:else}
  <div class="flex items-center gap-4">
    <button on:click="{onSignInClick}">Sign In</button>
    <a href="/register" class="rounded-xl bg-main-400 px-8 py-2 text-white">Register</a>
  </div>
{/if}
