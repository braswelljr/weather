<template>
  <div id="nav">
    <!--    <router-link to="/">Home</router-link> |-->
    <!--    <router-link to="/about">About</router-link>-->
    <!-- buttons -->
    <div
      class="fixed inset-x-0 bottom-0 top-auto inline-flex items-center justify-center text-gray-200 bg-transparent"
    >
      <router-link to="/">
        <button
          type="button"
          v-if="menu"
          class="w-12 h-12 mx-auto mb-5 transition-all duration-200 bg-gray-800 border-none rounded-full outline-none mx-autoinline-flex focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 mx-auto transition-all duration-200 fill-current"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
        </button>
      </router-link>
      <button
        type="button"
        @click="menu = !menu"
        class="w-12 h-12 mx-auto mb-5 transition-all duration-200 bg-gray-800 border-none rounded-full outline-none mx-autoinline-flex focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          v-if="!menu"
          class="h-10 mx-auto transition-all duration-200 fill-current"
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
          class="h-10 mx-auto transition-all duration-200 fill-current"
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
      <router-link to="/about"
        ><button
          type="button"
          v-if="menu"
          class="w-12 h-12 mx-auto mb-5 transition-all duration-200 bg-gray-800 border-none rounded-full outline-none mx-autoinline-flex focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 mx-auto transition-all duration-200 fill-current"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </router-link>
    </div>
  </div>
  <router-view />
</template>
<script>
export default {
  name: "App",
  components: {},
  props: {},
  data() {
    return {
      menu: false
    };
  }
};
</script>

<style src="./assets/build/tailwind.css"></style>
