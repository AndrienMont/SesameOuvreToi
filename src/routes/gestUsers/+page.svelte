<script lang="ts">
    import Header from "../header.svelte";
    function goToAddUsers() {
        window.location.href = "/addUsers";
    }

</script>
<Header />


<h2>Gestion des utilisateurs</h2>

<button on:click={goToAddUsers}>Ajouter un utilisateur</button>
<table>
    <tr>
        <th>Id</th>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
    </tr>
    <tr>
        <td>1</td>
        <td>John</td>
        <td>Doe</td>
        <td>john.doe@univ-smb.fr</td>
        <td>Admin</td>
        <td>
            <button>Modifier</button>
            <button>Supprimer</button>
        </td>
    </tr>
</table>