<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-12">
                            <label for="email" class="form-label">Email:</label>
                            <input type="text" id="email" class="form-control" 
                            @blur= "validateEmail(true)"
                            @input= "validateEmail(false)"
                            v-model="formData.email">
                            <div v-if="errors.username" class="text-danger">{{ errors.email }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12">
                            <label for="password" class="form-label">Password:</label><br>
                            <input type="password" id="password" class="form-control" 
                            @blur="validatePassword(true)"
                            @input="validatePassword(false)"
                            v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-secondary" @click="submitLogin">Login</button>
                    </div>
                </form>
               
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
  
  const formData = ref({
      username: '',
      password: ''
  });
  
  const submittedCards = ref([]);
  
  const submitLogin = () => {
      validateEmail(true);
      validatePassword(true);
      // TODO: Login user
  };
  const errors = ref({
    email: null,
    password: null
  })

  const validateEmail = (blur) => {
    // TODO: Validate email exists in database
    if (!checkEmailFormat(formData.value.email)){
        if (blur) errors.email.username = "Please enter a valid email";
    }else {
        errors.value.email = null;
    }
  }

  const checkEmailFormat = (email) => {
    /*
        Regex email validation
        Returns True if a valid email
    */
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^*(),.<>?":|{}]/.test(password);

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
    } else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character.";
    } else {
        errors.value.password = null;
    }
  }

  
</script>

<style scoped>
</style>