<script lang="ts">
  import '../styles/font.css';
  import '../styles/tailwind.css';
  import '../styles/common.css';
  import TopNav from '$components/navigation/TopNav.svelte';
  import { CurrentUser, ShowLoginModal } from '$components/_shared/Stores';
  import LoginModal from '$components/_shared/LoginModal.svelte';
  import { onMount } from 'svelte';
  import { postCall } from '$api/BackendCalls';
  import { authorizationKey } from '$components/_shared/constants';
  import type { IUser } from '$components/_shared/Types';

  onMount(async () => {
    const response = await postCall<{ token: string }, { valid: boolean; data: IUser }>(`/api/user/validate-token`, {
      token: localStorage.getItem(authorizationKey) || '',
    });
    if (response.valid && response.data) {
      $CurrentUser = {
        ...response.data,
      };
    }
  });
</script>

<TopNav></TopNav>
<slot />
{#if $ShowLoginModal}
  <LoginModal></LoginModal>
{/if}
