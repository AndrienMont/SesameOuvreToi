<script lang="ts">
    import Header from "../header.svelte";

    function addBuildings() {
        event.preventDefault();
        const name = document.querySelector('#name')?.value;
        console.log(name);

        fetch('/api/buildings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name" : name, })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
</script>

<Header />

<h2>Add Buildings</h2>

<form method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <button type="submit" on:click={addBuildings}>Ajouter un utilisateur</button>
</form>

