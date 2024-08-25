<script setup>
import LoginForm from '@/components/LoginForm.vue';
</script>


<template>
    <div class="row justify-content-center align-items-center" style="height: 80vh;">
        <div class="col-lg-6 col-12 border-end pe-3">
            <h1 class="text-center">Login with email</h1>
            <LoginForm></LoginForm>
        </div>
        <div class="col-6">
            <h1 class="text-center">Sign in with Google</h1>
            <div class="row">
                <div class="text-center vertical-divider">or</div>
            </div>
            <div class="row mb-3 text-center justify-content-center">
                <router-link to="/">
                    <button type="button" class="btn btn-secondary signup-btn">Sign Up</button>
                </router-link>
                
            </div>
        </div>
    </div>
</template>


<style>

.border-end {
    border-right: 1px solid #949494 !important; /* Adjust color and width as needed */
}
.pe-3 {
    padding-right: 1rem; /* Add padding to the right side of the content */
}

.signup-btn{
    background-color: #8E4739;
    font-size: 32px;
    width: 80%;
}

.signup-btn:hover{
    color: white;
    font
}

.vertical-divider{
    padding: 5%;
}
</style>