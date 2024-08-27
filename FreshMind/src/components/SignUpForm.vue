<template>
    <div class="container mt-3">
        <form>
            <div class="row">
            <div class="col-lg-6 col-12 pe-3">
                    <div class="row">
                        <div class="col-md-10 offset-md-1">
                            <div class="row mb-5">
                                <div class="col-12">
                                    <input type="text" id="firstName" placeholder="First Name" class="form-control login-field"
                                    @blur= "validateFirstName(true)"
                                    @input= "validateFirstName(false)"
                                    v-model="formData.firstName">
                                    <div v-if="errors.firstName" class="text-danger">{{ errors.firstName }}</div>
                                </div>
                            </div>
                            <div class="row mb-5">
                                <div class="col-12">
                                    <input type="text" id="lastName" placeholder="Last Name" class="form-control login-field" 
                                    @blur="validateLastName(true)"
                                    @input="validateLastName(false)"
                                    v-model="formData.lastName">
                                    <div v-if="errors.lastName" class="text-danger">{{ errors.lastName }}</div>
                                </div>
                            </div>
                            <div class="row mb-lg-0 mb-5">
                                <div class="col-12">
                                    <input type="text" id="dob" placeholder="Date Of Birth" class="form-control login-field"
                                    v-model="formData.dob"
                                    @focus="(e) => e.target.type = 'date'"
                                    @blur="(e) => {e.target.type = 'text'; validateDOB(true)}"
                                    @input="validateDOB(false)">
                                    <div v-if="errors.dob" class="text-danger">{{ errors.dob }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="col-lg-6 col-12 pe-3">
                    <div class="row">
                        <div class="col-md-10 offset-md-1">
                            <div class="row mb-5">
                                <div class="col-12">
                                    <input type="text" id="email" placeholder="Email" class="form-control login-field"
                                    @blur= "validateEmail(true)"
                                    @input= "validateEmail(false)"
                                    v-model="formData.email">
                                    <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                                </div>
                            </div>
                            <div class="row mb-5">
                                <div class="col-12">
                                    <input type="text" id="password" placeholder="Password" class="form-control login-field" 
                                    @blur="validatePassword(true)"
                                    @input="validatePassword(false)"
                                    v-model="formData.password">
                                    <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <input type="text" id="retypePassword" placeholder="Retype Password" class="form-control login-field" 
                                    @blur="validateRetypePassword(true)"
                                    @input="validateRetypePassword(false)"
                                    v-model="formData.retypePassword">
                                    <div v-if="errors.retypePassword" class="text-danger">{{ errors.retypePassword }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row p-5 text-center justify-content-center">
                <button type="button" class="btn btn-secondary login-submit" @click="submitSignUp">Sign Up</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { checkEmailFormat } from '@/utils/validation';
  const formData = ref({
      firstName: '',
      lastName: '',
      dob: '',  
      email: '',
      password: '',
      retypePassword: ''
  });
  
  const submitSignUp= () => {
      validateEmail(true);
      validatePassword(true);
      // TODO: SignUp user
  };
  const errors = ref({
    firstName: null,
    lastName: null,
    dob: null,  
    email: null,
    password: null,
    retypePassword: null
  })
  const validateEmail = (blur) => {
    if (!checkEmailFormat(formData.value.email)){
        if (blur) errors.value.email = "Please enter a valid email";
    }else {
        errors.value.email = null;
    }
  }

  const validateDOB = (blur) => {
    const DOB = Date.parse(formData.value.dob);
    if (DOB > Date.now()) {
        if (blur) errors.value.dob = 'Date of birth can not be in the future';
    }else{
        errors.value.dob = null;
    }
  }

  const validateFirstName = (blur) => {
    const hasNumber = /\d/.test(formData.value.firstName);
    const hasSpecialChar = /[!@#$%^*(),.<>?":|{}_]/.test(formData.value.firstName);
    if (hasNumber) {
        if (blur) errors.value.firstName = "First name can not contain a number.";
    } else if (hasSpecialChar) {
        if (blur) errors.value.firstName = "First name can not contain a special character.";
    } else {
        errors.value.firstName = null;
    }
}

    const validateLastName = (blur) => {
    const hasNumber = /\d/.test(formData.value.lastName);
    const hasSpecialChar = /[!@#$%^*(),.<>?":|{}_]/.test(formData.value.lastName);
    if (hasNumber) {
        if (blur) errors.value.lastName = "Last name can not contain a number.";
    } else if (hasSpecialChar) {
        if (blur) errors.value.lastName = "Last name can not contain a special character.";
    } else {
        errors.value.lastName = null;
    }
}

  const validateRetypePassword = (blur) => {
    const password = formData.value.password;
    const retypePassword = formData.value.retypePassword;

    if (password != retypePassword) {
        if (blur) errors.value.retypePassword = 'Passwords must match';
    }
    else {
        errors.value.retypePassword = null;
    }
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

<style>
    .login-submit{
  --bs-btn-bg: #8E4739;
  font-size: 32px;
  width: 40%;
  --bs-btn-hover-bg: #8a5e55;
  --bs-btn-active-bg: #4f2e27;
}
</style>