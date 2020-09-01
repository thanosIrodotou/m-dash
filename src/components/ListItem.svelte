<style>
    button {
        background-color: var(--base);
        border-color: var(--black);
        color: var(--black);
        font-size: 1.5em;
        font-weight: inherit;
        outline: none;
        text-transform: uppercase;
        transition: background-color .2s, color .2s, border-color .2s, opacity .2s;
    }

    button:focus,
    button:not(:disabled):hover {
        background-color: var(--base-light);
    }

    button.removeTask:not(:disabled):hover {
        background-color: var(--accent);
        border-color: var(--accent-dark);
    }

    button.submitTask:not(:disabled):hover {
        background-color: var(--accent-green-light);
        border-color: var(--accent-green-light);
    }

    button:disabled {
        opacity: 0.1;
    }

    input, button, select, textarea {
        font-family: inherit;
        font-size: 0.5em;
        font-weight: inherit;
        padding: 0.3em;
        margin: 0 auto;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 2px;
        vertical-align: middle;
    }

    .description {
        min-width: 400px;
    }

    .pomodoros {
        max-width: 100px;
        vertical-align: middle;
    }

    .input {
        -webkit-appearance: none;
        appearance: none;
        width: 65%;
        border: 0;
        font-family: inherit;
        padding: 16px 12px 0 12px;
        height: 56px;
        background: rgba(0, 0, 0, .2);
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .3);
        color: #000;
        transition: all .15s ease;
        font-size: .5em;
        font-weight: inherit;
    }

    .input:not(:focus) {
        background-color: var(--base);
        box-shadow: inset 0 -2px 0 var(--accent-blue-light)
    }

    .input:hover {
        background: rgba(0, 0, 0, .04);
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .5);
    }

    .input:not(:placeholder-shown) + label {
        color: rgba(0, 0, 0, .5);
        transform: translate3d(0, -12px, 0) scale(.75);
    }

    .input:focus {
        background: rgba(0, 0, 0, .3);
        outline: none;
        box-shadow: inset 0 -2px 0 var(--accent-dark)
    }

    span {
        background-color: #ddd;
        margin: .5em;
        border-radius: 4px;
        padding: 0 .5em;
        font-size: .5em;
        vertical-align: middle;
        opacity: 0.7;
    }
</style>
<script>
  import {createEventDispatcher} from 'svelte';
  import {storedTasks} from "../store";

  const dispatch = createEventDispatcher();

  function removeTask(item) {
    dispatch('removeTask', {'task': item});
  }

  function saveTask(item) {
    dispatch('saveTask', {'task': item});
  }

  function checkExists(description) {
    storedTasks.useLocalStorage();
    return $storedTasks.some(item => {
      return item.description === description
    })
  }


  export let item;
  export let index;
</script>


<span>{index + 1}</span>
<input class="description input" type="text" bind:value={item.description}>
<input class="pomodoros input" type="number" bind:value={item.expectedPomodoros}>
<button class="removeTask" on:click={() => removeTask(item)}>X</button>
<button id="saveTask" class="submitTask" on:click={() => saveTask(item)}
        onchange="checkExists(item)" disabled="{checkExists(item.description)}">
    ✔︎
</button>
<!--<span>{index + 1}</span> {item.description}-->

