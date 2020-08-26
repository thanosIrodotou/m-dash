<script>
  import {getContext} from 'svelte';
  import { fly } from 'svelte/transition';
  import Tips from './Tips.svelte';

  const {open} = getContext('simple-modal');

  const showTip = () => {
    open(Tips,
      {message: 'Keyboard Shortcuts'},
      {
        styleWindow: {
          // border: '2px solid #00beff',
          // boxShadow: 'inset 0 0 0 2px white, 0 0 0 2px white',
          background: 'var(--base-dark)'
        },
        styleContent: {
          color: '#999999',
        },
        // styleCloseButton: {
        //   borderRadius: 0,
        //   boxShadow: '0 0 0 2px white',
        //   background: 'pink'
        // },
        transitionWindow: fly,
        transitionWindowProps: {
          y: 100,
          duration: 250
        }
      }
    );
  };

</script>

<svelte:window on:beforeunload={showTip()}/>
