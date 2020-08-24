<script>
    // `current` is updated whenever the prop value changes...
    export let current;

    // ...but `initial` is fixed upon initialisation
    const initial = current;
</script>

<p>
    <span style="background-color: #0d0887">{current.name}</span>
    <span style="background-color: #6a00a8">holding: {current.holdings}</span>
    <span style="background-color: #b12a90">price: {current.price}</span>
    <span style="background-color: #e16462">total: {current.total}</span>
</p>

<style>
    span {
        display: inline;
        padding: 0.2em 0.5em;
        margin: 0 0.2em 0.2em 0;
        width: 60em;
        text-align: center;
        border-radius: 0.2em;
        color: white;
    }
</style>
