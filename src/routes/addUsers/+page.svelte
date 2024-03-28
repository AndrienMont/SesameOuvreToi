<script lang="ts">
    import Header from "../header.svelte";

    function addUser() {
        event.preventDefault();
        const name = document.querySelector('#name')?.value;
        console.log(name);
        const role = document.querySelector('#role')?.value;

        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name" : name, 
                                    "uid" : uid,
                                    "role" : role})
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

<h2>Add Users</h2>

<form method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <lbel for="role">Role:</lbel>
    <select id="role" name="role">
        
    </select>
    <script>
        const roles = fetch('/api/role')
            .then(response => response.json())
            .then(data => {
                data.forEach(role => {
                    const option = document.createElement('option');
                    option.value = role.id;
                    option.text = role.name;
                    document.querySelector('#role').appendChild(option);
                });
            });
    </script>

    <button type="submit" on:click={addUser}>Ajouter un utilisateur</button>
</form>

