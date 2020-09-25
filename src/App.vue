<template>
  <!-- navbar -->
  <navbar :title="title" />
  <router-view :weather="weather" :timer="timer" :key="$route.fullPath" />
  <!-- buttons -->
  <div
    class="fixed bottom-0 right-0 z-10 flex flex-col w-auto h-auto mr-5 text-gray-200 transform bg-transparent md:mr-16 lg:mr-24"
  >
    <router-link to="/" class="w-auto h-auto mb-5">
      <button
        type="button"
        v-if="menu"
        class="inline-flex items-center w-12 h-12 mx-auto bg-gray-800 border-none rounded-full outline-none btn-eased animation-delay-300 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-8 mx-auto stroke-current"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <polyline points="5 12 3 12 12 3 21 12 19 12" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
          <rect x="10" y="12" width="4" height="4" />
        </svg>
      </button>
    </router-link>
    <router-link to="/chart" class="w-auto h-auto mb-5">
      <button
        type="button"
        v-if="menu"
        class="inline-flex items-center w-12 h-12 mx-auto bg-gray-800 border-none rounded-full outline-none btn-eased animation-delay-200 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-8 mx-auto stroke-current"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="4" y1="19" x2="20" y2="19" />
          <polyline points="4 15 8 9 12 11 16 6 20 10" />
        </svg>
      </button>
    </router-link>
    <router-link to="/map" class="w-auto h-auto mb-5"
      ><button
        type="button"
        v-if="menu"
        class="inline-flex items-center w-12 h-12 mx-auto bg-gray-800 border-none rounded-full outline-none btn-eased animation-delay-100 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-8 mx-auto stroke-current"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="18" y2="6.01" />
          <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
          <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
          <line x1="9" y1="4" x2="9" y2="17" />
          <line x1="15" y1="15" x2="15" y2="20" />
        </svg>
      </button>
    </router-link>
    <button
      type="button"
      @click="menu = !menu"
      class="inline-flex items-center w-12 h-12 mx-auto mb-5 bg-gray-800 border-none rounded-full outline-none focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        v-if="!menu"
        class="h-8 mx-auto fill-current"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        v-else
        class="h-8 mx-auto fill-current"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  props: {},
  data() {
    return {
      title: "Weather",
      menu: false,
      apiKey: "5e2611f98d737a1336862f89296f74c1",
      url: "https://api.openweathermap.org/data/2.5/",
      coordinates: {},
      weather: {},
      temperature: false,
      show: true,
      timer: null
    };
  },
  methods: {
    time() {
      const day = new Date();
      let hour = day.getHours();
      let minutes = day.getMinutes();
      let seconds = day.getSeconds();

      if (hour < 10) hour = "0" + hour;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      let ampm = "am";
      if (hour >= 12) ampm = "pm";
      if (hour > 12) hour = hour - 12;
      if (hour == 0) hour = 12;
      return `${hour} : ${minutes} : ${seconds} ${ampm}`;
    },
    rotate(angle) {
      return `transform: rotate(${angle}deg)`;
    },
    icon(ico) {
      return `https://openweathermap.org/img/wn/${ico}@2x.png`;
    },
    date() {
      const day = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      return `${days[day.getDay()]} ${
        months[day.getMonth()]
      } ${day.getDate()}, ${day.getFullYear()}`;
    },
    utc_to_time(time) {
      const date = new Date(time * 1000);

      return date.toUTCString().slice(-11, -4);
    },
    utc_to_hours(time) {
      const date = new Date(time * 1000);

      return date.toUTCString().slice(-12, -10);
    },
    hours(hour) {
      let ampm = "am";
      if (hour >= 12) ampm = "pm";
      if (hour > 12) hour = hour - 12;
      if (hour == 0) hour = 12;
      return `${hour} ${ampm}`;
    },
    utc_date(time) {
      const date = new Date(time * 1000);

      return date.toUTCString().slice(-24, -18);
    }
  },
  computed() {},
  mounted() {
    setInterval(() => {
      this.timer = this.time();
      return this.timer;
    }, 1000);
    const successCallback = position => {
      this.coordinates = position.coords;

      fetch(
        `${this.url}onecall?lat=${this.coordinates.latitude}&lon=${this.coordinates.longitude}&units=metric&appid=${this.apiKey}`
      )
        .then(response => response.json())
        .then(result => (this.weather = result))
        .catch(error => console.warn(error));

      navigator.geolocation.clearWatch(this.coordinates.id);
    };
    const errorCallback = error => console.error(error);
    navigator.geolocation.watchPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  }
};
</script>

<style src="./assets/build/tailwind.css"></style>
