<template>
    <div v-if="currentEvent">
        <div id="currentEvent" class="row">
            <div class="col-md-8 offset-md-2 col-10 offset-1 mt-2">
                <div class="row justify-content-center">
                    <div class="col-7"><h1>{{ currentEvent.title }}</h1></div>
                    <div v-if="currentEvent.status == 'Not Attending'" class="col-5"><button type="button" @click="submitAttendance()" class="responsive-button action-btn btn btn-secondary exclude-from-pdf">Attend</button></div>
                    <div v-else class="col-5"><button type="button" @click="removeAttendance()" class="btn-attending text-center responsive-button action-btn btn btn-secondary exclude-from-pdf">Attending</button></div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex align-items-center">
                        <span v-for="tag in currentEvent.tags" class="badge badge-tags me-2">{{ tag.code }}</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <h2>Location</h2><br>
                    <div class="event-info">{{ currentEvent.location }}</div>
                </div>
                <div class="row mt-3">
                    <h2>Time</h2><br>
                    <div class="event-info">{{ currentEvent.startTime }} - {{ currentEvent.finishTime }}, {{ currentEventDate }}</div>
                </div>
                <div class="row mt-3">
                    <h2>Description</h2><br>
                    <div class="event-info">{{ currentEvent.description }}</div>
                </div>
                <div class="row mt-3">
                    <h2>Contact Details</h2><br>
                    <div class="event-info">{{ currentEvent.organiser }}, {{ currentEvent.contact.email }}</div><br>
                    <div class="event-info">{{ currentEvent.contact.phone }}</div>
                </div>
            </div> 
        </div>
        <div class="row mt-3 col-md-8 offset-md-2 col-10 offset-1">
                <div class="col-8">
                    <button type="button" class="btn action-btn responsive-button" @click="exportToPDF()">Export as PDF</button>
                </div>
            </div>
    </div>
    <div v-else>
        <p>Loading event...</p>
  </div>
</template>

<script>
    import { useStore } from 'vuex'
    import { ref, onMounted } from 'vue'
    import { doc, getDoc } from "firebase/firestore"; // Import necessary Firestore methods
    import { db } from '@/firebase/init';
    import html2pdf from 'html2pdf.js';

    export default {
    props: {
        id: {
        type: String,
        required: true
        }
    },
    setup(props) {
        const store = useStore();
        const currentEvent = ref(null);
        const badgeColour = ref('#dc3545');
        const currentEventDate = ref('');

        // Fetch event by ID and set the reactive data
        const getEventById = async (eventId) => {
        try {
            const eventDocRef = doc(db, 'events', eventId);
            const eventDoc = await getDoc(eventDocRef);

            if (eventDoc.exists()) {
            return { id: eventDoc.id, ...eventDoc.data() };
            } else {
            console.log("No event found with the provided ID.");
            return null;
            }
        } catch (error) {
            console.error("Error fetching event:", error);
            return null;
        }
        };

        // Date formatting function
        const convertDateFormat = (dateStr) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
        };

        // Load the event and set its status
        onMounted(async () => {
            currentEvent.value = await getEventById(props.id);

            if (currentEvent.value) {
                currentEventDate.value = convertDateFormat(currentEvent.value.date);

                // Check if the user is attending the event
                if (store.getters.userIsAttending(currentEvent.value)) {
                currentEvent.value.status = 'Attending';
                badgeColour.value = '#28a745';
                } else {
                currentEvent.value.status = 'Not Attending';
                badgeColour.value = '#dc3545';
                }
            }
        });

        // Attendance functions
        const submitAttendance = async () => {
        try {
            const successfulAttending = await store.dispatch('attendEvent', currentEvent.value);
            if (successfulAttending) {
            currentEvent.value.status = 'Attending';
            badgeColour.value = '#28a745';
            }
        } catch (error) {
            console.error('Error attending event:', error);
        }
        };

        const removeAttendance = async () => {
        try {
            const successfulRemoval = await store.dispatch('unattendEvent', currentEvent.value);
            if (successfulRemoval) {
            currentEvent.value.status = 'Not Attending';
            badgeColour.value = '#dc3545';
            }
        } catch (error) {
            console.error('Error unattending this event:', error);
        }
        };

        const exportToPDF = async () => {
            try {
                // Exclude unwanted elements from pdf
                const excludedElements = document.querySelectorAll('.exclude-from-pdf');
                excludedElements.forEach(el => el.style.display = 'none');

                const html = document.getElementById('currentEvent');
                if (html) {
                    const opt = {
                        filename: 'FreshMind ' + currentEvent.value.title
                    }
                    await html2pdf().set(opt).from(html).save();
                } else {
                    throw new Error('Element not found');
                }
                // Reset elements after PDF is generated
                excludedElements.forEach(el => el.style.display = '');
            } catch (error) {
                console.error('Error exporting PDF:', error);
            }
        }

        return {
        currentEvent,
        badgeColour,
        currentEventDate,
        submitAttendance,
        removeAttendance,
        exportToPDF
        };
    }
};

</script>

<style scoped>
.action-btn{
    --bs-btn-bg: #C9A07A;
    --bs-btn-hover-bg: #a5866a;
    border: #000000 solid 1.5px;
}

.image-container {
    height: 300px; /* Set a specific height for the container */
    width: 100%;   /* Ensure the width fills the container */
}

.btn-attending{
    color: #fff;
    background-color: #28a745;
    --bs-btn-hover-bg: #257337;
    --bs-btn-active-bg: #1d5d2c;
    font-size: 30px;
    width: 80%;
}

.badge-tags {
    background-color: #6c757d;
}

.fill-area {
    width: 100%;
    object-fit: cover;
    border: 2px black solid;
}

.event-info{
    font-size: larger;
    padding-left: 40px;
}

.responsive-button {
  font-size: 1.5rem; /* Default size */
  padding: 0.75rem 1.5rem; 
}

@media (max-width: 767px) {
  .responsive-button {
    font-size: 20px;
    padding: 0.5rem 1rem;
  }
}

@media print {
  .exclude-from-pdf {
    display: none;
  }
}
</style>
