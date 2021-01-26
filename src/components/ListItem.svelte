<style>
    .description {
        min-width: 400px;
    }
    
    .input {
        -webkit-appearance: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        appearance: none;
        width: 90%;
        height: 56px;
        font-family: inherit;
        font-size: 0.5em;
        font-weight: inherit;
        padding: 0.3em;
        border: 0;
        border-radius: 5px;
        vertical-align: middle;
    }

     :global(body.darkmode--activated) input:not(:focus) {
        background-color: var(--dark-mode);
        color: white !important;
    }
    
     :global(body.darkmode--activated) input:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white !important;
    }
    
     :global(body.darkmode--activated) input:focus {
        background: rgba(255, 255, 255, 0.3);
        outline: none;
        box-shadow: inset 0 -2px 0 var(--accent-dark);
        color: white !important;
    }
    
    span {
        background-color: #ddd;
        color: var(--accent-dark);
        border-radius: 4px;
        padding: 0 .5em;
        font-size: .5em;
        vertical-align: middle;
        opacity: 0.7;
    }
    
    .removeTask {
        display: none;
    }
    
    section:hover .removeTask {
        display: initial;
    }
    
    section:hover .index {
        display: none;
    }
    
    .removeTask {
        cursor: pointer;
    }
    
    section:hover:not(.removeTask) {
        color: var(--accent-dark);
        box-shadow: 0px 1px 0px var(--accent-dark), 0px -1px 0px var(--accent-dark);
        text-shadow: 0 0 10px var(--accent-dark);
        border-left: 1px dashed;
        border-right: 1px dashed;
        border-radius: 10px;
    }

</style>
<script>
    import {
        createEventDispatcher
    } from 'svelte';
    import {
        storedTasks
    } from "../store";

    const dispatch = createEventDispatcher();

    function removeTask(item) {
        dispatch('removeTask', {
            'task': item
        });
    }

    function saveTask(item) {
        dispatch('saveTask', {
            'task': item
        });
    }

    function checkExists(description) {
        storedTasks.useLocalStorage('ListItem');
        return $storedTasks.some(item => {
            return item.description === description
        })
    }

    export let item;
    export let index;
</script>

<section>
    <div>
        <span class="index">{index + 1}</span>
        <span class="removeTask" on:click={()=> removeTask(item)}>X</span>
        <input class="description input" type="text" bind:value={item.description} on:focusout={()=> saveTask(item)}>
    </div>
</section>