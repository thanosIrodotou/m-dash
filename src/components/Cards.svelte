<head>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
</head>
<style>
    .wrapper {
        height: 10px;
        padding: 0;
    }
    
    .wrapper.headline>* {
        margin: 5px auto;
        font-weight: 300;
    }
    
    .wrapper.bottom>* {
        margin: 5px;
        width: 100%;
        font-weight: 300;
    }

    .card-wrapper {
        margin: 15px 5px;
    }
    
    .card {
        display: block;
        padding: 5px 15px 25px;
        background: #fff;
        border-radius: 4px;
        -webkit-box-shadow: 0px 3px 25px -5px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0px 3px 25px -5px rgba(0, 0, 0, 0.5);
        box-shadow: 0px 3px 25px -5px rgba(0, 0, 0, 0.5);
        transition: box-shadow 0.2s;
    }
    
    .card .header {
        position: relative;
    }
    
    .card .header .fa,
    .card .header .card-title {
        display: inline-block;
    }
    
    .card .header .control {
        color: #fff;
        text-decoration: none;
        position: absolute;
        right: -5px;
        opacity: 0;
        transition: top 0.2s, opacity 0.2s;
    }

    .card .card-title {
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
    
    .card .body>* {
        margin: 0;
        text-align: right;
    }
    
    .card:hover {
        -webkit-box-shadow: 0px 2px 10px -4px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0px 2px 10px -4px rgba(0, 0, 0, 0.5);
        box-shadow: 0px 2px 10px -4px rgba(0, 0, 0, 0.5);
        transition: box-shadow 0.5s;
    }
    
    .card:hover .header .control {
        top: 0px;
        opacity: 1;
    }
    
    .card:active,
    .card:focus {
        -webkit-box-shadow: 0px 0px 10px -8px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0px 0px 10px -8px rgba(0, 0, 0, 0.5);
        box-shadow: 0px 0px 10px -8px rgba(0, 0, 0, 0.5);
        transition: box-shadow 1s;
    }
    
    .dropdown {
        position: relative;
        z-index: 1000;
    }
    
    .dropdown .dropdown-toggle {
        text-decoration: none;
        color: #fff;
    }
    
    .dropdown .dropdown-toggle i {
        transform: rotate(0deg);
        transition: transform 0.4s;
    }
    
    .dropdown ul {
        display: none;
        background: #fff;
        position: absolute;
        width: 150px;
        padding: 0;
        top: 5px;
        right: 0;
        border-radius: 4px;
        -webkit-box-shadow: 0px 3px 25px -5px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0px 3px 25px -5px rgba(0, 0, 0, 0.5);
        box-shadow: 0px 3px 25px -5px rgba(0, 0, 0, 0.5);
    }
    
    .dropdown ul li {
        list-style-type: none;
    }
    
    .dropdown ul li a {
        display: block;
        text-decoration: none;
        padding: 10px 15px;
        background: #fff;
        color: #424242;
        /* transition: background 0.5s, color 0.5s; */
    }
    
    .dropdown ul li a:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    
    .dropdown ul li a:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    
    .dropdown ul li a:hover {
        background: #eee;
        color: #0396ff;
        /* transition: background 0.6s, color 0.6s; */
    }
    
    .dropdown ul li a:hover:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    
    .dropdown ul li a:hover:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    
    .dropdown.open .dropdown-toggle i {
        transform: rotate(145deg);
        transition: transform 0.4s;
    }
    
    .dropdown.open ul {
        display: block;
    }
    
    @media (max-width: 768px) {
        .wrapper {
            display: inline-block;
        }

        .card-wrapper {
            margin: 15px 1%;
            display: inline-block;
            width: 47%;
        }
    }
    
    @media (max-width: 520px) {
        .card-wrapper {
            margin: 2px 1.5%;
            display: inline-block;
            width: 97%;
        }
    }
    
    .g-salmon {
        color: #fff;
        background-image: linear-gradient(135deg, #3c6aff -20%, #ea5455 120%);
    }
    
    @keyframes animateBg {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 100% 900%;
        }
    }
</style>

<script>
    import {
        onMount
    } from 'svelte';
    import {
        storedTasks
    } from '../store';

    function onDropdownClick(event) {
        event.preventDefault();
        event.currentTarget.parentElement.classList.toggle('open')
    }

    function onDropdownDownloadClick(event) {
        event.preventDefault();
        event.currentTarget.closest('.dropdown').classList.remove('open');

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($storedTasks));
        const dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute('href', dataStr);
        dlAnchorElem.setAttribute('download', 'tasks.json');
        dlAnchorElem.click();
    }

    function onDropdownImportClick(event) {
        event.preventDefault();
        event.currentTarget.closest('.dropdown').classList.remove('open');

        const inputElement = document.createElement('INPUT');
        inputElement.setAttribute('id', 'inputFile');
        console.log(inputElement.id);
        inputElement.setAttribute('type', 'file');

        inputElement.addEventListener('change', handleFile, false);

        function handleFile() {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                $storedTasks = JSON.parse(event.target.result);
            }
            reader.readAsText(file)
        }

        inputElement.click();
    }

    function onDropdownRemoveClick(event) {
        event.preventDefault();
        event.currentTarget.closest('.dropdown').classList.remove('open');

        if (window.confirm('Are you sure?\nThis will remove all your tasks, it can not be undone.\n' +
                'Please export your tasks before removing!')) {
            storedTasks.set([]);
        }
    }

    function onCardMouseLeave(event) {
        event.preventDefault();
        document.getElementById('dropdown').classList.remove('open');
    }

    onMount(() => {
        document.getElementById('dropdown').classList.remove('open');
        storedTasks.useLocalStorage('TaskList');
    });
</script>

<!-- https://codepen.io/mstrlaw/pen/YQBvdE -->
<div class="wrapper">
    <div class="card-wrapper">
        <div class="card g-salmon" on:mouseleave={onCardMouseLeave}>
            <div class="header">
                <div id="dropdown" class="dropdown control open">
                    <a href="#" class="dropdown-toggle" on:click={onDropdownClick}>
                        <i class="fa fa-cog"></i></a>
                    <ul class="menu">
                        <li><a class="dropdown-link" on:click={onDropdownDownloadClick} href="#"><i
                                class="fa fa-download"></i> Export All</a></li>
                        <li><a class="dropdown-link" on:click={onDropdownImportClick} href="#"><i
                                class="fa fa-upload"></i> Import All</a></li>
                        <li><a class="dropdown-link" on:click={onDropdownRemoveClick} href="#"><i
                                class="fa fa-trash"></i> Remove All</a></li>
                    </ul>
                </div>
                <i class="fa fa fa-star"></i>
                <h3 class="card-title">Tasks</h3>
            </div>
            <div class="body">
                <h2 id="taskCompleteCounter">{$storedTasks.length}</h2>
            </div>
        </div>
    </div>
</div>
<a id="downloadAnchorElem" style="display:none"></a>