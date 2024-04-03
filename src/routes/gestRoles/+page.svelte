<script lang="ts">
    import Header from "../components/header.svelte";
    import AddRole from "../components/AddRole.svelte";
    import TabRole from "../components/TabRole.svelte";
    import { onMount } from 'svelte';

    let roles: any[] = [];
    async function getAllRoles() {
        const response = await fetch("./api/role")
            .then((res) => res.json())
            .then((data) => {
                roles = data;
                console.log(roles);
            });
    }

    function removeRole(event: any){
        roles = roles.filter((role) => role.name !== event.detail.name);
    }

    onMount(() => {
        getAllRoles();
    });
</script>

<Header />

<h2>Roles</h2>

<table>
    <thead>
        <tr>
            <th>Role</th>
            <th>Accès</th>
            <th>Actions</th>
        </tr>
    </thead>
    {#each roles as role}
        <TabRole {role} on:delete={removeRole}/>
    {/each}
</table>

<AddRole />