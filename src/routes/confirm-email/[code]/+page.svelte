<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { postCall } from '$api/BackendCalls';
  import { CurrentUser } from '$components/_shared/Stores';
  import { goto } from '$app/navigation';
  import type { IUser } from '$components/_shared/Types';
  import { AUTHORIZATION_KEY } from '$components/_shared/constants';

  let confirmed = false;
  let error = false;

  onMount(async () => {
    const params: any = $page.params;
    console.log(params.code);
    const resp = await postCall<{ code: string }, { confirmed: boolean; email?: string; displayName?: string }>(
      `/api/user/confirm`,
      {
        code: params.code,
      }
    );
    console.log(resp);
    confirmed = resp.confirmed;
    if (confirmed && resp.displayName && resp.email) {
      $CurrentUser = {
        displayName: resp.displayName,
        email: resp.email,
      };
    } else {
      error = true;
    }
  });

  let newPassword = '';
  let confirmPassword = '';

  const onSetPasswordClick = async () => {
    if (newPassword.length > 0 && newPassword !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    await postCall<{ email: string; password: string }, {}>(`/api/user/change-password`, {
      email: $CurrentUser?.email ?? '',
      password: newPassword,
    });
    const resp = await postCall<
      { email: string; password: string },
      { valid: boolean; data: IUser | undefined; accessToken: string | undefined }
    >(`/api/user/auth`, {
      email: $CurrentUser?.email ?? '',
      password: newPassword,
    });

    const { valid, data, accessToken } = resp;

    if (valid && data && accessToken) {
      $CurrentUser = {
        ...data,
      };
      localStorage.setItem(AUTHORIZATION_KEY, accessToken);
      await goto('/');
    }
  };
</script>

{#if confirmed}
  <div class="flex items-center justify-center py-16">
    <div class="flex flex-col">
      <div class="mb-8 text-3xl text-green-500">Your email was confirmed!</div>
      <div class="mb-4">Now you need to set password for your account.</div>

      <div class="rounded-xl border border-neutral-400 px-8 py-4">
        <div class="flex flex-col items-center gap-4">
          <div class="flex flex-col gap-1">
            <span>New Password</span>
            <input bind:value="{newPassword}" type="password" />
          </div>
          <div class="flex flex-col gap-1">
            <span>Confirm Password</span>
            <input bind:value="{confirmPassword}" type="password" />
          </div>
          <button on:click="{onSetPasswordClick}" class="w-full rounded-lg bg-main-400 py-2">Set Password</button>
        </div>
      </div>
    </div>
  </div>
{:else if error}
  <div class="flex items-center justify-center p-8">
    <div class="border border-red-500 px-8 py-12">
      <div class="flex items-center justify-center text-2xl text-red-500">Incorrect code</div>
    </div>
  </div>
{:else}
  <div class="flex items-center justify-center p-8">
    <div class="border border-green-500 px-8 py-12">
      <div class="flex items-center justify-center text-2xl">Confirming</div>
    </div>
  </div>
{/if}

<style lang="postcss">
  input {
    @apply w-[300px] rounded border border-neutral-300 px-2 py-1;
  }
</style>
