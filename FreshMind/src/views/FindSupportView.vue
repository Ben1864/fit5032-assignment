<template>
    <div class="container my-4">
      <h1 class="text-center mb-4">Find Nearby Support</h1>
      <div v-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>
      <div id="map" class="map"></div>
      <div class="text-center mt-3">
        <button class="btn btn-primary action-btn" @click="getDirections">
          Find Nearest Support
        </button>
      </div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
  data() {
    return {
      map: null,
      userLocation: null,
      error: null,
    };
  },
  mounted() {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          this.initializeMap(this.userLocation);
        },
        () => {
          this.error = 'Unable to retrieve your location. Please enable location services.';
          this.initializeMap([144.9631, -37.8136]); // Default to Melbourne
        }
      );
    } else {
      this.error = 'Geolocation is not supported by your browser.';
      this.initializeMap([144.9631, -37.8136]); // Default to Melbourne
    }
  },
  methods: {
    initializeMap(center) {
      this.map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/streets-v11', 
        center: center,
        zoom: 12, 
      });
      this.map.addControl(new mapboxgl.NavigationControl());
    }
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
};

</script>

<style>
    .map {
        width: 100%;
        height: 500px;
        border-radius: 8px;
        border: 1px solid #ddd;
    }
    .action-btn{
      width: 40%
    }
</style>
