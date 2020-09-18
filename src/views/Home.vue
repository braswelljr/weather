<template>
  <div id="app" class="w-screen h-screen antialiased text-gray-800 bg-gray-200">
    <navbar :apiKey="apiKey" :title="title" :url="url" />
    <div
      class="z-10 min-w-full min-h-full p-5 pt-24 bg-fixed md:px-16 lg:px-32"
      v-if="typeof weather.timezone != 'undefined'"
      :class="
        weather.current.temp < 18
          ? 'bg-cool text-gray-800'
          : 'bg-warm text-gray-200'
      "
    >
      <div
        class="flex items-center justify-around w-full text-current text-gray-200"
      >
        <div class="inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="h-4 fill-current"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="font-medium uppercase">{{ timer }}</span>
        </div>
        <div class="inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="h-4 fill-current"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="font-medium uppercase"> {{ weather.timezone }} </span>
        </div>
      </div>

      <div class="w-full py-5 bg-gray-800 bg-opacity-25 rounded-lg">
        <div
          class="w-20 h-auto p-1 mx-auto text-sm font-medium text-center text-current uppercase bg-blue-100 bg-opacity-25 border-none rounded-sm"
        >
          {{ weather.current.weather[0].main }}
        </div>
        <div class="flex items-center justify-around">
          <div class="p-0">
            <div class="p-0 text-current">
              <p class="p-0 font-medium text-center">
                <span class="text-6xl">
                  {{ Math.round(weather.current.temp * 10) / 10 }}
                </span>
                <span class="text-lg">&deg;C</span>
              </p>
            </div>
            <div class="text-lg font-medium">
              Feels like
              {{ Math.round(weather.current.feels_like * 10) / 10 }}&deg;
            </div>
          </div>
          <div class="flex flex-col items-center justify-around">
            <img
              class="h-24"
              :src="icon(weather.current.weather[0].icon)"
              alt="icon"
            />
            <div class="text-lg font-medium">
              {{ Math.round(weather.daily[0].temp.min * 10) / 10 }}&deg; -
              {{ Math.round(weather.daily[0].temp.max * 10) / 10 }}&deg;
            </div>
          </div>
        </div>

        <hr
          class="mx-4 my-5 bg-gray-100 opacity-50 -z-10 sm:mx-10 md:mx-20 lg:mx-32"
        />
        <div class="flex items-center justify-around text-sm font-medium">
          <div class="inline-flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline h-5 stroke-current"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r="4" />
              <path
                d="M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7M17.7 17.7l.7 .7M6.3 17.7l-.7 .7"
              />
            </svg>
            Sunrise {{ utc_to_time(weather.current.sunrise) }}
          </div>
          <div class="inline-flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline h-5 stroke-current"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#607D8B"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12" />
            </svg>
            Sunset {{ utc_to_time(weather.current.sunset) }}
          </div>
        </div>
        <p class="mt-2 text-lg font-semibold text-center">{{ date() }}</p>
      </div>

      <!-- hourly weather forecast -->
      <div
        class="flex items-center h-32 gap-4 mt-5 overflow-scroll overflow-y-hidden scrolling-touch whitespace-no-wrap w-100 scrollbar-none"
      >
        <div v-for="(hour, index) in weather.hourly" :key="hour.dt">
          <div
            class="flex flex-col items-center justify-center flex-auto w-24 py-2 bg-yellow-200 bg-opacity-25 rounded-lg fl"
          >
            <img class="h-10" :src="icon(hour.weather[0].icon)" alt="" />
            <div class="text-lg font-bold">
              {{ Math.round(hour.temp * 10) / 10 }}&deg;C
            </div>
            <div
              v-if="index === 0"
              class="px-1 text-xs text-gray-100 uppercase bg-blue-500 rounded-sm"
            >
              NOW
            </div>
            <div v-else>{{ hours(utc_to_hours(hour.dt)) }}</div>
          </div>
        </div>
      </div>

      <hr class="bg-gray-200" />

      <!-- daily weather forecast -->
      <div
        class="flex items-center h-32 gap-4 mt-5 overflow-scroll overflow-y-hidden scrolling-touch whitespace-no-wrap lg:justify-center w-100 scrollbar-none"
      >
        <div v-for="(day, index) in weather.daily" :key="day.dt">
          <div
            class="flex flex-col items-center justify-center flex-auto w-32 py-2 bg-yellow-200 bg-opacity-25 rounded-lg cursor-pointer fl"
          >
            <div class=""></div>
            <img class="h-10" :src="icon(day.weather[0].icon)" alt="" />
            <div class="text-sm font-bold">
              {{ Math.round(day.temp.min * 10) / 10 }}&deg;C -
              {{ Math.round(day.temp.max * 10) / 10 }}&deg;C
            </div>
            <div
              v-if="index === 0"
              class="px-1 text-xs text-gray-100 uppercase bg-blue-500 rounded-sm"
            >
              Today
            </div>
            <div v-else>{{ utc_date(day.dt) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full h-full p-5 pt-20 md:px-16 lg:px-32 bg-warm"
      v-else-if="
        typeof weather.timezone == 'undefined' ||
          typeof weather.timezone == null
      "
    >
      <div class="flex items-center h-full bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar
  },
  props: {},
  data() {
    return {
      title: "Weather",
      apiKey: "5e2611f98d737a1336862f89296f74c1",
      url: "https://api.openweathermap.org/data/2.5/",
      coordinates: {},
      weather: {},
      temperature: false,
      show: true,
      timer: null
    };
  },
  computed: {},
  methods: {
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
  mounted: function() {
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
    };
    const errorCallback = error => console.error(error);

    navigator.geolocation.watchPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 10000
    });
  }
};
</script>
