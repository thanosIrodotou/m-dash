<script>
  import {getContext} from 'svelte';
  import {fly} from 'svelte/transition';
  import Tips from './Tips.svelte';
  import Dialog from './Dialog.svelte';

  const {open} = getContext('simple-modal');

  export let message;
  export let type;

  let name;
  let status = 0;

  const onCancel = (text) => {
    name = '';
    status = -1;
  }

  const onOkay = (text) => {
    name = text;
    status = 1;
  }

  const showDialog = () => {
    open(
      Dialog,
      {
        message: {message},
        onCancel,
        onOkay
      },
      {
        closeButton: false,
        closeOnEsc: false,
        closeOnOuterClick: false,
      }
    );
  };

  const showTip = () => {
    open(Tips,
      {message: {message}},
      {
        styleBg: {
          background: 'transparent',
          top: 0,
          left: 0
        },
        styleWindow: {
          background: 'var(--base-dark)'
        },
        styleContent: {
          color: '#999999',
        },
        transitionWindow: fly,
        transitionWindowProps: {
          y: 100,
          duration: 250
        }
      }
    );
  };

</script>

{#if type === 'dialog'}
    {showDialog()}
{/if}
<svelte:window on:beforeunload={showTip()}/>
<!--{#if type === 'tips'}-->
<!--    {showTip()}-->
<!--{/if}-->
