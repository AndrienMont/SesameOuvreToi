<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    
    export let user = {
        identifiant : String,
        name : String,
        surname : String,
        role : String
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
</script>

<tr>
    <td>{user.identifiant}</td>
    <td id="surname">{user.surname}</td>
    <td id="name">{user.name}</td>
    <td>{user.role}</td>
    <td>
        <button on:click={deleteUser}>Supprimer</button>
    </td>
</tr>