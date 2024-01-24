<script lang="ts">
  import Table from '$components/_shared/Table/Table.svelte';
  import { onMount } from 'svelte';
  import type { IUser } from '$components/_shared/Types';
  import { getCall } from '$api/BackendCalls';

  export let rows: IUser[] = [];
  export let columns: { id: string; name: string }[] = [
    { id: 'email', name: 'Email' },
    { id: 'bio', name: 'Bio' },
    { id: 'displayName', name: 'Display Name' },
    { id: 'cover', name: 'Cover Picture URL' },
    { id: 'picture', name: 'Profile Picture URL' },
  ];

  onMount(async () => {
    const resp = await getCall<{}, { rows: IUser[] }>(`/api/user`, {});
    rows = resp.rows;
  });
</script>

<div>
  <Table {rows} {columns}></Table>
</div>
