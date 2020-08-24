<head>
    <link rel="icon" type="image/png" href="favicon_devnews.png">
</head>
<style>
    h1, figure, p {
        text-align: center;
        margin: 0 auto;
    }

    h1 {
        font-size: 2.8em;
        text-transform: uppercase;
        font-weight: 700;
        margin: 0 0 0.5em 0;
    }

    figure {
        margin: 0 0 1em 0;
    }

    img {
        width: 100%;
        max-width: 400px;
        margin: 0 0 1em 0;
    }

    p {
        margin: 1em auto;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }

    .content {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        border-bottom-right-radius: 3px;
    }
</style>

<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch('http://localhost:4000/providers/devNews');
    const devNews = await res.json();
    return {devNews};
  }
</script>

<script>
  import Grid from 'svelte-grid';
  import gridHelp from 'svelte-grid/build/helper/index'
  import {randomHexColorCode, hexToRgb} from '../components/ColorUtils.svelte'
  import map from "lodash.map";

  export let devNews;
  let items = [];

  function generateLayout(col) {
    return map(devNews, function (e, i) {
      const y = Math.ceil(Math.random() * 4) + 1;
      let randomHexColor = randomHexColorCode();
      let randomRGBColor = hexToRgb(randomHexColor);

      return {
        ...gridHelp.item({
          x: (i * 2) % col,
          y: Math.floor(i / 6) * y,
          w: 6,
          h: 1,
          id: `${e.posted}: ${e.title}\n${e.url}`
        }),
        ...{
          data: randomHexColor,
          gradient: `background-image: linear-gradient(to bottom right, rgba(${randomRGBColor.r},${randomRGBColor.g}, ${randomRGBColor.b}, 0), rgba(255,255,255,0.5));`
        },
      };
    });
  }

  const cols = 12;
  items = generateLayout(cols);
  items = gridHelp.resizeItems(items, cols);
  let breakpoints = [
    [1000, 10],
    [700, 5],
    [500, 3],
    [400, 1],
  ];
  console.log(items);
</script>


<svelte:head>
    <title>News (source: hackernews)</title>
</svelte:head>

<p>news (source: hackernews)</p>

<Grid bind:items={items} useTransform {breakpoints} gap={10} {cols} rowHeight={100} let:item>
    <div class="content"
         style="background: {item.static ? '#ccccee' : item.data}; {item.gradient}">{item.id}</div>
</Grid>
