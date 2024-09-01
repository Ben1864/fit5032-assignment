<template>
        <div class="row" style="height: 80vh;">
            <div class="col-lg-5 offset-lg-1 col-12 d-flex pe-3 item-container align-items-center">
                <img :src="currentEvent.image" class="img-fluid fill-area"></img>
            </div>
            <div class="col-lg-6 col-12 mt-2">
                <div class="row justify-content-center">
                    <div class="col-7"><h1>{{ currentEvent.title }}</h1></div>
                    <div v-if="!store.getters.userIsAttending(currentEvent)" class="col-5"><button type="button" @click="submitAttendance()" class="responsive-button action-btn btn btn-secondary">Attend</button></div>
                    <div v-else class="col-5"><button type="button" @click="removeAttendance()" class="btn-attending text-center responsive-button action-btn btn btn-secondary">Attending</button></div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex align-items-center">
                        <span v-for="tag in currentEvent.tags" class="badge badge-tags me-2">{{ tag }}</span>
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
</template>

<script setup>
    import events from '../assets/json/events.json'
    import { useStore } from 'vuex'
    import { ref } from 'vue'

    const store = useStore()
    const props = defineProps({ id: String })
    const currentEvent = events.find(event => props.id == event.id)
    const badgeColour = ref('#dc3545')
    if (store.getters.userIsAttending(currentEvent)){
        currentEvent.status = 'Attending'
        badgeColour.value = '#28a745'
    }else {
        currentEvent.status = 'Not Attending'
        badgeColour.value = '#dc3545'
    }
   
    console.log(store.state)
    const convertDateFormat = (dateStr) => {
        const date = new Date(dateStr);

        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }
    const currentEventDate = convertDateFormat(currentEvent.date);
    const submitAttendance = async () => {
        try{
            const successfulAttending = await store.dispatch('attendEvent', currentEvent);
            if (successfulAttending) {
                currentEvent.status = 'Attending'
                badgeColour.value = '#28a745'
            }
        }catch (error) {
            console.error('Error attending:', error);
        }
  };

  const removeAttendance = async () => {
        try{
            const successfulRemoval = await store.dispatch('unattendEvent', currentEvent);
            if (successfulRemoval) {
                currentEvent.status = 'Not Attending'
                badgeColour.value = '#dc3545'
            }
        }catch (error) {
            console.error('Error attending this event: ', error);
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
</style>
