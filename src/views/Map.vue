<template>
  <div class="w-screen h-screen antialiased text-gray-200 bg-green-800">
    <div
      class="z-10 min-w-full min-h-full p-5 pt-24 bg-fixed md:px-16 lg:px-32"
      v-if="typeof weather.timezone != 'undefined'"
      :class="
        weather.current.temp < 18
          ? ' bg-green-400 text-gray-800'
          : ' bg-gray-900 text-gray-200'
      "
    >
      <h1 class="text-3xl font-semibold text-center uppercase">Map</h1>
    </div>
    <div
      class="w-full h-full p-5 pt-20 bg-gray-900 md:px-16 lg:px-32"
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
  }
};
</script>
