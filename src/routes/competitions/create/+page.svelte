<script lang="ts">
	let name = '';
	let desc = '';
</script>

<div class="flex flex-col gap-4">
	<input class="border"  bind:value={name}>

	<textarea  class="border" bind:value={desc}></textarea>
</div>