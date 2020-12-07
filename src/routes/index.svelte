<style>
    h1, figure, p {
        text-align: center;
        margin: 0 auto;
    }

    h1 {
        font-size: 2.8em;
        text-transform: uppercase;
        font-weight: 700;
        margin: 0 0 0.5em 0;
    }

    figure {
        margin: 0 0 1em 0;
    }

    img {
        width: 100%;
        max-width: 400px;
        margin: 0 0 1em 0;
    }

    p {
        margin: 1em auto;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }

    section {
        box-sizing: border-box;
        display: grid;
        grid: auto-flow dense 100px / 1fr 6fr 1fr;
    }
</style>

<script>
  import PomodoroTimer from '../components/PomodoroTimer.svelte'
  import TaskList from '../components/TaskList.svelte';
  import Modal from 'svelte-simple-modal';
  import Content from '../components/Content.svelte';

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
    {#if key}
    {/if}
</div>
{#if showModal}
    <Modal closeOnEsc="true" onClose={showModal = false}>
        <Content type="tips" message="Keyboard Shortcuts" />
    </Modal>
{/if}

<section>
    <PomodoroTimer/>
    <TaskList/>
</section>
