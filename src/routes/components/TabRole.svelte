<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let role = {
        role : String,
        buildings : Array
    }

    async function deleteRole() {
        const response = await fetch('./api/role', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"role" : role.role})
        });
        if(response.ok){
            dispatch('delete', role);
        }
    }
</script>

<tr>
    <td>{role.role}</td>
    <td>{role.buildings}</td>
    <td>
        <button on:click={deleteRole}>Supprimer</button>
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