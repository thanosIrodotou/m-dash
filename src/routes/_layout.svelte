<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<style>
    main {
        position: relative;
        max-width: 96em;
        background-color: white;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }

    :global(*) {
        user-select: none;
    }

    :global(body) {
        overflow: scroll;
        margin: 0;
    }

    :global(.svlt-grid-resizer::after) {
        border-color: black !important;
    }

    :global(.svlt-grid-transition > .svlt-grid-item) {
        transition: transform 0.5s;
    }

    :global(.svlt-grid-item) {
        display: inline;
        padding: 0.2em 0.5em;
        margin: 0 0.2em 0.2em 0;
        width: 60em;
        text-align: center;
        border-radius: 0.2em;
        color: white;
    }

    :global(.svlt-grid-shadow) {
        background: pink;
        border-radius: 6px;
        border-bottom-right-radius: 3px;
        /*transition: top 0.2s, left 0.2s;*/
        transition: transform 0.2s;
    }
</style>

<Nav {segment}/>

<main>
    <slot></slot>
</main>
