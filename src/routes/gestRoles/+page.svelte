<script lang="ts">
    import Header from "../components/header.svelte";
    import AddRole from "../components/AddRole.svelte";
    import TabRole from "../components/TabRole.svelte";
    import { onMount } from 'svelte';

    let roles: {
        role : String;
        buildings : Array<String>
    }[]=[];
    async function getAllRoles() {
        const response = await fetch("./api/role")
            .then((res) => res.json())
            .then((data) => {
                roles = data
            });
    }

    function removeRole(event: any){
        roles = roles.filter((role) => role.role !== event.detail.role);
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


<style>

    /* Table */
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    
    table th {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    
    table th {
        background-color: #f2f2f2;
    }
    
    </style>