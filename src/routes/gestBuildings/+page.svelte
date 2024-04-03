<script lang="ts">
    import Header from "../components/header.svelte";
    import TabBuilding from "../components/TabBuilding.svelte";
    import AddBuilding from "../components/AddBuilding.svelte";
    import { onMount } from 'svelte';

    let buildings : any[] = [];

    async function getAllBuildings() {
        const res = await fetch('./api/buildings')
            .then((res) => res.json())
            .then((data) => {
                buildings = data;
            });
    }

    onMount(() => {
        getAllBuildings();
    });

    function removeBuilding(event: any){
        // buildings = getAllBuildings();
        buildings = buildings.filter((building) => building.name !== event.detail.name);
    }

</script>

<Header />

<h2>Batiments</h2>

<table>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Usagers</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each buildings as building}
            <TabBuilding {building} on:delete={removeBuilding}/>
        {/each}
        <AddBuilding />
    </tbody>
</table>