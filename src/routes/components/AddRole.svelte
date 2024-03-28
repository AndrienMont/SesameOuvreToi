<script lang="ts">
    import { onMount } from 'svelte';

    let batimentDispo:any[]=[];
    let selectedBuildings:string[]=[];


    function addRole() {
        event.preventDefault();
        const role = document.querySelector('#role')?.value;
        console.log(role,selectedBuildings);
        

        fetch('/api/role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "role" : role, "buildings": selectedBuildings})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function displayBuildings(){
        const builds = fetch('/api/buildings')
            .then(response => response.json())
            .then(data => {
                batimentDispo = data.map((batiment:any) => {
                    return batiment.name;
                });
                console.log(batimentDispo);
            });
    }

    function updateSelectedBuildingDis(event: any){
        const target = event.target;
        const value = target.value;

        if (target.checked && !selectedBuildings.includes(value)) {
            selectedBuildings.push(value); // Add to selectedBuildings if checked
        } else if (!target.checked && selectedBuildings.includes(value)) {
            selectedBuildings = selectedBuildings.filter(building => building !== value); // Remove from selectedBuildings if unchecked
        }
    }

    onMount(() => {
        displayBuildings();
    });

</script>

<tr>
    <td><input type="text" placeholder="Role" name="role" id="role"></td>
    <td>
        {#each batimentDispo as building, index}
            <label>
                <input type="checkbox" value={building} on:change={updateSelectedBuildingDis}>
                {building}
            </label>
        {/each}
    </td>
    <td>
        <button on:click={addRole}>Ajouter</button>
    </td>
</tr>