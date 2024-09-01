<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <form @submit.prevent="submitForm">
                    <div class="row mb-5">
                        <div class="col-12">
                            <input required type="text" id="email" placeholder="Email" class="form-control login-field"
                            @blur= "validateEmail(true)"
                            @input= "validateEmail(false)"
                            v-model="formData.email">
                            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                        </div>
                    </div>
                    <div class="row mb-8">
                        <div class="col-12">
                            <input required type="password" id="password" placeholder="Password" class="form-control login-field" 
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
                        <button type="button" class="btn btn-secondary action-btn" @click="submitLogin">Login</button>
                        <div v-if="errors.login" class="text-danger">{{ errors.login }}</div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { checkEmailFormat } from '@/utils/validation';
import store from '@/store/store';
import router from '@/router';

  const formData = ref({
      email: '',
      password: ''
  });

  const submitLogin = async () => {
      if(validateLoginData(true)){
        const user = formData.value;
        try{
            const successfulLogin = await store.dispatch('login', {...user});
            if (successfulLogin) { 
                await router.push({ name: 'Home' })
            } else {
                errors.value.login = 'Please sign up before logging in'
            }
        }catch (error) {
            console.error('Error logging in:', error);
        }
      }
  };
  const errors = ref({
    email: null,
    password: null,
    login: null
  })
  const validateEmail = (blur) => {
    // TODO: Validate email exists in database
    if (!checkEmailFormat(formData.value.email)){
        if (blur) errors.value.email = "Please enter a valid email";
    }else {
        errors.value.email = null;
    }
  }

  const validateLoginData = (blur) => {
    validateEmail(true);
    validatePassword(true);
    if (Object.values(errors.value).every(value => value === null)) {
        return true
    }
    return false
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

.forgot-password{
    margin-top: -10px;
    color: #8E4739 !important;
}

</style>