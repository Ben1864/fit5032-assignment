<template>
    <div class="container">
        <div class="row" style="height: 80vh;">
            <div class="col-lg-6 col-12 d-flex pe-3 item-container align-items-center">
                <img :src="currentEvent.image" class="img-fluid fill-area"></img>
            </div>
            <div class="col-6">
                <div class="row">
                    <h1>{{ currentEvent.title }}</h1>
                </div>
                <div class="row">
                    <div class="col-1">
                        <span class="badge badge-not-attending">{{currentEvent.status}}</span>
                    </div>
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

.fill-area {
    width: 100%;
    object-fit: cover;
    border: 2px black solid;
}
</style>
