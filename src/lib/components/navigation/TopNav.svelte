<script lang="ts">
  import AppLogo from '$components/navigation/AppLogo.svelte';
  import TopNavLinks from '$components/navigation/TopNavLinks.svelte';
  import UserLinks from '$components/navigation/UserLinks.svelte';
</script>

<div class="bg-neutral-100">
  <div class="container mx-auto">
    <div class="flex items-center justify-between py-4">
      <AppLogo></AppLogo>
      <TopNavLinks></TopNavLinks>
      <UserLinks></UserLinks>
    </div>
  </div>
</div>
