<script lang="ts">
    import Header from "../header.svelte";
    import AddRole from "../components/AddRole.svelte";

    function gotoAddRole() {
        window.location.href = "/addRoles";
    }
</script>

<Header />

<h2>Roles</h2>

<button on:click={gotoAddRole}>Ajouter un role</button>
<table>
    <thead>
        <tr>
            <th>Role</th>
            <th>Accès</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Admin</td>
            <td>8C </td>
            <td>
                <button>Modifier</button>
                <button>Supprimer</button>
            </td>
        </tr>
    </tbody>
</table>

<AddRole />