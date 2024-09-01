<template>
    <div class="row align-items-center mt-3">
  <div class="col-12 col-md-6 offset-md-3 text-center order-1 order-md-0">
    <h1>Community Events</h1>
  </div>
  <div v-if="store.state.isAdmin" class="col-12 col-md-3 text-center text-md-end mt-3 mt-md-0 order-2 order-md-1">
    <router-link to="/add-event" active-class="active" aria-current="page">
      <button type="button" class="responsive-button action-btn btn btn-secondary me-2">Add Event</button>
    </router-link>
  </div>
</div>
    <div v-if="!store.state.isAuthenticated" class="container">
        <div class="alert alert-danger mt-5 text-center" role="alert">
            Please login to access community events
        </div>
    </div>
    <div v-else class="row mt-5 medium-text">
        <DataTable :value="createdEvents" tableStyle="min-width: 50rem">
            <Column field="title" header="Event Title"></Column>
            <Column field="location" header="Location"></Column>
            <Column field="date" header="Date"></Column>
            <Column header="More Info">
                <template #body="slotProps">
                    <router-link :to="`/community-events/${slotProps.data.id}`" active-class="active" aria-current="page">
                        <button type="button" class="responsive-button action-btn btn btn-secondary me-2">More Info</button>
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
    import { useStore } from 'vuex'

    const store = useStore()

    createdEvents.forEach(element => {
        if (store.getters.userIsAttending(element)){
            element.status = 'Attending'
        }else {
            element.status = 'Not Attending'
        }
    });

</script>

<style scoped>
.action-btn{
    --bs-btn-bg: #C9A07A;
    --bs-btn-hover-bg: #a5866a;
    border: #000000 solid 1.5px;
}

.medium-text{
    font-size: 20px; 
}

.responsive-button {
  font-size: 1.5rem; /* Default size */
  padding: 0.75rem 1.5rem; 
}

@media (max-width: 767px) {
  .responsive-button {
    font-size: 80px;
    padding: 0.5rem 1rem;
  }
}
</style>