<template>
  <div
    class="absolute z-20 flex flex-col items-center justify-center p-5 mx-5 rounded-md sm:w-80 md:mx-24 lg:mx-40"
    v-if="typeof weather.name != 'undefined'"
    :class="
      weather.main.temp < 18
        ? 'bg-gradient-to-r from-blue-700 to-blue-300 text-gray-900 animate-move'
        : 'bg-gradient-to-bl from-red-700 to-red-300 text-gray-900 animate-move'
    "
  >
    <span
      class="w-20 h-auto p-1 mx-auto text-sm font-medium text-center text-current uppercase bg-blue-100 bg-opacity-25 border-none rounded-sm"
      >{{ weather.weather[0].main }}</span
    >
    <div class="flex items-center justify-around">
      <div class="p-0">
        <div class="p-0 text-current">
          <p class="p-0 font-medium text-center">
            <span class="text-6xl">
              {{ Math.round(weather.main.temp * 10) / 10 }}
            </span>
            <span class="text-lg">&deg;C</span>
          </p>
        </div>
        <div class="text-lg font-medium">
          Feels like
          {{ Math.round(weather.main.feels_like * 10) / 10 }}&deg;
        </div>
      </div>
      <div class="flex flex-col items-center justify-around">
        <img class="h-24" :src="icon(weather.weather[0].icon)" alt="icon" />
        <div class="text-lg font-medium">
          Average
          {{
            (Math.round(weather.main.temp_min * 10) / 10 +
              Math.round(weather.main.temp_max * 10) / 10) /
              2
          }}&deg;
        </div>
      </div>
    </div>
    <hr class="z-40 mx-2 my-3 bg-gray-100" />
    <span class="text-3xl font-bold uppercase"
      >{{ weather.name }}, {{ weather.sys.country }}</span
    >
    <div class="flex items-center justify-between mt-4 text-sm font-semibold">
      <div class="">
        <div class="">lat : {{ weather.coord.lat }}</div>
        <div class="">long : {{ weather.coord.lon }}</div>
      </div>
      <div class="ml-6">
        <div class="">sunrise : {{ utc_to_time(weather.sys.sunrise) }} am</div>
        <div class="">sunset : {{ utc_to_time(weather.sys.sunset) }} pm</div>
      </div>
    </div>
    <div class="mt-4 text-lg italic font-semibold ">
      WIND Speed : {{ weather.wind.speed }} km/h
    </div>
  </div>
  <div
    class="absolute z-20 flex flex-col items-center justify-center p-5 mx-5 italic font-semibold rounded-md sm:w-80 md:mx-24 lg:mx-40 bg-gradient-to-bl from-red-700 to-red-300 animate-move"
    v-else-if="
      typeof weather.timezone == 'undefined' || typeof weather.timezone == null
    "
  >
    Search City or Country
  </div>
</template>
<script>
export default {
  props: {
    weather: Object
  },
  methods: {
    icon(ico) {
      return `https://openweathermap.org/img/wn/${ico}@2x.png`;
    },
    utc_to_time(time) {
      return new Date(time * 1000).toUTCString().slice(-11, -4);
    }
  }
};
</script>
