<template>
    <div class="add-event-page">
      <h1 class="text-center">Add New Event</h1>
  
      <form @submit.prevent="addEvent">
        <div>
          <label for="title">Event Title</label>
          <input v-model="event.title" type="text" id="title" required />
        </div>
  
        <div>
          <label for="description">Description</label>
          <textarea v-model="event.description" id="description" required></textarea>
          <span v-if="errors.description" class="error">{{ errors.description }}</span>
        </div>
  
        <div>
          <label for="date">Event Date</label>
          <input v-model="event.date" type="date" id="date" required />
          <span v-if="errors.date" class="error">{{ errors.date }}</span>
        </div>
        <div class="row">
            <div class="col-6">
            <label for="startTime">Start Time</label>
            <input v-model="event.startTime" type="time" id="startTime" required />
            </div>
    
            <div class="col-6">
            <label for="finishTime">Finish Time</label>
            <input v-model="event.finishTime" type="time" id="finishTime" required />
            <span v-if="errors.time" class="error">{{ errors.time }}</span>
            </div>
        </div>
        <div>
          <label for="location">Location</label>
          <input v-model="event.location" type="text" id="location" required />
        </div>
  
        <div>
          <label for="organiser">Organiser</label>
          <input v-model="event.organiser" type="text" id="organiser" required />
        </div>

        <div>
        <label for="tags">Tags</label>
        <MultiSelect 
          v-model="event.tags"
          :options="tagOptions"
          optionLabel="code" 
          placeholder="Select Tags"
          filter
        >
          <template #chip="{ value }">
            <span>{{ value }}</span>
          </template>
          <template #option="slotProps">
            <span>{{ slotProps.option.code }}</span>
          </template>
        </MultiSelect>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="contactEmail">Contact Email</label>
          <input v-model="event.contact.email" type="email" id="contactEmail" required />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
  
        <div class="col-6">
          <label for="contactPhone">Contact Phone</label>
          <input v-model="event.contact.phone" type="tel" id="contactPhone" required />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
      </div>
  
        <button class="col-12 mb-5 action-btn" type="submit">Add Event</button>
      </form>
    </div>
  </template>
  
  <script>
  import MultiSelect from 'primevue/multiselect';
  import { addDoc, collection } from "firebase/firestore"; 
  import { db } from "@/firebase/init";
import { useRouter } from 'vue-router';
import { encodeInput } from '@/utils/xss';
  
  export default {
    components: {
    MultiSelect
  },
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
          tags: [],
          contact: {
            email: '',
            phone: ''
          },
          status: null
        },
        tagOptions: [
            { code: 'Mental Health' },
            { code: 'Workshop' },
            { code: 'Awareness' },
            { code: 'Community' },
        ],
        errors: {}
      };
    },
    methods: {
    validateDescription(description) {
      return description.length >= 10 ? null : 'Description must be at least 10 characters.'; // Description must be at least 10 characters
    },

    validateDate(date) {
      const today = new Date();
      const selectedDate = new Date(date);
      return selectedDate >= today ? null : 'Date must be today or in the future.'; // Date must be today or in the future
    },
  
    validateTime(startTime, finishTime) {
      const start = new Date(`1970-01-01T${startTime}`);
      const finish = new Date(`1970-01-01T${finishTime}`);
      return start < finish ? null: 'Start time must be before finish time.'; // Start time must be before finish time
    },
  
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
      return regex.test(email) ? null : 'Invalid email format.'; // Validates email format
    },
  
    validatePhone(phone) {
      const regex = /^\+?\d{1,4}[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/; // Regex for international phone formats
      return regex.test(phone) ? null: 'Invalid phone format.'; // Validates phone format
    },
  
    validateForm() {
        this.errors = {}; // Reset errors

        this.errors.description = this.validateDescription(this.event.description);
        this.errors.date = this.validateDate(this.event.date);
        this.errors.time = this.validateTime(this.event.startTime, this.event.finishTime);
        this.errors.email = this.validateEmail(this.event.contact.email);
        this.errors.phone = this.validatePhone(this.event.contact.phone);
        return Object.values(this.errors).every(error => !error);
    },
    async addEvent() {
      try {
        // Reference to the Firestore events collection
        if (this.validateForm()){
            
            return
        }
        
        newEvent = {
            title: encodeInput(this.event.title),
            description: encodeInput(this.event.description),
            date: encodeInput(this.event.date),
            startTime: encodeInput(this.event.startTime),
            finishTime: encodeInput(this.event.finishTime),
            location: encodeInput(this.event.location),
            organiser: encodeInput(this.event.organiser),
            tags: this.event.tags,
            contact: {
                email: encodeInput(this.event.email),
                phone: encodeInput(this.event.phone)
            },
            status: null
        }
        
        const eventRef = collection(db, "events");  
        // Add the event to Firestore
        await addDoc(eventRef, this.event);  
        // Success message or redirect can be added here
        alert("Event added successfully!");
        useRouter().push({name:'CommunityEvents'})
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

  .action-btn{
    background-color: #8E4739;
    font-size: 20px;
    width: 100%;
    --bs-btn-hover-bg: #8a5e55;
    --bs-btn-active-bg: #4f2e27;
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

  .error {
    color: red;
    font-size: 0.8rem;
  }
  </style>