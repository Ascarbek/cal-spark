<script lang="ts">
  import { putCall } from '$api/BackendCalls';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { CurrentUser } from '$components/_shared/Stores';

  let email = '';
  let displayName = '';
  let password = '';

  const onRegisterClick = async () => {
    if (!browser) return;
    await putCall<{ email: string; displayName: string }>(`/api/user`, {
      email,
      displayName,
    });

    await goto(`/confirmation-info`);

    /*await putCall<{ email: string; displayName: string; password: string }, {}>(`/api/user/temp-register`, {
      email,
      displayName,
      password,
    });

    $CurrentUser = {
      email,
      displayName,
    };

    await goto(`/`);*/
  };
</script>

<div class="flex items-center justify-center p-8">
  <div class="rounded-xl border border-neutral-400 p-4">
    <div class="flex flex-col gap-4">
      <div class="text-2xl font-semibold text-neutral-500">Registration</div>
      <div class="flex flex-col gap-2">
        <span>Email</span>
        <input bind:value="{email}" />
      </div>
      <div class="flex flex-col gap-2">
        <span>Display Name</span>
        <input bind:value="{displayName}" />
      </div>
      <!--<div class="flex flex-col gap-2">
        <span>Password</span>
        <input bind:value="{password}" />
      </div>-->
      <button class="rounded bg-main-400 py-2" on:click="{onRegisterClick}">Registration</button>
    </div>
  </div>
</div>

<style lang="postcss">
  input {
    @apply w-[300px] rounded border border-neutral-300 px-2 py-1;
  }
</style>
