<script>
	import Darkmode from 'darkmode-js';

	const options = {
		bottom: '64px', // default: '32px'
		right: 'unset', // default: '32px'
		left: '32px', // default: 'unset'
		time: '0s', // default: '0.3s'
		mixColor: '#dddddd', // default: '#fff'
		backgroundColor: '#ffffff',  // default: '#fff'
		buttonColorDark: 'var(--dark-mode)',  // default: '#100f2c'
		buttonColorLight: '#fff', // default: '#fff'
		saveInCookies: true, // default: true,
		label: '🌓', // default: ''
		autoMatchOsTheme: true // default: true
	}


	let darkmode = new Darkmode(options);
	darkmode.showWidget();

	export let segment;
</script>

<style>
	:global(body.darkmode--activated) {
		color: #fff;
	}

	nav {
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	:global(body.darkmode--activated) nav {
		border-bottom: 1px solid rgba(0,0,0,0.5);
	}

	ul {
		margin: 0;
		padding: 0;
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
    }

</style>

<svelte:head>
	{#if darkmode.isActivated()}
		<div id="wcb" class="carbonbadge wcb-d"></div>
	{:else}
		<div id="wcb" class="carbonbadge"></div>
	{/if}
	<script src="https://unpkg.com/website-carbon-badges@1.1.1/b.min.js" defer></script>
</svelte:head>
<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">pomodoro</a></li>
		<!-- <li><a aria-current="{segment === 'crypto' ? 'page' : undefined}" href="crypto">crypto</a></li>
		<li><a aria-current="{segment === 'pulls' ? 'page' : undefined}" href="pulls">pulls</a></li>
		<li><a aria-current="{segment === 'devNews' ? 'page' : undefined}" href="devNews">devNews</a></li>
		<li><a aria-current="{segment === 'misc' ? 'page' : undefined}" href="misc">misc</a></li>

		 for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen
		<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li>-->
	</ul>
</nav>
