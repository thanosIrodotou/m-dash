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

    button:not(.reset,.sounds):focus,
    button:not(.reset,.sounds):not(:disabled):hover {
        border: dashed 1px;
    }

    button.reset {
        background: url('reset-clock.svg') no-repeat transparent;
        width: 1.8em;
        height: 1.8em;
        border: none;
    }

    :global(body.darkmode--activated) button.reset {
        filter: invert(100%);
    }

    button.sounds {
        width: 1.8em;
        height: 1.8em;
        border: none;
    }

    button.sounds.mute {
        background: url('bell.svg') no-repeat transparent;
    }

    button.sounds.unmute {
        background: url('mute_bell.svg') no-repeat transparent;
    }

    :global(body.darkmode--activated) button.sounds {
        filter: invert(100%);
    }

    button.paused:focus {
        border: dashed 1px;
        border-color: var(--accent-blue-light);
    }

    .tooltip {
        position: relative;
        display: inline-block;
    }

    .tooltip .tooltiptext {
        font-size: 0.3em;
        visibility: hidden;
        width: 200px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        top: -60%;
        left: 0;
        margin-left: -180%;
    }

    :global(body.darkmode--activated) .tooltip .tooltiptext {
        filter: invert(100%);
    }

    .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
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
        bottom: 24px;
        right: unset;
        left: 32px;
    }

    :global(body.darkmode--activated) .shortcuts {
        color: white !important;
    }

    /* Progress Bars */
  .inProgress progress {
    -webkit-appearance: none;
    appearance: none;
  }

  .inProgress progress::-webkit-progress-bar {
      background-color: rgba(0,0,0,0);
  }

  .inRest progress {
    -webkit-appearance: none;
    appearance: none;
  }

  .inRest progress::-webkit-progress-bar {
      background-color: rgba(0,0,0,0);
  }

  .inProgress progress[value]::-webkit-progress-value {
      background-image:
           -webkit-linear-gradient(
              180deg,
              transparent 100%,
              rgba(0, 0, 0, 0) 33%,
              rgba(0,0, 0, 0) 66%,
              transparent 66%
          ),
           -webkit-linear-gradient(
              top,
              rgba(255, 255, 255, 0),
              rgba(0, 0, 0, 0)
          ),
           -webkit-linear-gradient(left, #09c, #f44);


        background-color: rgba(0, 0, 0, 0);
        background-size: 35px 20px, 100% 100%, 100% 100%;
        box-sizing: border-box;
        border-radius: 15px;
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

        background-color: rgba(0, 0, 0, 0);
        background-size: 35px 20px, 100% 100%, 100% 100%;
        box-sizing: border-box;
        border-radius: 15px;
    }

    .inRest progress[value]::-webkit-progress-value {
      background-image:
           -webkit-linear-gradient(
              180deg,
              transparent 100%,
              rgba(0, 0, 0, 0) 33%,
              rgba(0,0, 0, 0) 66%,
              transparent 66%
          ),
           -webkit-linear-gradient(
              top,
              rgba(255, 255, 255, 0),
              rgba(0, 0, 0, 0)
          ),
           -webkit-linear-gradient(left, #09c, #44ff9e);

        background-color: rgba(0, 0, 0, 0);
        background-size: 35px 20px, 100% 100%, 100% 100%;
        box-sizing: border-box;
        border-radius: 15px;
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

        background-color: rgba(0, 0, 0, 0);
        background-size: 35px 20px, 100% 100%, 100% 100%;
        box-sizing: border-box;
        border-radius: 15px;
    }

    .fade-in {
        width: 100%;
        animation: fadeIn ease 1s;
        -webkit-animation: fadeIn ease 1s;
        -moz-animation: fadeIn ease 1s;
        -o-animation: fadeIn ease 1s;
        border: none;
        background-color: transparent;
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

    @-webkit-keyframes fadeIn {
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
  import {count, sounds} from '../store';

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
  let previousState = currentState;
  let pomodoroTime = POMODORO_S;
  let restTime = SHORT_BREAK_S;
  let completedPomodoros = 0;
  let interval;
  let progress;

  function formatTime(timeInSeconds) {
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  }

  function startPomodoro() {
    document.getElementById('timerButton').classList.add('primary');
    previousState = currentState;
    currentState = State.inProgress;
    interval = setInterval(() => {
      progress = 100 - (pomodoroTime / 1500) * 100;
      document.getElementById('pomodoroProgress').value = progress;
      if (pomodoroTime === 0) {
        completePomodoro();
        if ($sounds === true) {
          // workDoneSound.play('start');
          notifyMe("Work time's up, take a break ☕️");
        }
      } else {
        progress -= 1;
        pomodoroTime -= 1;
      }
    }, 1000);
  }

  function rest(time) {
    document.getElementById('restButton').classList.add('primary');
    document.getElementById('timerButton').classList.remove('primary');
    previousState = currentState;
    currentState = State.resting;
    restTime = time;
    interval = setInterval(() => {
      progress = (restTime / 300) * 100;
      document.getElementById('restProgress').value = progress;
      if (restTime === 0) {
        idle();
        if ($sounds === true) {
          // restDoneSound.play('start');
          notifyMe("Break's up, quick, back to work 💪");
        }
      } else {
        progress -= 1;
        restTime -= 1;
      }
    }, 1000);
  }

  function pausePomodoro() {
    document.getElementById('timerButton').classList.remove('primary');
    document.getElementById('restButton').classList.remove('primary');
    pause();
    count.set({timer: pomodoroTime, rest: restTime});
    count.useLocalStorage('POMO');
  }

  function pause() {
    previousState = currentState;
    currentState = State.paused;
    clearInterval(interval)
  }

  function completePomodoro() {
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
    document.getElementById('timerButton').classList.remove('primary');
    document.getElementById('restButton').classList.remove('primary');
    currentState = State.idle;
    clearInterval(interval);
    pomodoroTime = POMODORO_S;
    restTime = SHORT_BREAK_S;
  }

  function muteSounds() {
    if ($sounds === true) {
      document.getElementById("toggleSounds").classList.remove('mute');
      document.getElementById("toggleSounds").classList.add('unmute');
      sounds.set(false);
    } else {
      document.getElementById("toggleSounds").classList.remove('unmute');
      document.getElementById("toggleSounds").classList.add('mute');
      sounds.set(true);
    }
  }

  function handleKeyPress(event) {
    const activeElementIsInput = document.activeElement.classList.value.includes('description input');
    const activeElementIsAddTask = document.activeElement.classList.value.includes('addtask');
    const shouldNotHanleKeyPress = activeElementIsInput || activeElementIsAddTask;
    const keyIsSpace = event.keyCode === 32;

    if (shouldNotHanleKeyPress) {
      return;
    }
    if (keyIsSpace && (currentState === State.inProgress)) {
      pausePomodoro();
    } else if (keyIsSpace && (currentState === State.paused || currentState === State.idle)) {
      startPomodoro();
    }
  }

  function notifyMe(message) {
    const options = {
      body: message,
      icon: 'favicon_pulls.png',
      silent: true
    }

    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      var notification = new Notification('Pomodoro', options);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          var notification = new Notification('Pomodoro', options);
        }
      });
    }
  }

  onMount(() => {
    sounds.useLocalStorage('pomodoroTimer')
    count.useLocalStorage('pomodoroTimer');
    if (count) {
      pomodoroTime = $count.timer;
      restTime = $count.rest;
    }
    if ($sounds === true) {
      document.getElementById("toggleSounds").classList.remove('unmute');
      document.getElementById("toggleSounds").classList.add('mute');
    } else {
      document.getElementById("toggleSounds").classList.remove('mute');
      document.getElementById("toggleSounds").classList.add('unmute');
    }
  });
