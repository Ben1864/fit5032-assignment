<template>
    <div class="add-event-page">
      <h1>Add New Event</h1>
  
      <form @submit.prevent="addEvent">
        <div>
          <label for="title">Event Title</label>
          <input v-model="event.title" type="text" id="title" required />
        </div>
  
        <div>
          <label for="description">Description</label>
          <textarea v-model="event.description" id="description" required></textarea>
        </div>
  
        <div>
          <label for="date">Event Date</label>
          <input v-model="event.date" type="date" id="date" required />
        </div>
  
        <div>
          <label for="startTime">Start Time</label>
          <input v-model="event.startTime" type="time" id="startTime" required />
        </div>
  
        <div>
          <label for="finishTime">Finish Time</label>
          <input v-model="event.finishTime" type="time" id="finishTime" required />
        </div>
  
        <div>
          <label for="location">Location</label>
          <input v-model="event.location" type="text" id="location" required />
        </div>
  
        <div>
          <label for="organiser">Organizer</label>
          <input v-model="event.organiser" type="text" id="organiser" required />
        </div>
  
        <div>
          <label for="attendees">Attendees</label>
          <input v-model.number="event.attendees" type="number" id="attendees" required />
        </div>
  
        <div>
          <label for="tags">Tags</label>
          <input v-model="event.tags" type="text" id="tags" placeholder="Enter tags separated by commas" />
        </div>
  
        <div>
          <label for="image">Image URL</label>
          <input v-model="event.image" type="text" id="image" />
        </div>
  
        <div>
          <label for="contactEmail">Contact Email</label>
          <input v-model="event.contact.email" type="email" id="contactEmail" required />
        </div>
  
        <div>
          <label for="contactPhone">Contact Phone</label>
          <input v-model="event.contact.phone" type="tel" id="contactPhone" required />
        </div>
  
        <button type="submit">Add Event</button>
      </form>
    </div>
  </template>
  
  <script>
  import { addDoc, collection } from "firebase/firestore"; 
  import { db } from './firebase'; // Import Firestore instance
  
  export default {
    data() {
      return {
        event: {
          title: '',
          description: '',
          date: '',
          startTime: '',
          finishTime: '',
          location: '',
          organiser: '',
          attendees: 0,
          tags: [],
          image: '',
          contact: {
            email: '',
            phone: ''
          },
          status: null
        }
      };
    },
    methods: {
      async addEvent() {
        try {
          // Convert comma-separated tags string into an array
          this.event.tags = this.event.tags.split(',').map(tag => tag.trim());
  
          // Reference to the Firestore events collection
          const eventRef = collection(db, "events");
  
          // Add the event to Firestore
          await addDoc(eventRef, this.event);
  
          // Success message or redirect can be added here
          alert("Event added successfully!");
        } catch (error) {
          console.error("Error adding event: ", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-event-page {
    max-width: 600px;
    margin: 0 auto;
  }
  
  form div {
    margin-bottom: 1em;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 0.75em 1.5em;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>