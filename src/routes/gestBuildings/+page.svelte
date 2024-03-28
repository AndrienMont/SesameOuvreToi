<script lang="ts">
    import Header from "../header.svelte";

    function gotoAddBuilds() {
        window.location.href = "/addBuilds";
    }
</script>

<Header />

<h2>Batiments</h2>

<button on:click={gotoAddBuilds}>Ajouter un batiment</button>
<table>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>8C </td>
            <td>
                <button>Modifier</button>
                <button>Supprimer</button>
            </td>
        </tr>
    </tbody>
</table>