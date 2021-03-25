<template>
  <div id="app" class="w-full h-screen antialiased text-gray-800 bg-gray-200">
    <div
      class="z-10 min-w-full min-h-full p-5 pt-24 bg-fixed md:px-16 lg:px-32"
      v-if="typeof weather.timezone != 'undefined'"
      :class="
        weather.current.temp < 18
          ? 'bg-gradient-to-r from-blue-700 to-blue-300 text-gray-900 animate-move'
          : 'bg-gradient-to-bl from-red-700 to-red-300 text-gray-900 animate-move'
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

      <!-- hourly modules forecast -->
      <div class="flex items-center justify-between">
        <div
          class="flex items-center justify-start my-4 overflow-x-scroll overflow-y-hidden whitespace-no-wrap"
        >
          <div
            v-for="(hour, index) in weather.hourly"
            :key="index"
            class="my-2 mr-3"
          >
            <div
              class="w-24 p-1 text-center bg-yellow-200 bg-opacity-25 rounded-lg cursor-pointer"
            >
              <img
                class="h-10 mx-auto"
                :src="icon(hour.weather[0].icon)"
                alt=""
              />
              <div class="text-sm font-bold">
                {{ Math.round(hour.temp * 10) / 10 }}&deg;C
              </div>
              <div
                v-if="index === 0"
                class="px-1 mt-1 text-xs text-gray-100 uppercase bg-blue-500 rounded-sm"
              >
                NOW
              </div>
              <div v-else>{{ hours(utc_to_hours(hour.dt)) }}</div>
            </div>
          </div>
        </div>
      </div>

      <hr class="bg-gray-200" />

      <!-- daily modules forecast -->
      <div class="flex items-center justify-between">
        <div
          class="flex items-center justify-start my-4 overflow-x-scroll overflow-y-hidden whitespace-no-wrap xl:justify-center"
        >
          <div
            v-for="(day, index) in weather.daily"
            :key="day.dt"
            class="my-2 mr-2"
          >
            <div
              class="w-24 p-1 text-center bg-yellow-200 bg-opacity-25 rounded-lg cursor-pointer "
            >
              <img
                class="h-10 mx-auto"
                :src="icon(day.weather[0].icon)"
                alt=""
              />
              <div class="text-sm font-bold">
                {{ Math.round(day.temp.min) }}&deg; -
                {{ Math.round(day.temp.max) }}&deg;
              </div>
              <div
                v-if="index === 0"
                class="px-1 mt-1 text-sm text-gray-100 uppercase bg-blue-500 rounded-sm"
              >
                Today
              </div>
              <div v-else>{{ utc_date(day.dt) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full h-full p-5 pt-20 md:px-16 lg:px-32 bg-gradient-to-bl from-red-700 to-red-300 animate-move"
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
export default {
  name: "Home",
  components: {},
  props: {
    weather: Object,
    timer: String
  },
  data() {
    return {
      temperature: false,
      show: true
    };
  },
  computed() {},
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
    utc_to_time(time) {
      return new Date(time * 1000).toUTCString().slice(-11, -4);
    },
    utc_to_hours(time) {
      return new Date(time * 1000).toUTCString().slice(-12, -10);
    },
    hours(hour) {
      let ampm = "am";
      if (hour >= 12) ampm = "pm";
      if (hour > 12) hour = hour - 12;
      if (hour == 0) hour = 12;
      return `${hour} ${ampm}`;
    },
    utc_date(time) {
      return new Date(time * 1000).toUTCString().slice(-24, -18);
    }
  },
  mounted() {}
};
</script>
