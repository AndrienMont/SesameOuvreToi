<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let building = {
        name : String,
        users: Array
    }; 

    async function deleteBuilding() {
        const response = await fetch('./api/buildings', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name" : building.name, "newUsers" : building.users})
        });
        if(response.ok){
            dispatch('delete', building);
        }
    }
</script>

<tr>
    <td>{building.name}</td>
    <td>
        {#each building.users as user (user.id)}
            {user.name} <br>
        {/each}
    </td>
    <td>
        <button on:click={deleteBuilding}>Supprimer</button>
    </td>
</tr>