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
  import {randomHexColorCode} from "./ColorUtils.svelte";

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

    // re-set ids after a task is removed
    tasks.forEach((task, accum) => {
      task.id = accum
    })
    storedTasks.set(tasks);
  }

  function focusNewTask() {
    if (taskAddedPendingFocus && lastInput) {
      lastInput.focus();
      taskAddedPendingFocus = false;
    }
  }

  function onReordered(ev) {
    tasks = ev.detail;
    storedTasks.set(tasks);
  }

  afterUpdate(focusNewTask);

  function extractColorGroups(tasks) {
    const tagToColor = [];

    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      let extractedTag = task.description.match(/(\(\w+\))/gm);
      if (extractedTag && extractedTag.constructor === Array && extractedTag.length === 1) {
        let tag = extractedTag[0];
        let find = tagToColor.find(v => {
          return v.tag === tag;
        });
        if (!find) {
          tagToColor.push({tag: tag, color: randomHexColorCode()})
        }
      } else {
        let find = tagToColor.find(v => {
          return v.tag === 'no_tag';
        });
        if (!find) {
          tagToColor.push({tag: 'no_tag', color: randomHexColorCode()})
        }
      }
    }
    return tagToColor;
  }

  function checkIfTagHasChanged(task, tagToColor) {
    let extractedTag = task.description.match(/^\([A-Z0-9]+\)/gm);
    if (extractedTag && extractedTag.constructor === Array && extractedTag.length === 1) {
      let tag = extractedTag[0]
      if (tag !== task.tag) {
        task.tag = tag;
        let taskFind = tasks.find(v => {
          return v.tag === tag;
        });
        if (taskFind) {
          task['color'] = taskFind.color;
        } else {
          task['color'] = randomHexColorCode();
        }
      }
    } else {
      tagAsNoTag(task, tagToColor);
    }
  }

  function tagAsNoTag(task, tagToColor) {
    // Find a task tagged as no_tag
    // If found set the new no tag task to the same color and tag it as no_tag
    let noTagTask = tasks.find(t => t.tag === 'no_tag');
    if (noTagTask) {
      task['color'] = noTagTask.color;
    } else {
      // Else pick a random color from the colorGroup for no_tag
      task['color'] = tagToColor.find(v => v.tag === 'no_tag').color;
    }
    task['tag'] = 'no_tag';
  }

  function colourGroupTasks(tasks) {
    const tagToColor = extractColorGroups(tasks);

    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task.color && task.tag) {
        checkIfTagHasChanged(task, tagToColor);
        continue;
      }
      let extractedTag = task.description.match(/^\([A-Z0-9]+\)/gm);
      if (extractedTag && extractedTag.constructor === Array && extractedTag.length === 1) {
        let tag = extractedTag[0];
        task['tag'] = tag;
        let taskFind = tasks.find(t => {
          return t.tag === tag ? t.color : undefined;
        })

        if (taskFind) {
          task['color'] = taskFind.color;
          continue;
        }

        let colorFind = tagToColor.find(v => {
          return v.tag === tag;
        });
        if (colorFind) {
          task['color'] = colorFind.color;
        } else {
          task['color'] = randomHexColorCode();
        }
      } else {
        tagAsNoTag(task, tagToColor);
      }
    }
    storedTasks.set(tasks);
  }

  onMount(() => {
    storedTasks.useLocalStorage('TaskList');
    tasks = $storedTasks;
    colourGroupTasks(tasks);
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
                    on:reordered={onReordered}>
                <ListItem on:removeTask={removeTask} on:saveTask={saveTask} {index} {item}/>
            </DragDropList>
        {/if}
        <button class="primary" on:click={addTask}>Add task</button>
    </tasksection>
</section>