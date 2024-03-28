<script lang="ts">

    async function addBuilding() {
        const name = document.getElementById('name')?.value;
        const response = await fetch('./api/buildings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        });
        if (response.ok) {
            window.location.reload();
        }
    }
</script>

<tr>
    <td><input type="text" placeholder="Nom Bâtiment" name="nom" id="name"></td>
    <td>
        <button on:click={addBuilding}>Ajouter</button>
    </td>
</tr>