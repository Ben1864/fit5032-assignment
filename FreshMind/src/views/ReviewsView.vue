<template>
    <div class="container">
        <div class="row text-center align-items-center mt-3">
            <h1>Leave a Website Review</h1>
            <p>Please let us know about how we can improve the website</p>
        </div>
        <div v-if="!store.state.isAuthenticated" class="row">
            <div class="alert alert-danger mt-5 text-center" role="alert">
                Please login to leave a website review
            </div>
        </div>
        <div v-else class="row">
            <div class="col-md-8 offset-md-2 col-10 offset-1">
                <form @submit.prevent="submitReview">
                    <div class="mb-3">
                        <label for="rating" class="form-label">Rating</label>
                        <select required id="rating" v-model="review.rating" class="form-select">
                            <option disabled value="">Select a rating</option>
                            <option v-for="rating in ratings">{{ rating }} stars</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="comment" class="form-label">Comment</label>
                        <textarea required id="comment" v-model="review.comment" class="form-control" rows="4" placeholder="Write your review"></textarea>
                    </div>
                    <div class="d-flex justify-content-center mb-2">
                        <button type="submit" class="btn btn-primary action-btn responsive-button">Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="showThankYou" class="col-4 offset-4 alert alert-success text-center" id="thankYouAlert" role="alert">
            Thank you for submitting a review
        </div>
        <div class="text-center">
            <h2>Reviews</h2>
            <div class="row">
                <h3>{{ averageRating() }}/5</h3>
            </div>
            <div class="row mt-2" v-if="reviews.length">
                <div class="d-flex flex-wrap justify-content-center">
                    <div
                        v-for="review in reviews"
                        class="card m-2"
                        style="width: 18rem"
                    >
                        <div class="card border-dark" style="max-width: 18rem;">
                            <div class="card-header">{{ review.rating }}/5</div>
                            <div class="card-body">
                                <h5 class="card-title">{{ review.name }}</h5>
                                <p class="card-text">{{ review.comment }}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script setup>
  import { encodeInput } from '@/utils/xss';
import { ref } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore()

console.log(store)
  const reviews = ref([
    {name: 'Alice', rating: 5, comment: 'Great event, had a wonderful time!' },
    {name: 'Bob', rating: 4, comment: 'Very informative, but a bit too long.' }
  ]);
  
  const showThankYou = ref(false);

  const review = ref({
    name: '',
    rating: '',
    comment: '',
  });
  const ratings = [1, 2, 3, 4, 5];

    const averageRating = () => {
        let sum= 0;
        reviews.value.forEach(element => {
            sum += element.rating
        });
        return (sum/reviews.value.length).toFixed(1)
    }

    const submitReview = () => {
        review.value.rating = encodeInput(review.value.rating)
        review.value.comment = encodeInput(review.value.comment)
        review.value.rating = parseInt(review.value.rating[0])
        review.value.name = store.state.userData.firstName
        showThankYou.value = true

        reviews.value.push({...review.value})
    }  
  </script>
  
  <style scoped>
    .card-body {
        padding: 0.5rem 1px;
    }
  
    .action-btn {
        border-color: #af6050;
    }

    .list-group-item {
        margin-bottom: 10px;
    }
    
    .badge-info {
        background-color: #8E4739;
    }

    .alert{
        --bs-alert-padding-y: 0.25rem
    }
  </style>