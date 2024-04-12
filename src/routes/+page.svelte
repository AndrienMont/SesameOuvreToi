<script lang="ts">
	import { onMount } from "svelte";
    import Header from "./components/header.svelte";
    import { flip } from "svelte/animate";
    import ferme from "../assets/interrupteur-ferme.png";
    import ouvert from "../assets/interrupteur-ouvert.png";

    let badgeScanner = 0;
    let laz : boolean = false;
    let usersInBuilding : any[] = [];

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
                    option.value = building.name;
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
    let selectedBuilding = '';

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
        scanBadge(userData);
    } else if (targetList === 'users3') {
        users3 = [...users3, userData];
    }
    if(lazer())addListings(userData);
    
}

function handleChangeSelectedBuilding(event){
    selectedBuilding = event.target.value;
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
        const buildingSelect = document.querySelector('#buildings') as HTMLSelectElement;
        buildingSelect.addEventListener('change', handleChangeSelectedBuilding);
    });

    async function scanBadge(data: any){
        /*
        Recupérer le rôle du gars scanné
        Vérifier ses permissions
        Ouvrir la porte + led verte pdt 5 secs + ouverture porte 30 secondes 
        ou 
        déclencer led rouge 10 secs + porte bloquée (alert ?)
        */
        const role = JSON.parse(data.value).role;
        const statusBadge = JSON.parse(data.value).enabled;
        
        var building = selectedBuilding;
        // console.log(building);

        var authorization =  await fetch('./api/role/getone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({role: role})
        })
        .then(response => response.json())
            .then(data => {
                if(data.buildings.includes(building) && statusBadge){
                    ledGreen();
                    isDoorOpen = true;
                    badgeScanner++;
                    closeDoor();
                }else{
                    ledRed();
                    //alert('Accès refusé');
                }
            });
        
    }

    async function closeDoor(){
        await new Promise(r => setTimeout(r, 30000));
        isDoorOpen = false;
    }

    async function ledGreen(){
        const greenLed = document.querySelector('.greenLed') as HTMLElement;
        greenLed.style.opacity = '1';
        await new Promise(r => setTimeout(r, 5000));
        greenLed.style.opacity = '0.25';
    }

    async function ledRed(){
        const redLed = document.querySelector('.redLed') as HTMLElement;
        redLed.style.opacity = '1';
        await new Promise(r => setTimeout(r, 10000));
        redLed.style.opacity = '0.25';
    }

    function openDoor(){
        isDoorOpen = !isDoorOpen;
    }

    function alertTest(){
        alert('Nuke incoming !');
    }

    function lazer(){
        // Alert si plsu de personnes que de scann dans le batiment 
        if(badgeScanner < users3.length){
            alert('Alerte !');
            return false;
        }
        return true;
    }

    async function addListings(user: any){
        console.log("user : ", user);
        const building = selectedBuilding;
        const listing = await fetch('./api/buildings/addUser',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name : building ,user: user})
        } 
        )
        console.log(listing);
    }

    function onFire(){
        isDoorOpen = true;
        const building = selectedBuilding;
        fetch('./api/buildings/fire',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name : building})
        } 
        )
        .then(response => response.json())
            .then(data => {
                usersInBuilding = data[0].users;
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        const evacuation = fetch('./api/buildings/fire?id=' + building,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        } 
        )
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
<select id="buildings">
    <option value="0">Choisir un batiment</option>
</select>
<button id="fireButton" on:click={onFire}>Allumer le feu</button>

<h2> Personnes présentes dans le batiment : </h2>
<ul>
    {#each usersInBuilding as user}
        <li>{user.name}</li>
    {/each}
</ul>



<h2>Zone de passage</h2>

<div class="greenLed">

</div>

<div class="redLed">

</div>



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
        

    {#if isDoorOpen || users3.length > 0}
        <ul class="list" on:drop={(e) => {handleDrop(e, 'users3')}} on:dragover={allowDrop}>
            <h2>Intérieur du bâtiment</h2>
            {#if laz}
                {#each users3 as user}
                    <li draggable="true" on:dragstart={(e) => 
                            handleDragStart(e, user, 'users3')}>
                        {user.name}
                    </li>
                {/each}
            {/if}
        </ul>
    {/if}
</div>


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

.greenLed {
    width: 50px;
    height: 50px;
    background-color: green;
    border-radius: 50%;
    margin: 10px;
    opacity: 0.25;
}

.redLed {
    width: 50px;
    height: 50px;
    background-color: red;
    border-radius: 50%;
    margin: 10px;
    opacity: 0.25;
}
.porte {
    margin: 10px;
}

/* Buttons */
button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

/* Selects */
select {
    padding: 8px;
    border-radius: 5px;
}

/* Fire button */
#fireButton {
    background-color: #dc3545;
}

#fireButton:hover {
    background-color: #bb2d3b;
}


</style>