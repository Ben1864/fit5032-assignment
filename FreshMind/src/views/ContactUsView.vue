<template>
    <div class="col-4 offset-4">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us using the form below.</p>
  
      <form @submit.prevent="handleSubmit" class="medium-text">
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input type="text" id="name" class="form-control" v-model="formData.name" required />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>
  
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" id="email" class="form-control" v-model="formData.email" required />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
  
        <div class="mb-3">
          <label for="message" class="form-label">Message:</label>
          <textarea id="message" class="form-control" v-model="formData.message" rows="3" required></textarea>
          <span v-if="errors.message" class="error">{{ errors.message }}</span>
        </div>
        <div class="text-center mb-3">
        <button type="submit" class="btn action-btn">Send Message</button>
        </div>
      </form>
  
      
    </div>
    <div class="col-4 offset-4">
        <h2>Contact Information</h2>
        <p>Email: <a href="mailto:info@example.com">support@freshmind.com</a></p>
        <p>Phone: <a href="tel:+6123456789">+61 2345678910</a></p>
        <p>Address: 123 Main St, Melbourne, Australia</p>
      </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const formData = ref({
        name: '',
        email: '',
        message: '',
      });
  
      const errors = ref({
        name: '',
        email: '',
        message: '',
      });
  
      const validateForm = () => {
        let valid = true;
        errors.value.name = '';
        errors.value.email = '';
        errors.value.message = '';
  
        if (!formData.value.name) {
          errors.value.name = 'Name is required.';
          valid = false;
        }
        if (!formData.value.email) {
          errors.value.email = 'Email is required.';
          valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
          errors.value.email = 'Email is invalid.';
          valid = false;
        }
        if (!formData.value.message) {
          errors.value.message = 'Message is required.';
          valid = false;
        }
  
        return valid;
      };
  
      const handleSubmit = () => {
        if (validateForm()) {
          // Send the form data to your backend or an email service here
          console.log('Form submitted:', formData.value);
          // Reset form
          formData.value = { name: '', email: '', message: '' };
        }
      };
  
      return {
        formData,
        errors,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  

  .action-btn{
    --bs-btn-bg: #C9A07A;
    --bs-btn-hover-bg: #a5866a;
    border: #000000 solid 1.5px;
    color: white;
    
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .error {
    color: red;
    font-size: 12px;
  }

  .medium-text{
    font-size: 16px; 
  }
  </style>