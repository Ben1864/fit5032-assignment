<template>
    <div class="row align-items-center mt-3">
        <div v-if="store.state.isAuthenticated" class="col-12 col-lg-3 text-center ">
            <button @click="exportToCSV" class="btn btn-primary action-btn responsive-button">Export to CSV</button>
        </div>
        <div class="col-12 col-lg-6 text-center order-1 order-md-0">
            <h1>Community Events</h1>
        </div>
        <div v-if="store.state.isAdmin" class="col-12 col-lg-3 text-center text-lg-end mt-3 mt-lg-0 order-2 order-lg-1">
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
        <DataTable v-model:filters="filters" :value="createdEvents" paginator :rows="10" filterDisplay="row" responsive>
            <Column field="title" sortable header="Event Title" style="width: 20%">
                <template #body="{ data }">
                    {{ data.title }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by title" />
                </template>
            </Column>
            <Column field="location" sortable header="Location" style="width: 25%">
                <template #body="{ data }">
                    {{ data.location }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by location" />
                </template>
            </Column>
            <Column field="date" sortable header="Date" style="width: 5%">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.date) }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by date" />
                </template>
            </Column>
            <Column header="More Info" style="width: 20%">
                <template #body="slotProps">
                    <router-link :to="`/community-events/${slotProps.data.id}`" active-class="active" aria-current="page">
                        <button type="button" class="responsive-button action-btn btn btn-secondary me-3">More Info</button>
                    </router-link>
                </template>
            </Column>
            <Column field="status" sortable header="Status" style="width: 5%">
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
  
<script>
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import InputText from 'primevue/inputtext';
    import Tag from 'primevue/tag';
    import Select from 'primevue/select';
    import { FilterMatchMode } from '@primevue/core/api';
    import { useStore } from 'vuex'
    import { ref, onMounted, createRenderer } from 'vue';
    import { db, auth } from '@/firebase/init';
    import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
    import Papa from 'papaparse';

    export default {
        components: {
            InputText,
            Column,
            DataTable,
            Tag,
            Select
        },
        setup() {
            const store = useStore()
            const createdEvents = ref([])

            const statuses = ref(['Attending', 'Not Attending'])

            const filters = ref({
                title: { value: null, matchMode: FilterMatchMode.CONTAINS },
                location: { value: null, matchMode: FilterMatchMode.CONTAINS },
                date: { value:null, matchMode: FilterMatchMode.CONTAINS },
                status:{ value:null, matchMode: FilterMatchMode.EQUALS} 
            })

            function formatDate(date) {
                return new Date(date).toLocaleDateString(); // Customize the date format as needed
            }

            function getStatusTag(status) {
                switch(status) {
                    case "Attending":
                        return 'success';
                    case "Not Attending":
                        return 'danger'
                }
            }
            const getStatus = async (docId) => {
                try {
                    // Reference to the user's document in Firestore
                    const userDocRef = doc(db, 'users', auth.currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        // Check if attendingEvents exists and contains the event ID
                        if (userData.attendingEvents && userData.attendingEvents.includes(docId)) {
                            return 'Attending'; // Event is in attendingEvents
                        }else {
                            return 'Not Attending'; // Event is not in attendingEvents
                        }
                    }   else {
                        console.log('No user document found!');
                        return 'Not Attending';
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return 'Not Attending';
                }
            }

            const getEvents = async () => {
                try {
                    const eventsCollection = collection(db, 'events');
                    const eventsSnapshot = await getDocs(eventsCollection);
                    const eventsArray = [];
                    for (const doc of eventsSnapshot.docs) {
                        const eventData = { id: doc.id, ...doc.data() };
                        const eventStatus = await getStatus(doc.id); // Await the async status fetch
                        eventData.status = eventStatus; // Add status to the event data
                        eventsArray.push(eventData); // Push the updated event data into the array
                    }
                    createdEvents.value = eventsArray; // Update the reactive `createdEvents` variable
                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            }

            onMounted(() => {
                getEvents();
            });

            return {
                createdEvents,
                getEvents,
                getStatus: getStatusTag,
                formatDate,
                filters,
                statuses,
                store
            };
        },
        methods: {
            exportToCSV() {
                let csvEvents= [];
                console.log(this.createdEvents)
                for (const createdEvent of this.createdEvents) {
                    console.log(createdEvent.tags.map(tag => tag.code).join(', '));
                    const newEvent ={
                        title: createdEvent.title,
                        description: createdEvent.description,
                        location: createdEvent.location,
                        date: createdEvent.date,
                        finishTime: createdEvent.finishTime,
                        startTime: createdEvent.startTime,
                        tags: createdEvent.tags.map(tag => tag.code).join(', '),
                        organiser: createdEvent.organiser,
                        contactEmail: createdEvent.contact.email,
                        contactPhone: createdEvent.contact.phone
                    }
                    csvEvents.push(newEvent);
                }
                const csvData = Papa.unparse(csvEvents);
                const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', 'events.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
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
  font-size: 1.5rem;
  white-space: nowrap;
}

@media (max-width: 992px) {
  .responsive-button {
    font-size: 1.5rem;
    padding: 10px;
  }
}
</style>