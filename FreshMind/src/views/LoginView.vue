<script setup>
import LoginForm from '@/components/LoginForm.vue';
</script>


<template>
    <div class="row justify-content-center align-items-center" style="height: 80vh;">
        <div class="col-12 pe-3">
            <h1 class="text-center">Login with Email</h1>
            <LoginForm></LoginForm>
        </div>
        <div class="text-center">
            <p style="font-size: 20px">or</p>
            <div class="row mb-3 justify-content-center">
                <router-link to="/signup">
                    <button type="button" class="btn btn-secondary signup-btn">Sign Up</button>
                </router-link>
            </div>
        </div>
    </div>
</template>


<style>

.border-end {
    border-right: 1px solid #949494 !important;
}
.pe-3 {
    padding-right: 1rem;
}

.signup-btn{
    background-color: #8E4739;
    font-size: 32px;
    width: 50%;
    --bs-btn-hover-bg: #8a5e55;
    --bs-btn-active-bg: #4f2e27;
}

.google-btn{
    background-color: #a86c60;
    font-size: 32px;
    width: 60%;
    --bs-btn-hover-bg: #b3837a;
    --bs-btn-active-bg: #654943;
}

.vertical-divider{
    padding: 5%;
    font-size: 20px;
}
</style>