<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 yellow-back">
                <div class="col-6 offset-3 welcome-text">
                    <h1 v-if="store.state.isAuthenticated">Welcome, {{ store.state.currentUser.firstName }}!</h1>
                    <h1 v-else>Welcome!</h1>
                </div>
                <div class="justify-content-center row col-5 offset-2 mt-5">
                    <p>Your Path to Mental Wellness Starts Here</p>
                </div>
                <div class="justify-content-center row col-7 offset-2 ">
                    <p class="sub-text">At FreshMind Australia, we are here to support your journey to mental wellness, offering resources and community tailored to your needs. Whether for yourself or a loved one, take the first step today and discover the help you deserve</p>
                </div>
                
            </div>
            <div class="col-md-6 d-flex align-items-center justify-content-center item-container">
                <img class="img-fluid" src="../assets/images/Media.png" alt="Descriptive text">
            </div>
        </div>
    </div>
</template>

<script setup>
    import store from '@/store/store';
</script>

<style scoped>
h1 {
    font-size: 5vw;
    font-weight: normal;
}

p{
    font-weight: bold;
    font-size: 1.5vw;
}

.sub-text{
    font-weight: normal;
    font-size: 1.2vw;
}

.welcome-text{
    margin-top: 3vw;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.col-md-6 {
    padding: 0;
}

.yellow-back {
    background-color: #FFF4D5; /* Yellow color */
    height: auto; /* Full viewport height */
}

.item-container {
    background-color: #F8F9FA; /* Optional background for the image section */
}

.img-fluid {
    width: 100%; /* Ensure the image takes up the full width */
    height: auto; /* Maintain aspect ratio */
}
</style>