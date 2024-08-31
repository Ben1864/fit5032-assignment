<template>
    <div class="row align-items-center mt-3" >
        <h1 class="text-center col-6 offset-3">Community Events</h1>
        <div class="col-3">
            <router-link to="/add-event" active-class="active" aria-current="page">
                <button type="button" class="action-btn btn btn-secondary me-2">Add Event</button>
            </router-link>
        </div>
        
    </div>
    <div class="row mt-5">
        <DataTable :value="createdEvents" tableStyle="min-width: 50rem">
            <Column field="username" header="Username"></Column>
            <Column field="password" header="Password"></Column>
            <Column field="isAustralian" header="Australian Resident?"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="reason" header="Reason"></Column>
        </DataTable>
    </div>
  </template>
  
<script setup>
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
</script>

<style>
</style>