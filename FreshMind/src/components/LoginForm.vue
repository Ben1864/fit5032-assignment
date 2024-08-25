<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <form @submit.prevent="submitForm">
                    <div class="row mb-5">
                        <div class="col-12">
                            <input type="text" id="email" placeholder="Email" class="form-control login-field"
                            @blur= "validateEmail(true)"
                            @input= "validateEmail(false)"
                            v-model="formData.email">
                            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                        </div>
                    </div>
                    <div class="row mb-8">
                        <div class="col-12">
                            <input type="password" id="password" placeholder="Password" class="form-control login-field" 
                            @blur="validatePassword(true)"
                            @input="validatePassword(false)"
                            v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="row mb-5">
                        <div class="col-12 text-end">
                            <router-link to="/forgot-password" class="forgot-password text-muted">Forgot Password?</router-link>
                        </div>
                    </div>
                    <div class="row mb-3 text-center justify-content-center">
                        <button type="button" class="btn btn-secondary login-submit" @click="submitLogin">Login</button>
                    </div>
                </form>
               
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
  
  const formData = ref({
      email: '',
      password: ''
  });
  
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
        if (blur) errors.value.email = "Please enter a valid email";
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
.login-submit{
    background-color: #8E4739;
    font-size: 32px;
    width: 80%;

}
.login-field{
    height: 100px;
    padding-left: 6%;
}
.forgot-password{
    margin-top: -10px;
    color: #8E4739 !important;
}

</style>