<head>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
</head>
<style>
	:global(body.darkmode--activated) {
		color: #fff;
	}

	nav {
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		background-color: white;
	}

	.sticky {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;
	}

	:global(body.darkmode--activated) nav {
		background-color: var(--dark-mode);
		border-bottom: 1px solid rgba(0,0,0,0.5);
	}

	ul {
		margin: 0;
		padding: 0.3em;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	.carbonbadge {
		position: fixed;
		right: 0;
		z-index: 2;
    }

    .dmToggle {
        position: fixed;
        left: 50%;
	}
	
	.shortcuts {
		position: fixed;
		left: calc(100% - 300px);
	}
    
    @media (max-width: 768px) {

		.carbonbadge {
			display: none;
		}

		.shortcuts {
			left: calc(100% - 50px);
		}

		ul {
			padding: 0;
		}
    }
</style>
<script>
    import Darkmode from 'darkmode-js';
	import Modal from 'svelte-simple-modal';
	import Content from '../components/Content.svelte';
	import {
        onMount
    } from 'svelte';

	const options = {
		time: '0s', // default: '0.3s'
		mixColor: '#dddddd', // default: '#fff'
		saveInCookies: true, // default: true,
		autoMatchOsTheme: true // default: true
	}

	let darkmode = new Darkmode(options);
	let showModal = false;
    
    function toggleDarkMode() {
        if (darkmode.isActivated()) {
            document.getElementById('darkModeIcon').classList.add('fa-moon');
            document.getElementById('darkModeIcon').classList.remove('fa-sun');
        } else {
            document.getElementById('darkModeIcon').classList.remove('fa-moon');
            document.getElementById('darkModeIcon').classList.add('fa-sun');
        }
        console.log('mode', darkmode.isActivated(), 'toggling');
        darkmode.toggle();
    }
	
	function toggleModal() {
		showModal = true;
	}

    onMount(() => {
        if (darkmode.isActivated()) {
            document.getElementById('darkModeIcon').classList.add('fa-sun');
            document.getElementById('darkModeIcon').classList.remove('fa-moon');
        } else {
            document.getElementById('darkModeIcon').classList.remove('fa-sun');
            document.getElementById('darkModeIcon').classList.add('fa-moon');
        }
    });

    export let segment;
</script>

<svelte:head>
	{#if darkmode.isActivated()}
		<div id="wcb" class="carbonbadge wcb-d"></div>
	{:else}
		<div id="wcb" class="carbonbadge"></div>
	{/if}
	<script src="https://unpkg.com/website-carbon-badges@1.1.1/b.min.js" defer></script>
</svelte:head>

{#if showModal}
<Modal closeOnEsc="true" onClose={showModal=false}>
    <Content type="tips" message="Keyboard Shortcuts" />
</Modal>
{/if}
<nav class="sticky">
	<ul>
        <li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">pomodoro</a></li>
		<!-- <li><a aria-current="{segment === 'crypto' ? 'page' : undefined}" href="crypto">crypto</a></li>
		<li><a aria-current="{segment === 'pulls' ? 'page' : undefined}" href="pulls">pulls</a></li>
		<li><a aria-current="{segment === 'devNews' ? 'page' : undefined}" href="devNews">devNews</a></li>
		<li><a aria-current="{segment === 'misc' ? 'page' : undefined}" href="misc">misc</a></li>

		 for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen
		<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li>-->
		<li>
			<a id="darkModeToggle" class="dmToggle" href="#" on:click={toggleDarkMode}>
				<i id="darkModeIcon" class="fas fa-moon"></i>
			</a>
		</li>
		<li>
			<a class="shortcuts" href="#" on:click={toggleModal}>
				<i class="fas fa-info-circle"></i>
			</a>
		</li>
    </ul>
    
</nav>
