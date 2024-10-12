<template>
    <div>
      <h2 class="text-center">Events You're Attending</h2>
      <div v-if="!loading && attendingEvents.length != 0" class="text-center medium-text">
        <DataTable v-model:filters="filters" :value="attendingEvents" paginator :rows="10" filterDisplay="row" tableStyle="min-width: 50rem">
          <Column field="title" sortable header="Event Title">
            <template #body="{ data }">
                    {{ data.title }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by title" />
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
          <Column field="location" header="Location">
            <template #body="{ data }">
                    {{ data.location }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by location" />
                </template>
          </Column>
          <Column header="More Info">
            <template #body="{ data }">
              <router-link :to="`/community-events/${data.id}`" active-class="active" aria-current="page">
                <button type="button" class="responsive-button action-btn btn btn-secondary me-2">More Info</button>
              </router-link>
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-if="loading">Loading events...</div>
      <div v-if="!loading && attendingEvents.length === 0" class="text-center">No events found.</div>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase/init';
  import { doc, getDoc } from 'firebase/firestore';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import InputText from 'primevue/inputtext';
  import Tag from 'primevue/tag';
  import Select from 'primevue/select';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { ref, onMounted } from 'vue';
  import { FilterMatchMode } from '@primevue/core/api';
  
export default {
  components: {
    InputText,
    Column,
    DataTable,
    Tag,
    Select
  },
  setup() {
    const auth = getAuth();
    const attendingEvents = ref([]);
    const loading = ref(true);

    const filters = ref({
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        location: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value:null, matchMode: FilterMatchMode.CONTAINS }
    })

    const fetchAttendingEvents = async (userId) => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.attendingEvents && userData.attendingEvents.length > 0) {
            const eventIds = userData.attendingEvents;
            console.log(eventIds)
            const eventPromises = eventIds.map(eventId => getDoc(doc(db, 'events', eventId)));
            const eventDocs = await Promise.all(eventPromises);
            console.log(eventDocs.size)
            attendingEvents.value = eventDocs
            .filter(doc => doc.exists())
            .map(doc => ({ id: doc.id, ...doc.data() }));
          }
        } else {
          console.log('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching attending events:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user.uid)
          fetchAttendingEvents(user.uid);
        } else {
          console.log('No user is logged in');
          loading.value = false;
        }
      });
    });

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return {
      attendingEvents,
      loading,
      filters,
      formatDate
    };
  }
};
  </script>
  
  <style scoped>
  .responsive-button {
  font-size: 1.5rem; /* Default size */
  padding: 0.25rem 0.75rem; 
}

  .action-btn{
    --bs-btn-bg: #C9A07A;
    --bs-btn-hover-bg: #a5866a;
    border: #000000 solid 1.5px;
  }

  .medium-text{
    font-size: 20px; 
  }
  </style>