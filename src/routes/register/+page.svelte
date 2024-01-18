<script lang="ts">
  import { putCall } from '$api/BackendCalls';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  let email = '';
  let displayName = '';

  const onRegisterClick = async () => {
    if (!browser) return;
    await putCall<{ email: string; displayName: string }>(`/api/user`, {
      email,
      displayName,
    });

    await goto(`/confirmation-info`);
  };
</script>

<div>
  <input class="border" bind:value="{email}" placeholder="" />
  <input class="border" bind:value="{displayName}" placeholder="" />
  <button on:click="{onRegisterClick}">Register</button>
</div>
