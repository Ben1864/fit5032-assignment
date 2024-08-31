<template>
    <div class="container">
        <div class="row" style="height: 80vh;">
            <div class="col-lg-6 col-12 d-flex pe-3 item-container align-items-center">
                <img :src="currentEvent.image" class="img-fluid fill-area"></img>
            </div>
            <div class="col-lg-6 col-12">
                <div class="row">
                    <h1>{{ currentEvent.title }}</h1>
                </div>
                <div class="row">
                    <div class="col-12 d-flex align-items-center">
                        <span class="badge badge-not-attending me-2">{{ currentEvent.status }}</span>
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
    </div>
</template>

<script setup>
    import events from '../assets/json/events.json'
    import createdEvents from '../assets/json/events.json';
    import { useStore } from 'vuex'

    const store = useStore()
    const props = defineProps({ id: String })
    const currentEvent = events.find(event => props.id == event.id)

    if (store.getters.userIsAttending(currentEvent)){
        currentEvent.status = 'Attending'
    }else {
        currentEvent.status = 'Not Attending'
    }
   
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

</script>

<style>
.image-container {
    height: 300px; /* Set a specific height for the container */
    width: 100%;   /* Ensure the width fills the container */
}

.badge-attending{
    color: #fff;
    background-color: #28a745;
}

.badge-not-attending{
    color: #fff;
    background-color: #dc3545;
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
</style>
