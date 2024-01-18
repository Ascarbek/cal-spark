<script lang="ts">
  import '../styles/font.css';
  import '../styles/tailwind.css';
  import '../styles/common.css';
  import TopNav from '$components/navigation/TopNav.svelte';
  import { ShowLoginModal } from '$components/_shared/Stores';
  import LoginModal from '$components/_shared/LoginModal.svelte';
</script>

<TopNav></TopNav>
<slot />
{#if $ShowLoginModal}
  <LoginModal></LoginModal>
{/if}
