<template>
    <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="logoutModalLabel">Are you sure you want to Logout?</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary red-btn " @click="logout()" data-bs-dismiss="modal">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<script setup>
import store from '@/store/store';
const logout = () => {
    try{
        store.dispatch('logout');
    }catch (error) {
        console.error('Error logging out:', error);
    }
}
</script>
  <style>
  .red-btn{
      --bs-btn-bg: red !important;
      --bs-btn-hover-bg: #db0707 !important;
      --bs-btn-active-bg: #bd0606 !important;
      --bs-btn-border-color: #8a0606 !important;
  }
  </style>