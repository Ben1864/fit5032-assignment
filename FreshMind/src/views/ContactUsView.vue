<template>
    <div class="col-8 offset-2 col-md-4 offset-md-4">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us using the form below.</p>
  
      <form @submit.prevent="handleSubmit" class="medium-text">
        <div v-if="!store.state.isAuthenticated">
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
        <div class="mb-3 custom-file">
            <label for="attachments" class="custom-file-label">Attachments:</label>
            <input type="file" class="custom-file-input" id="attachments" @change="handleFileUpload" multiple ref="fileInput"/>
        </div>
        <div class="text-center mb-3">
        <button type="submit" class="btn action-btn">Send Email</button>
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
  import { auth } from '@/firebase/init';
  import { useStore } from 'vuex';
  import { encodeInput } from '@/utils/xss';
  

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
      
      const files = ref([])
      const store = useStore()
      const handleFileUpload = (event) => {
        files.value = Array.from(event.target.files); // Convert FileList to Array
      }
      const handleFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]); // Get base64 string
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
      };
      const validateForm = () => {
        let valid = true;
        errors.value.name = '';
        errors.value.email = '';
        errors.value.message = '';
        errors.value.reason = '';
        if (!store.state.isAuthenticated) {
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
                const url = 'https://sendemail-iqi6mt4tya-uc.a.run.app';

                const attachments = await Promise.all(
                      files.value.map(file => handleFileToBase64(file))
                );


                const name = store.state.isAuthenticated ? store.state.userData.firstName : encodeInput(formData.value.name);
                const email = store.state.isAuthenticated ? store.state.userData.email : encodeInput(formData.value.email);
                // Email for contact to "FreshMind"
                const reqBody = {
                    to: "ridgesben1864@gmail.com",
                    subject: formData.value.reason,
                    message: encodeInput(formData.value.message),
                    attachments: files.value.map((file, index) => ({
                      filename: file.name,
                      data: attachments[index], // base64 encoded data
                    })),
                }
                await axios.post(url, reqBody, {
                    headers: {'Content-Type': 'application/json'}
                });

                // Email for notifying the user of contact
                // This only works for ridgesben1864@gmail.com, because of amazon ses sandbox mode
                // If you want to verify this, please let me know and I can add you as a verified identity
                // Or see video
                const notifyBody = {
                    to: email,
                    subject: "Thank you for Contacting Us",
                    message: "Thank you for contacting us " + name + " we will get back to you with a response shortly."
                }
                await axios.post(url, notifyBody, {
                    headers: {'Content-Type': 'application/json'}
                });

                formData.value = { name: '', email: '', reason: '', message: '' };
                files.value = [];
                document.getElementById("attachments").value = ''
            }
        } catch (error) {
            console.log("Error while sending email: ", error);

        }
    };
  
      return {
        formData,
        errors,
        handleSubmit,
        handleFileUpload,
        store
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