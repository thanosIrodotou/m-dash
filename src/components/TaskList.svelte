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

    button.primary {
        background-color: var(--accent);
        border-color: var(--accent);
        color: var(--white);
    }

    button.primary:not(:disabled):hover {
        background-color: var(--accent-light);
        border-color: var(--accent-light);
    }

    button.primary:not(:disabled):active {
        background-color: var(--accent-dark);
        border-color: var(--accent-dark);
    }

    button:focus,
    button:not(:disabled):hover {
        background-color: var(--base-light);
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

    tasksection {
        font-size: 3em;
        font-weight: 300;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .description {
        min-width: 400px;
    }

    .pomodoros {
        max-width: 100px;
    }

    section {
        text-align: center;
    }
</style>

<script>
  import {afterUpdate, onMount} from 'svelte';
  import {Task} from '../Task.js';
  import {storedTasks} from '../store';
  import '../ArrayExtensions.js';

  let taskAddedPendingFocus = false;
  let lastInput;
  let tasks = [];
  $: allExpectedPomodoros = tasks.reduce((acc, t) => acc + t.expectedPomodoros, 0);

  function addTask() {
    tasks = tasks.concat(new Task());
    taskAddedPendingFocus = true;
  }

  function saveTask(task) {
    if (!task.description) {
      alert('Please describe your task')
    } else {
      storedTasks.set(tasks);
    }
  }

  function removeTask(task) {
    tasks = tasks.remove(task);
    storedTasks.set(tasks);
  }

  function focusNewTask() {
    if (taskAddedPendingFocus && lastInput) {
      lastInput.focus();
      taskAddedPendingFocus = false;
    }
  }

  afterUpdate(focusNewTask);

  function checkExists(description) {
    storedTasks.useLocalStorage();
    return $storedTasks.some(item => {
      return item.description === description
    })
  }

  onMount(() => {
    storedTasks.useLocalStorage();
    tasks = $storedTasks;
  });
</script>

<section>
    <tasksection>
        {#if tasks.length === 0}
            You haven't added any tasks yet.
        {:else}
            <ul style="line-height: 2em">
                {#each tasks as task}
                    <li>
                        <input class="description" type="text" bind:value={task.description}
                               bind:this={lastInput}>
                        <input class="pomodoros" type="number" bind:value={task.expectedPomodoros}>
                        <button on:click={() => removeTask(task)}>X</button>
                        <button id="saveTask" class="submitTask" on:click={() => saveTask(task)}
                                onchange="checkExists(task.description)"
                                disabled="{checkExists(task.description)}">
                            ✔︎
                        </button>

                    </li>
                {/each}
            </ul>
        {/if}
        <button class="primary" on:click={addTask}>Add</button>
        {#if tasks.length !== 0}
            <p>Today you'll complete {allExpectedPomodoros} pomodoros.</p>
        {/if}
    </tasksection>
</section>
