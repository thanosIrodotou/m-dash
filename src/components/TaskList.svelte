<style>
    tasksection {
        font-size: 3em;
        font-weight: 300;
    }

    section {
        text-align: center;
    }

    button {
        font-family: inherit;
        font-size: 0.5em;
        font-weight: inherit;
        padding: 0.3em;
        margin: 0 auto;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 2px;
        vertical-align: middle;
        cursor: pointer;
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
</style>

<script>
  import {afterUpdate, onMount} from 'svelte';
  import {Task} from '../Task.js';
  import {storedTasks} from '../store';
  import DragDropList from './DragDropList.svelte';
  import '../utils.js';
  import ListItem from "./ListItem.svelte";

  let taskAddedPendingFocus = false;
  let lastInput;
  let tasks = [];
  $: allExpectedPomodoros = tasks.reduce((acc, t) => acc + t.expectedPomodoros, 0);

  function addTask() {
    tasks = tasks.concat(tasks.length === 0 ? new Task(1) : new Task(tasks.length + 1));
    taskAddedPendingFocus = true;
  }

  function saveTask(event) {
    let task = event.detail.task;
    if (!task.description) {
      alert('Please describe your task')
    } else {
      storedTasks.set(tasks);
    }
  }

  function removeTask(event) {
    tasks = tasks.remove(event.detail.task);
    storedTasks.set(tasks);
  }

  function focusNewTask() {
    if (taskAddedPendingFocus && lastInput) {
      lastInput.focus();
      taskAddedPendingFocus = false;
    }
  }

  afterUpdate(focusNewTask);

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
            <DragDropList
                    list={tasks}
                    key={item => item.id}
                    let:item
                    let:index
            >
                <ListItem on:removeTask={removeTask} on:saveTask={saveTask} {index} {item}/>
            </DragDropList>
        {/if}
        <button class="primary" on:click={addTask}>Add task</button>
    </tasksection>
</section>


