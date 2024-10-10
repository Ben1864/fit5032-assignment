<template>
    <div class="col-8 offset-2 col-md-4 offset-md-4">
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
            <label for="reason" class="form-label">Reason for contact:</label>
            <select id="reason" class="form-select" v-model="formData.reason" required>
                <option value="" disabled>Select a reason</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Support Request">Support Request</option>
                <option value="Partnership Inquiry">Partnership Inquiry</option>
                <option value="Other Inquiry">Other</option>
            </select>
            <span v-if="errors.reason" class="error">{{ errors.reason }}</span>
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
    <div class="col-8 offset-2 col-md-4 offset-md-4">
        <h2>Contact Information</h2>
        <p>Email: <a href="mailto:info@example.com">support@freshmind.com</a></p>
        <p>Phone: <a href="tel:+6123456789">+61 2345678910</a></p>
        <p>Address: 123 Main St, Melbourne, Australia</p>
      </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const formData = ref({
        name: '',
        email: '',
        reason: '',
        message: '',
      });
  
      const errors = ref({
        name: '',
        email: '',
        reason: '',
        message: '',
      });
  
      const validateForm = () => {
        let valid = true;
        errors.value.name = '';
        errors.value.email = '';
        errors.value.message = '';
        errors.value.reason = '';
        
        if (formData.value.name.length == 1) {
          errors.value.name = 'Name is required.';
          valid = false;
        }
        if (formData.value.email.length == 1) {
          errors.value.email = 'Please provide email';
          valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
          errors.value.email = 'Email is invalid.';
          valid = false;
        }
        if(formData.value.reason.value) {
            errors.value.reason = 'Please provide a reason for contact';
        }
        if (formData.value.message.length < 10) {
          errors.value.message = 'Please provide more detail.';
          valid = false;
        }
  
        return valid;
      };
  
      const handleSubmit = async () => {
        try {
            if (validateForm()) {
            const url = 'http://127.0.0.1:5001/freshmind-12b06/us-central1/sendEmail';
            const body = {
                from: formData.value.email,
                subject: formData.value.reason,
                message: formData.value.message
            }
            const response = await axios.post(url, body);

            if (response.status === 200) {
                console.log(response.data.message);
            } else {
                console.error(response.data.error);
            }

            formData.value = { name: '', email: '', reason: '', message: '' };
            }
        } catch (error) {
            console.log("Error while sending email: ", error);

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
  
  .error {
    color: red;
    font-size: 12px;
  }

  .medium-text{
    font-size: 16px; 
  }
  </style>