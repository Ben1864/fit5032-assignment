<template>
    <LogoutModal></LogoutModal>
    <header class="py-2 border-bottom logo-background-colour">
        <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">
            <div class="logo-position">
                <router-link to="/" active-class="active" aria-current="page" class="col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none">
                    <img class="bi me-2" height="50" width="190" src="../assets/images/freshmind-logo.png"></img>
                </router-link>
            </div>
            <div class="d-flex align-items-center">
                <div class="w-100 me-3"></div>
                <div class="d-flex flex-shrink-0 col-12-sm">
                    
                    <div v-if="store.state.isAuthenticated == false">
                        <router-link to="/login" active-class="active" aria-current="page">
                            <button type="button" class="login-btn btn btn-outline-light me-2">Login</button>
                        </router-link>
                    </div>
                    <div v-else>
                        <router-link to="/attending-events" active-class="active" aria-current="page">
                            <button type="button" class="login-btn btn btn-outline-light me-2">My Events</button>
                        </router-link>
                        <button type="button"  class="login-btn btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <nav class="bg-light border-bottom align-items-center">
        <ul class="logo-position nav me-auto responsive-font">
            <div class="dropdown">
                <a class="dropdown-toggle show nav-link header-link" href="#" id="dropdownNavLink" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                    Get Help
                </a>
                <ul class="dropdown-menu text-small" aria-labelledby="dropdownNavLink">
                    <li><router-link to="/find-support" class="dropdown-item">Find Nearby Support</router-link></li>
                </ul>
            </div>
            <div class="dropdown">
                <a class="dropdown-toggle show nav-link header-link" href="#" id="dropdownNavLink" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                    Get Involved
                </a>
                <ul class="dropdown-menu text-small" aria-labelledby="dropdownNavLink">
                    <li><router-link to="/community-events" class="dropdown-item">Community Events</router-link></li>
                </ul>
            </div>
            <div class="dropdown">
                <a class="dropdown-toggle show nav-link header-link" href="#" id="dropdownNavLink" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                    About
                </a>
                <ul class="dropdown-menu text-small" aria-labelledby="dropdownNavLink">
                    <li><router-link to="/contact-us" class="dropdown-item">Contact Us</router-link></li>
                    <li><router-link to="/reviews" class="dropdown-item">Reviews</router-link></li>
                </ul>
            </div>
        </ul>
    </nav>
</template>

<script setup>
import store from '@/store/store';
import LogoutModal from './LogoutModal.vue';
</script>

<style>
.logo-position{
    position: relative;
    padding-left: 2%;
}

.dropdown-item{
    --bs-dropdown-link-active-bg: #FFF4D5;
    --bs-dropdown-link-active-color: #000000;
    color: #af9b9b;
}

.login-btn{
    padding-left: 3rem;
    padding-right: 3rem; 
    border-color: #C9A07A;
    color: #ffffff;
}

.header-link{
    color: #B7A5A5;
    font-weight: bold;
    --bs-nav-link-hover-color: #6c6464;
}

/* Adjustments for smaller screens */
@media (max-width: 768px) {
  .logo-position img {
    width: 150px;
    height: auto;
  }

  .login-btn {
    padding-left: 2rem;
    padding-right: 2rem;
    font-size: 0.875rem;
  }

  .container-fluid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .container-fluid {
    grid-template-columns: 1fr auto;
  }

  .logo-position img {
    width: 120px;
  }

  .login-btn {
    font-size: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>