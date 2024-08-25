<template>
    <header class="py-2 mb-3 border-bottom logo-background-colour">
        <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">
            <div class="logo">
                <a href="#" class="col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none">
                    <img class="bi me-2" height="50" width="190" src="../assets/freshmind-logo.png"></img>
                </a>
            </div>
            <div class="d-flex align-items-center">
                <div class="w-100 me-3"></div>
                <div class="flex-shrink-0">
                    <button type="button" class="login-btn btn btn-outline-light me-2">Login</button>
                </div>
            </div>
        
        </div>
    </header>
</template>

<script>

</script>

<style>
.logo{
    position: relative;
}

.logo-background-colour{
    background-color: #8E4739;
}

.login-btn{
    padding-left: 3rem;
    padding-right: 3rem; 
    border-color: #C9A07A;
    color: #ffffff;
}
</style>