<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    
    export let user = {
        identifiant : String,
        name : String,
        surname : String,
        role : String,
        enabled : Boolean
    }

    async function deleteUser(){

        const response = await fetch('./api/user', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name" : user.name, "surname" : user.surname})
        });
        if(response.ok){
            dispatch('delete', user);
        }

    }

    async function disableBadge(){
        const response = await fetch('./api/user/disableBadge', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name" : user.name, "surname" : user.surname, "enabled" : !user.enabled})
        });
        if(response.ok){
            dispatch('disable', user);
        }
    }

    // async function enableBadge(){
    //     const response = await fetch('./api/user/enableBadge', {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({"name" : user.name, "surname" : user.surname})
    //     });
    //     if(response.ok){
    //         dispatch('enable', user);
    //     }
    
    // }

</script>

<tr>
    <td>{user.identifiant}</td>
    <td id="surname">{user.surname}</td>
    <td id="name">{user.name}</td>
    <td>{user.role}</td>
    <td class:disabled={!user.enabled}>
        {#if user.enabled}
            Activé
        {:else}
            Désactivé
        {/if}
    </td>
    <td>
        <button on:click={deleteUser}>Supprimer</button>
        <button on:click={disableBadge}>
            {#if user.enabled}
                Désactiver
            {:else}
                Activer
            {/if} 
            le badge
        </button>
        <!-- <button on:click={enableBadge}>Activer le badge</button> -->
    </td>
</tr>

<style>
    /* Table row */
tr {
    border-bottom: 1px solid #ccc; /* Add a border between rows */
}

/* Table data */
td {
    padding: 8px; /* Add padding to the table data */
}

/* Button */
button {
    padding: 8px 16px;
    background-color: #007bff; /* Blue color for buttons */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 5px; /* Add a small margin between buttons */
}

button:hover {
    background-color: #0056b3; /* Darker blue on hover */
}

/* Disabled state text */
.disabled {
    color: #999; /* Light gray color for disabled state */
}

</style>