<template>
    <div class="row align-items-center mt-3" >
        <h1 class="text-center col-6 offset-3">Community Events</h1>
        <div v-if="store.state.isAdmin" class="col-3">
            <router-link to="/add-event" active-class="active" aria-current="page">
                <button type="button" class="action-btn btn btn-secondary me-2">Add Event</button>
            </router-link>
        </div>
    </div>
    <div class="row mt-5">
        <DataTable :value="createdEvents" tableStyle="min-width: 50rem">
            <Column field="title" header="Title"></Column>
            <Column field="location" header="Location"></Column>
            <Column field="date" header="Date"></Column>
            <Column header="More Info">
                <template #body="slotProps">
                    <router-link :to="`/community-events/${slotProps.data.id}`" active-class="active" aria-current="page">
                        <button type="button" class="action-btn btn btn-secondary me-2">More Info</button>
                    </router-link>
                </template>
            </Column>
            <Column field="status" header="Status"></Column>
        </DataTable>
    </div>
  </template>
  
<script setup>
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import createdEvents from '../assets/json/events.json';
    import store from '../store/store';
</script>

<style>
</style>