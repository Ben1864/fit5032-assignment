<template>

</template>

<script setup>
    import events from '../assets/json/events.json'
    const props = defineProps({ id: String })
    const currentEvent = events.find(event => props.id == event.id)
</script>