<script lang="ts">
  import { CurrentUser, ShowLoginModal } from '$components/_shared/Stores';
  import { postCall } from '$api/BackendCalls';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';

  const onLoginClick = async () => {
    const resp = await postCall<
      { email: string; password: string },
      { valid: boolean; displayName?: string; email?: string }
    >(`/api/user/auth`, {
      email,
      password,
    });
    const { valid, displayName } = resp;
    if (valid && displayName) {
      $CurrentUser = {
        email,
        displayName,
      };
      await goto('/');
      $ShowLoginModal = false;
    } else {
      alert('password is incorrect or user is not registered');
    }
  };
</script>

<div class="fixed inset-0 backdrop-blur" on:click="{() => ($ShowLoginModal = false)}">
  <div class="flex h-full items-center justify-center">
    <div class="rounded-xl border border-neutral-400 bg-white px-8 py-4" on:click|stopPropagation>
      <div class="flex flex-col gap-4">
        <div class=" text-xl font-semibold">Sign In</div>

        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <span>Email</span>
            <input bind:value="{email}" type="text" />
          </div>
          <div class="flex flex-col gap-1">
            <span>Password</span>
            <input bind:value="{password}" type="password" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div on:click="{onLoginClick}" class="rounded bg-main-400 py-2 text-center">Sign In</div>
          <div class="text-right text-xs text-neutral-500">
            Don't have an account yet? <a
              href="/register"
              class="text-blue-500 hover:underline"
              on:click="{() => ($ShowLoginModal = false)}"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  input {
    @apply w-[300px] rounded border border-neutral-300 px-2 py-1;
  }
</style>
