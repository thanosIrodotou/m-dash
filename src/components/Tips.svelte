<script>
  export let message;
</script>
<style>
    h2 {
        font-size: 1rem;
        text-align: center;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .shortcut {
        color: var(--accent-light);
        display: inline-block;
        font-weight: normal;
        padding-right: 12px;
        width: 55px;
        font-size: 0.9em;
        line-height: 17px;
    }

    .description {
        font-weight: normal;
        color: var(--black);
        font-size: 0.9em;
        line-height: 17px;
    }

    .header {
        color: var(--black);
    }

</style>
<ul>
    <li>
        <span class="header">{message.message}</span>
    </li>
    <hr/>
    <li>
        <span class="shortcut">?</span>
        <span class="description">keyboard shortcuts</span>
    </li>
    <li>
        <span class="shortcut">spacebar</span>
        <span class="description">start/pause pomodoro timer</span>
    </li>
    <hr/>
    <li>
        <h2 style="text-align: left; color: var(--black)">Tips</h2>
    </li>
    <li>
        * <span class="description">Drag and drop tasks to reorder your tasks list.</span>
    </li>
    <li>
        * <span class="description">Prefix your tasks with (TAG_NAME) to get auto-color tagging.</span>
    </li>
</ul>
