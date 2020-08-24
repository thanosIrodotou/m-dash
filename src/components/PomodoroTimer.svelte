<head>
    <link rel="icon" type="image/png" href="favicon_pulls.png">
</head>

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

    button.paused:not(:disabled):hover {
        background-color: var(--accent-blue-light);
        border-color: var(--accent-blue-light);
    }


    button:disabled {
        opacity: 0.5;
    }

    button:focus,
    button:not(:disabled):hover {
        background-color: var(--base-light);
    }

    button:not(:disabled):active {
        background-color: var(--base-dark);
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

    time {
        font-size: 3em;
        font-weight: 300;
    }

    section {
        text-align: center;
    }
</style>
<script>
  import {onMount} from 'svelte';
  import {Howl} from 'howler';
  import {count} from "../store";

  const minutesToSeconds = (minutes) => minutes * 60;
  const secondsToMinutes = (seconds) => Math.floor(seconds / 60);
  const padWithZeroes = (number) => number.toString().padStart(2, '0');
  const State = {paused: 'paused', idle: 'idle', inProgress: 'in progress', resting: 'resting'};

  const POMODORO_S = minutesToSeconds(25);
  const LONG_BREAK_S = minutesToSeconds(20);
  const SHORT_BREAK_S = minutesToSeconds(5);

  const workDoneSound = new Howl({
    src: ['alarm-clock.wav'],
    sprite: {
      start: [0, 4000]
    }
  });

  const restDoneSound = new Howl({
    src: ['mtg-alert.mp3'],
    sprite: {
      start: [0, 4000]
    }
  });

  let currentState = State.idle;
  let pomodoroTime = POMODORO_S;
  let restTime = SHORT_BREAK_S;
  let completedPomodoros = 0;
  let interval;

  function formatTime(timeInSeconds) {
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  }

  function startPomodoro() {
    currentState = State.inProgress;
    interval = setInterval(() => {
      if (pomodoroTime === 0) {
        completePomodoro();
      }
      pomodoroTime -= 1;
    }, 1000);
  }

  function completePomodoro() {
    workDoneSound.play('start');
    clearInterval(interval);
    completedPomodoros++;
    if (completedPomodoros === 4) {
      rest(LONG_BREAK_S);
      completedPomodoros = 0;
    } else {
      rest(SHORT_BREAK_S);
    }
  }

  function rest(time) {
    currentState = State.resting;
    pomodoroTime = time;
    interval = setInterval(() => {
      if (pomodoroTime === 0) {
        idle();
        restDoneSound.play('start');
      }
      pomodoroTime -= 1;
    }, 1000);
  }

  function pausePomodoro() {
    pause();
    count.set(pomodoroTime);
    count.useLocalStorage();
  }

  function cancelPomodoro() {
    // TODO: Add some logic to prompt the user to write down
    // the cause of the interruption.
    idle();
  }

  function idle() {
    currentState = State.idle;
    clearInterval(interval);
    pomodoroTime = POMODORO_S;
  }

  function pause() {
    currentState = State.paused;
    clearInterval(interval)
  }

  onMount(() => {
    count.useLocalStorage();
    if (count) {
      pomodoroTime = $count;
    }
  });

</script>

<svelte:window on:beforeunload={count.set(pomodoroTime || 1500)}/>
<section>
    <time>
        {formatTime(pomodoroTime)} - break {formatTime(restTime)} - cycle {completedPomodoros}
        <button class="primary" on:click={startPomodoro}
                disabled={currentState !== State.idle && currentState !== State.paused}>
            start
        </button>
        <button on:click={cancelPomodoro}
                disabled={currentState !== State.inProgress && currentState !== State.paused}>cancel
        </button>
        <button class="paused" on:click={pausePomodoro}
                disabled={currentState !== State.inProgress}>pause
        </button>
    </time>
</section>
