<script lang="ts">
  import { goto } from '$app/navigation';
  import type { ChangeEventHandler } from 'svelte/elements';
  import { postCall, uploadCall } from '$api/BackendCalls';
  import CompetitionsHome from '$components/competitions/CompetitionsHome.svelte';

  const onFileSelect: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const formData = new FormData();
    formData.append('attached_file', file);
    formData.append('name', file.name);

    const resp = await uploadCall(`/api/upload`, formData);
    const id = resp.id;
    await postCall(`/api/upload/process`, { file_id: id });
    await goto('/report');
  };
</script>

<CompetitionsHome></CompetitionsHome>
