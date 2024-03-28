<script>
    import Header from "../header.svelte";

    function addRole() {
        event.preventDefault();
        const role = document.querySelector('#role')?.value;
        const batiment = document.querySelector('#batiment')?.value;
        console.log(role);
        

        fetch('/api/role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "role" : role, "buildings": [batiment]})
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

<form on:submit={addRole}>
    <label for="role">Role</label>
    <input type="text" id="role" name="role" required>
    <label for="batiment">Batiment</label>
    <input type="text" id="batiment" name="batiment" required>
    <button type="submit">Add Role</button>
</form>