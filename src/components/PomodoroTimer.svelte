<head>
    <link rel="icon" type="image/png" href="favicon_pulls.png">
</head>

<style>
    button {
        background-color: var(--base);
        border: none;
        font-size: 1.5em;
        font-weight: inherit;
        outline: none;
        text-transform: uppercase;
        transition: background-color .2s, color .2s, opacity .2s;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.3;
        cursor: default;
    }

    button.primary:disabled {
        opacity: 1;
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

    button:not(.reset):focus,
    button:not(.reset):not(:disabled):hover {
        border: dashed 1px;
    }

    button:not(.reset):not(:disabled):active {
        background-color: var(--base-dark);
    }

    button.reset {
        background: url('reset-clock.svg') no-repeat transparent;
        width: 1.8em;
        height: 1.8em;
        border: none;
    }

    button.paused:focus {
        border: dashed 1px;
        border-color: var(--accent-blue-light);
    }

    .slide:not(:disabled):hover, .slide:not(:disabled):focus {
        transform: scale(1.1);
        cursor: pointer
    }

    .slide:not(:disabled):active {
        -moz-transform: scale(1.1) rotate(-45deg);
        -o-transform: scale(1.1) rotate(-45deg);
        -ms-transform: scale(1.1) rotate(-45deg);
        -webkit-transform: scale(1.1) rotate(-45deg);
        transform: scale(1.1) rotate(-45deg);
    }

    input, button, select, textarea {
        font-family: inherit;
        font-size: 0.5em;
        font-weight: inherit;
        padding: 0.3em;
        margin: 0 auto;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        vertical-align: middle;
    }

    time {
        font-size: 3em;
        font-weight: 300;
    }

    section {
        text-align: center;
    }

    .shortcuts {
        position: fixed;
        bottom: 0;
        left: 1%;
    }

    /* Progress Bars */
    .inProgress progress[value]::-webkit-progress-bar {
        background-image: -webkit-linear-gradient(
                180deg,
                transparent 100%,
                rgba(0, 0, 0, 0) 33%,
                rgba(0, 0, 0, 0) 66%,
                transparent 66%
        ),
        -webkit-linear-gradient(
                top,
                rgba(255, 255, 255, 0),
                rgba(0, 0, 0, 0)
        ),
        -webkit-linear-gradient(
                left,
                #09c,
                #f44
        );

        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0);
        background-size: 35px 20px, 100% 100%, 100% 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-border-radius: 15px;
    }

    .inProgress progress[value]::-moz-progress-bar {
        background-image: -moz-linear-gradient(
                180deg,
                transparent 100%,
                rgba(0, 0, 0, 0) 33%,
                rgba(0, 0, 0, 0) 66%,
                transparent 66%
        ),
        -moz-linear-gradient(
                top,
                rgba(255, 255, 255, 0),
                rgba(0, 0, 0, 0)
        ),
        -moz-linear-gradient(
                left,
                #09c,
                #f44
        );

        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0);
        background-size: 35px 20px, 100% 100%, 100% 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-border-radius: 15px;
        -moz-border-radius: 15px;
    }

    .inRest progress[value]::-webkit-progress-bar {
        background-image: -webkit-linear-gradient(
                180deg,
                transparent 100%,
                rgba(0, 0, 0, 0) 33%,
                rgba(0, 0, 0, 0) 66%,
                transparent 66%
        ),
        -webkit-linear-gradient(
                top,
                rgba(255, 255, 255, 0),
                rgba(0, 0, 0, 0)
        ),
        -webkit-linear-gradient(
                left,
                #09c,
                #44ff9e
        );

        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0);
        background-size: 35px 20px, 100% 100%, 100% 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-border-radius: 15px;
        -moz-border-radius: 15px;
    }

    .inRest progress[value]::-moz-progress-bar {
        background-image: -moz-linear-gradient(
                180deg,
                transparent 100%,
                rgba(0, 0, 0, 0) 33%,
                rgba(0, 0, 0, 0) 66%,
                transparent 66%
        ),
        -moz-linear-gradient(
                top,
                rgba(255, 255, 255, 0),
                rgba(0, 0, 0, 0)
        ),
        -moz-linear-gradient(
                left,
                #09c,
                #44ff9e
        );

        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0);
        background-size: 35px 20px, 100% 100%, 100% 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-border-radius: 15px;
        -moz-border-radius: 15px;
    }

    .fade-in {
        width: 100%;
        animation: fadeIn ease 1s;
        -webkit-animation: fadeIn ease 1s;
        -moz-animation: fadeIn ease 1s;
        -o-animation: fadeIn ease 1s;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @-moz-keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
<script>
  import {onMount} from 'svelte';
  import {Howl} from 'howler';
  import {count} from '../store';

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
  let progress = 1500;

  function formatTime(timeInSeconds) {
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  }

  function startPomodoro() {
    document.getElementById('timerButton').classList.add('primary');
    currentState = State.inProgress;
    interval = setInterval(() => {
      progress = 100 - (pomodoroTime / 1500) * 100;
      document.getElementById('pomodoroProgress').value = progress;
      if (pomodoroTime === 0) {
        completePomodoro();
      }
      progress -= 1;
      pomodoroTime -= 1;
    }, 1000);
  }

  function rest(time) {
    document.getElementById('restButton').classList.add('primary');
    document.getElementById('timerButton').classList.remove('primary');
    currentState = State.resting;
    restTime = time;
    interval = setInterval(() => {
      progress = (restTime / 300) * 100;
      document.getElementById('restProgress').value = progress;
      if (pomodoroTime === 0) {
        idle();
        restDoneSound.play('start');
      }
      restTime -= 1;
    }, 1000);
  }

  function pausePomodoro() {
    document.getElementById('timerButton').classList.remove('primary');
    document.getElementById('restButton').classList.remove('primary');
    pause();
    count.set({timer: pomodoroTime, rest: restTime});
    count.useLocalStorage();
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

  function cancelPomodoro() {
    idle();
  }

  function idle() {
    currentState = State.idle;
    clearInterval(interval);
    pomodoroTime = POMODORO_S;
    restTime = SHORT_BREAK_S;
  }

  function pause() {
    currentState = State.paused;
    clearInterval(interval)
  }

  function handleKeyPress(event) {
    let keyIsSpace = event.keyCode === 32;
    if (keyIsSpace && (currentState === State.inProgress)) {
      pausePomodoro();
    } else if (keyIsSpace && (currentState === State.paused || currentState === State.idle)) {
      startPomodoro();
    }
  }

  onMount(() => {
    count.useLocalStorage();
    if (count) {
      pomodoroTime = $count.timer;
      restTime = $count.rest;
    }
  });
</script>

<svelte:window on:beforeunload={count.set({timer: pomodoroTime || 1500, rest: restTime || 300})}
               on:keydown={handleKeyPress}/>

<section>
    <time>
        <button class="reset slide" on:click={cancelPomodoro}
                disabled={(currentState === State.inProgress && currentState === State.resting) && currentState !== State.paused}>
        </button>
        <button id="timerButton" class="primary timer" on:click={startPomodoro}
                disabled={currentState === State.inProgress || currentState === State.resting}>
            {formatTime(pomodoroTime)}
        </button>
        -
        <button id="restButton" class="rest" on:click={rest(restTime)}
                disabled="{currentState === State.resting || currentState === State.inProgress}">
            {formatTime(restTime)}
        </button>
        <button class="paused" on:click={pausePomodoro}
                disabled={(currentState !== State.inProgress && currentState !== State.resting)}>
            pause
        </button>
    </time>
</section>
{#if (pomodoroTime <= 1500 && currentState !== State.resting)}
    <div class="inProgress">
        <progress id="pomodoroProgress" class="fade-in" max="100"
                  value={100 - (pomodoroTime / 1500) * 100}></progress>
    </div>
{/if}
{#if currentState === State.resting}
    <div class="inRest">
        <progress id="restProgress" class="fade-in" max="100"
                  value={(pomodoroTime / 300) * 100}></progress>
    </div>
{/if}
<div class="shortcuts">
    shift+?
</div>
