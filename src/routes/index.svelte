<style>
    
    section {
        display: flex;
        flex-direction: column;
        flex: 1;
        box-sizing: border-box;
        position: relative;
        max-width: 70%;
        margin: 2% auto;
    }
    
    @media (max-width: 768px) {
        section {
            max-width: 100%;
        }

        .hd {
            display: none;
        }
    }

    @media (max-width: 736px) {
        section {
            position: fixed;
        }
    }
</style>

<script>
    import PomodoroTimer from '../components/PomodoroTimer.svelte'
    import TaskList from '../components/TaskList.svelte';
    import Modal from 'svelte-simple-modal';
    import Content from '../components/Content.svelte';
    import Cards from '../components/Cards.svelte';

    let key;
    let keyCode;
    let showModal = false;

    function handleKeyPress(event) {
        let keyIsQuestionMark = event.keyCode === 191;
        if ((event.shiftKey && keyIsQuestionMark)) {
            showModal = true
        }
        key = event.key;
        keyCode = event.keyCode;
    }
</script>

<svelte:window on:keydown={handleKeyPress}/>

<div style="text-align: center">
    {#if key} {/if}
</div>
{#if showModal}
<Modal closeOnEsc="true" onClose={showModal=false}>
    <Content type="tips" message="Keyboard Shortcuts" />
</Modal>
{/if}

<section>
    <div class="hd">
        <Cards/>
    </div>
    <div class="fd">
        <PomodoroTimer/>
        <TaskList/>
    </div>
</section>