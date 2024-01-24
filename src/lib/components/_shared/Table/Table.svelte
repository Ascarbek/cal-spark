<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { TTableRows } from '$components/_shared/Table/Table';

  const dispatch = createEventDispatcher();

  export let rows: any[] = [];
  export let columns: any[] = [];
</script>

<table>
  <thead>
    <tr>
      {#each columns as col, index}
        <th>
          {col.name}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each rows as row, rowIndex}
      <tr>
        {#each columns as col, colIndex}
          <td>
            {row[col.id]}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
