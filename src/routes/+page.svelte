<script lang="ts">
	import { onMount } from "svelte";
    import Header from "./components/header.svelte";
    import { flip } from "svelte/animate";
    import ferme from "../assets/interrupteur-ferme.png";
    import ouvert from "../assets/interrupteur-ouvert.png";

    async function fetchUser(){
        var users = await fetch('./api/user')
        .then(response => response.json())
            .then(data => {
                data.forEach(user =>{
                    const option = document.createElement('option');
                    option.value = JSON.stringify(user);
                    option.text = user.surname + ' ' + user.name;
                    document.querySelector('#users')?.appendChild(option);
                })
            });
    }

    async function fetchBuildings(){
        var buildings = await fetch('./api/buildings')
        .then(response => response.json())
            .then(data => {
                data.forEach(building =>{
                    const option = document.createElement('option');
                    option.value = building;
                    option.text = building.name;
                    document.querySelector('#buildings')?.appendChild(option);
                })
            });
    }

    async function listUsersBuildings(){
        
    }

    async function fetchUserBuildings(){
        
    }

    let users: { name: string, value: string }[] = [];
    let users2: { name: string, value: string }[] = [];
    let users3: { name: string, value: string }[] = [];
    let isDoorOpen = false;

function handleDragStart(event, user, sourceList) {
    event.dataTransfer.setData('text/plain', JSON.stringify(user));
    event.dataTransfer.setData('sourceList', sourceList);
}

function allowDrop(event) {
    event.preventDefault();
}

function handleDrop(event, targetList) {
    event.preventDefault();
    const userData = JSON.parse(event.dataTransfer.getData('text/plain'));
    const sourceList = event.dataTransfer.getData('sourceList');

    // Remove user from the source list
    if (sourceList === 'users') {
        users = users.filter(u => u.name !== userData.name);
    } else if (sourceList === 'users2') {
        users2 = users2.filter(u => u.name !== userData.name);
    } else if (sourceList === 'users3') {
        users3 = users3.filter(u => u.name !== userData.name);
    }

    // Add user to the target list
    if (targetList === 'users') {
        users = [...users, userData];
    } else if (targetList === 'users2') {
        users2 = [...users2, userData];
    } else if (targetList === 'users3') {
        users3 = [...users3, userData];
    }

    scanBadge(userData);
}


    function addUsers(){
        const select = document.querySelector('#users') as HTMLSelectElement;
        const user = select.options[select.selectedIndex].value;
        const userText = select.options[select.selectedIndex].text;
        console.log(userText);
        console.log(user);
        users.push({
            name: userText,
            value : user,
        });
        users = [...users];
        console.log(users);
    }

    onMount(() => {
        fetchUser();
        fetchBuildings();
    });

    function scanBadge(data: any){
        console.log(JSON.parse(data.value).role);
        
    }

    function openDoor(){
        isDoorOpen = !isDoorOpen;
    }

    function alertTest(){
        alert('Nuke incoming !');
    }


</script>

    
<Header />

<h2>Liste des utilisateurs</h2>
<select id="users">
    <option value="0">Choisir un utilisateur</option>
</select>
<button on:click={addUsers}>Ajouter</button>
<button on:click={openDoor}>Ouvrir/fermer la porte</button>

<h2>Liste des batiments</h2>
<select id="buildings"></select>

<h2>Zone de passage</h2>


<div class="container">
    <ul class="list" on:drop={(e) => handleDrop(e, 'users')} on:dragover={allowDrop}>
        <h2>Entrée du bâtiment</h2>
        {#each users as user}
            <li draggable="true" on:dragstart={(e) => handleDragStart(e, user, 'users')}>
                {user.name}
            </li>
        {/each}
    </ul>

    <ul class="list" on:drop={(e) => handleDrop(e, 'users2')} on:dragover={allowDrop}>
        <h2>Scanner de badge</h2>
        {#each users2 as user}
            <li draggable="true" on:dragstart={(e) => handleDragStart(e, user, 'users2')}>
                {user.name}
            </li>
        {/each}
    </ul>

    <div class="porte">
        {#if isDoorOpen}
            <img src={ouvert} alt="Porte ouverte" style="width:300px;height:167px;"/>
        {/if}
        {#if !isDoorOpen}
            <img src={ferme} alt="Porte fermée" />
        {/if}
    </div>
        

    <ul class="list" on:drop={(e) => handleDrop(e, 'users3')} on:dragover={allowDrop}>
        <h2>Intérieur du bâtiment</h2>
        {#each users3 as user}
            <li draggable="true" on:dragstart={(e) => handleDragStart(e, user, 'users3')}>
                {user.name}
            </li>
        {/each}
    </ul>
</div>


<p>Liste des trucs à mettre sur la page d'accueil</p>
<ul>
    <li>Porte</li>
    <li>Lasers</li>
    <li>Voyants</li>
    <li>Alarme</li>
    <li>Lecteur de badge</li>
    <li>Gestion des badges</li>
    <li>Liste des users dans bat</li>
    <li>Foutre le feu</li>
</ul>

<!-- 
Drag and drop pour le passage de porte
possibilité d'ajouter des users à un groupe (visuel et fonctionnel)
drag le groupe pour passage de porte
quand le groupe arrive dans zone de drop, count du nombre de personnes dans le groupe
si count > 1, alerte
si count = 1, vérification personne entrée même que badge

-->

<style>
.list {
    list-style-type: none;
    padding: 10px;
    margin: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    min-height: 50px;
}

.list li {
    padding: 5px;
    margin: 5px;
    background-color: #f0f0f0;
    cursor: pointer;
}

</style>