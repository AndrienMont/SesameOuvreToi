<script lang="ts">
	import AddUser from "../components/AddUser.svelte";
	import TabUser from "../components/TabUser.svelte";
    import Header from "../components/header.svelte";
    import { onMount } from 'svelte';

    let users: any[] = [];
    async function getAllUsers() {
        const response = await fetch("./api/user")
            .then((res) => res.json())
            .then((data) => {
                users = data;
                console.log(users);
            });
    }
    onMount(() => {
        getAllUsers();
    });
    function removeUser(event: any){
        users = users.filter((user) => user.name !== event.detail.name);
    }

    function disableUser(event: any){
        location.reload();
    }

    function enableUser(event: any){
        location.reload();
    }

</script>
<Header />


<h2>Gestion des utilisateurs</h2>

<table>
    <tr>
        <th>Id</th>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Role</th>
        <th>Statut badge</th>
        <th>Actions</th>
    </tr>
    {#each users as user}
        <TabUser {user} on:delete={removeUser} on:disable={disableUser} on:enable={enableUser}/>
    {/each}
    <AddUser />
</table>