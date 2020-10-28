import {writable} from 'svelte/store';

const createWritableStore = (key, startValue) => {
  const {subscribe, set} = writable(startValue);

  return {
    subscribe,
    set,
    useLocalStorage: (caller) => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

export const count = createWritableStore('count', {timer: 1500, rest: 300});
export const sounds = createWritableStore('sounds', true);
export const storedTasks = createWritableStore('tasks', []);
