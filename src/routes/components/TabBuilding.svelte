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
    background-color: #dc3545; /* Red color for delete button */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #bb2d3b; /* Darker red on hover */
}

</style>