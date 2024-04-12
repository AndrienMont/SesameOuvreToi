<script lang="ts">

    async function addBuilding() {
        const name = document.getElementById('name')?.value;
        const response = await fetch('./api/buildings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name" : name, "newUsers" : []})
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

<style>
    
/* Input field */
input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* Button */
button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>