</script>

<svelte:window on:beforeunload={count.set({timer: pomodoroTime || 1500, rest: restTime || 300})}
               on:keydown={handleKeyPress}/>

<section>
    <time>
        <div class="tooltip">
            <button class="reset slide" disabled={(currentState === State.inProgress && currentState === State.resting) && currentState !== State.paused}
                    on:click={cancelPomodoro}>
            </button>
            <span class="tooltiptext" style="font-size: 0.3em; top: -30%;">Reset timers</span>
        </div>
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
        <div class="tooltip">
            <button class="sounds mute unmute slide" id="toggleSounds" on:click={muteSounds}></button>
            <span class="tooltiptext" style="top: -30%;">Toggle sounds & notifications</span>
        </div>
    </time>
</section>
{#if (pomodoroTime <= 1500 && currentState !== State.resting) && previousState !== State.resting}
    <div class="inProgress">
        <progress id="pomodoroProgress" class="fade-in" max="100"
                  value={100 - (pomodoroTime / 1500) * 100}></progress>
    </div>
{/if}
{#if currentState === State.resting || previousState === State.resting}
    <div class="inRest">
        <progress id="restProgress" class="fade-in" max="100"
                  value={(restTime / 300) * 100}></progress>
    </div>
{/if}
<div class="shortcuts">
    shift+?
</div>
