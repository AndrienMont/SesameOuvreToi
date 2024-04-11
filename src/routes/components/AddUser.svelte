<script lang="ts">
    import { onMount } from 'svelte';

    function addUser() {
        //event.preventDefault();
        const surname = document.querySelector("input[name=nom]") as HTMLInputElement;
        const name = document.querySelector("input[name=prenom]") as HTMLInputElement;
        const role = document.querySelector("select") as HTMLSelectElement;
        const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name" : name.value,
                                    "surname" : surname.value,
                                    "uid" : uid,
                                    "role" : role.value})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            location.reload();
    }

    function displayRoles(){
        const rolesUsers = fetch('/api/role')
            .then(response => response.json())
            .then(data => {
                data.forEach(role =>{
                    const option = document.createElement('option');
                    option.value = role.role;
                    option.text = role.role;
                    document.querySelector('#role')?.appendChild(option);
                })
            });
    }

    onMount(() => {
        displayRoles();
    });
    
</script>

<tr>
    <td> </td>
    <td><input type="text" placeholder="Nom" name="nom" id="surname"></td>
    <td><input type="text" placeholder="Prénom" name="prenom" id="name"></td>
    <td><select  id="role">
    </select></td>
    <td>
        <button on:click={addUser}>Ajouter</button>
    </td>
</tr>