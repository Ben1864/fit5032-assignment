<template>
    <div class="container-fluid yellow-back">
        <div class="row">
            <div class="col-md-6">
                <div class="col-6 offset-3 welcome-text">
                    <h1 v-if="store.state.isAuthenticated" class="mb-md-2">Welcome, {{ store.state.currentUser.firstName }}!</h1>
                    <h1 v-else class="mb-md-4">Welcome!</h1>
                </div>
                <div class="justify-content-center row col-5 offset-2">
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
    background-color: #FFF4D5;
    height: 90vh;
}

@media (max-width: 767px) {
  .sub-text{
    font-size: 2vw;
  }

  p{
    font-size: 3vw;
  }

  h1{
    font-size: 7vw;
  }
}
.item-container {
    background-color: #F8F9FA;
}

.img-fluid {
    width: 100%;
    height: auto;
}
</style>