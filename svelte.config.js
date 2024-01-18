import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: true,
  }),

  kit: {
    adapter: adapter(),
    alias: {
      '$srv/*': 'src/lib/server/*',
      '$components/*': 'src/lib/components/*',
      '$data/*': 'src/lib/data/*',
      '$api/*': 'src/lib/components/_api/*',
    },
  },
};

export default config;
