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
        <DataTable v-model:filters="filters" :value="createdEvents" paginator :rows="10" filterDisplay="row" tableStyle="min-width: 20rem">
            <Column field="title" sortable header="Event Title">
                <template #body="{ data }">
                    {{ data.title }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by title" />
                </template>
            </Column>
            <Column field="location" sortable header="Location">
                <template #body="{ data }">
                    {{ data.location }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by location" />
                </template>
            </Column>
            <Column field="date" sortable header="Date">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.date) }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by date" />
                </template>
            </Column>
            <Column header="More Info">
                <template #body="slotProps">
                    <router-link :to="`/community-events/${slotProps.data.id}`" active-class="active" aria-current="page">
                        <button type="button" class="responsive-button action-btn btn btn-secondary me-2">More Info</button>
                    </router-link>
                </template>
            </Column>
            <Column field="status" sortable header="Status">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getStatus(data.status)" />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One"  :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getStatus(slotProps.option)" />
                        </template>
                    </Select>
                </template></Column>
        </DataTable>
    </div>
  </template>
  
<script setup>
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import InputText from 'primevue/inputtext';
    import Tag from 'primevue/tag';
    import Select from 'primevue/select';
    import { FilterMatchMode } from '@primevue/core/api';
    import createdEvents from '../assets/json/events.json';
    import { useStore } from 'vuex'
    import { ref } from 'vue';

    const store = useStore()

    const statuses = ref(['Attending', 'Not Attending'])
    createdEvents.forEach(element => {
        if (store.getters.userIsAttending(element)){
            element.status = 'Attending'
        }else {
            element.status = 'Not Attending'
        }
    });

    const filters = ref({
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        location: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value:null, matchMode: FilterMatchMode.CONTAINS },
        status:{ value:null, matchMode: FilterMatchMode.EQUALS} 
    })

    function formatDate(date) {
      return new Date(date).toLocaleDateString(); // Customize the date format as needed
    }

    function getStatus(status) {
        console.log(status)
        switch(status) {
            case "Attending":
                return 'success';
            case "Not Attending":
                return 'danger'
        }
    }
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
  padding: 0.25rem 0.75rem; 
}

@media (max-width: 767px) {
  .responsive-button {
    font-size: 80px;
    padding: 0.5rem 1rem;
  }
}
</style>