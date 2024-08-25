<template>
    <header class="py-2 mb-3 border-bottom logo-background-colour">
        <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">
            <div class="logo-position">
                <router-link to="/" active-class="active" aria-current="page" class="col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none">
                    <img class="bi me-2" height="50" width="190" src="../assets/freshmind-logo.png"></img>
                </router-link>
            </div>
            <div class="d-flex align-items-center">
                <div class="w-100 me-3"></div>
                <div class="d-flex flex-shrink-0 col-12-sm">
                    <router-link to="/login" active-class="active" aria-current="page">
                        <button type="button" class="login-btn btn btn-outline-light me-2">Login</button>
                    </router-link>
                </div>
            </div>
        </div>
    </header>
</template>

<style>
.logo-position{
    position: relative;
    padding-left: 2%;
}

.login-btn{
    padding-left: 3rem;
    padding-right: 3rem; 
    border-color: #C9A07A;
    color: #ffffff;
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