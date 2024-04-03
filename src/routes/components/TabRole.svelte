<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let role = {
        name : String,
        buildings : Array
    }

    async function deleteRole() {
        const response = await fetch('./api/role', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name" : role.name})
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