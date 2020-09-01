<style>
    tasksection {
        font-size: 3em;
        font-weight: 300;
    }

    /*  ul.timeline li {
          position: relative;
          height: 3em;
          color: #888;
      }

      ul.timeline li:before {
          content: "";
          display: inline-block;
          height: 3em;
          width: 1px;
          background: #aaaa;
          margin: 0;
          padding: 0;
          position: absolute;
          left: -11px;
          top: -0.4em;
          z-index: -1;
      }

      ul.timeline:before {
          content: "●";
          display: inline-block;
          margin: 0;
          padding: 0;
          position: relative;
          left: -1em;
          top: 0.1em;
          color: #aaa;
      }

      ul.timeline:after {
          content: "●";
          display: inline-block;
          margin: 0;
          padding: 0;
          position: relative;
          left: -1em;
          top: -1em;
          color: #aaa;
      }
  */

    section {
        text-align: center;
    }
</style>

<script>
  import {afterUpdate, createEventDispatcher, onMount} from 'svelte';
  import {Task} from '../Task.js';
  import {storedTasks} from '../store';
  import DragDropList from './DragDropList.svelte';
  import '../ArrayExtensions.js';
  import ListItem from "./ListItem.svelte";

  const dispatch = createEventDispatcher();

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
        <button class="primary" on:click={addTask}>Add</button>
        {#if tasks.length !== 0}
            <p>Today you'll complete {allExpectedPomodoros} pomodoros.</p>
        {/if}
    </tasksection>
</section>


