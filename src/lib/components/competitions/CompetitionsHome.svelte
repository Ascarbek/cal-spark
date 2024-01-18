<script lang="ts">
  import CompetitionItemBanner from '$components/competitions/CompetitionItemBanner.svelte';
  import CompetitionItemSmall from '$components/competitions/CompetitionItemSmall.svelte';
  import CategoryButton from '$components/competitions/CategoryButton.svelte';
  import CompetitionItem from '$components/competitions/CompetitionItem.svelte';

  let items: ICompetition[] = [
    {
      name: 'DeCal: Micromouse Intro',
      description: 'Lorem Ipsum',
      cover: '/upload/Dece.png',
      picture: '/upload/DefiLand.png',
      category: 'hackaton',
      tags: ['sponsored', 'python'],
      incentive: '$ 10 000',
    },
    {
      name: 'DeCal: Micromouse Intro',
      description: 'Lorem Ipsum',
      cover: '/upload/Dece.png',
      picture: '/upload/DefiLand.png',
      category: 'hackaton',
      tags: ['sponsored', 'python'],
      incentive: '$ 10 000',
    },
    {
      name: 'DeCal: Micromouse Intro',
      description: 'Lorem Ipsum',
      cover: '/upload/Dece.png',
      picture: '/upload/DefiLand.png',
      category: 'hackaton',
      tags: ['sponsored', 'python'],
      incentive: '$ 10 000',
    },
  ];

  let categories: string[] = ['All Categories', 'Hackaton', 'Research'];
  let currentCategory: string = categories[0];
</script>

<div class="border-b border-t border-neutral-500 bg-neutral-200 py-8">
  <div class="container mx-auto">
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        {#each items as item, index}
          <CompetitionItemSmall data="{item}"></CompetitionItemSmall>
        {/each}
      </div>
      <CompetitionItemBanner data="{items[0]}"></CompetitionItemBanner>
    </div>
  </div>
</div>

<div class="container mx-auto">
  <div class="py-4">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        {#each categories as item, index}
          <CategoryButton
            data="{item}"
            on:click="{() => (currentCategory = item)}"
            active="{currentCategory === item}"
          />
        {/each}
      </div>
      <div class="flex items-center gap-4">
        {#each items as item, index}
          <CompetitionItem data="{item}" />
        {/each}
      </div>
    </div>
  </div>
</div>
