<template>
  <div
    class="fixed inset-x-0 top-0 z-20 flex items-start justify-between gap-16 px-2 py-2 pt-3 bg-gray-800 rounded-lg md:px-8 lg:px-16"
    :class="open ? 'h-full' : 'mx-2 mt-2 md:mx-8 lg:mx-16'"
  >
    <div class="text-gray-400">
      <a class="inline-flex items-center justify-center gap-4 cursor-pointer">
        <h1 class="text-3xl font-bold uppercase font-">{{ title }}</h1>
      </a>
    </div>
    <div class="flex items-center justify-end w-full sm:justify-between">
      <div
        class="absolute z-10 inline-flex items-center justify-end w-full transition-all duration-200 sm:w-full sm:justify-center"
        :class="
          open
            ? 'fixed inset-x-0 px-5 py-4 top-0 md:px-20 lg:px-40 bg-gray-500 bg-opacity-75 sm:16'
            : 'relative'
        "
      >
        <input
          type="text"
          name="search"
          :class="open ? 'inline-block' : 'hidden'"
          class="w-full h-10 px-4 py-2 mx-0 text-lg font-semibold text-current placeholder-current border border-gray-500 rounded-md outline-none sm:inline-block focus:outline-none"
          placeholder="SEARCH CITY"
          autocomplete="off"
        />
        <button
          type="button"
          :class="open ? '-ml-8 text-current' : 'text-gray-400 mt-1'"
          class="inline-block px-1 mt-2 border-none outline-none sm:mt-1 sm:text-current sm:-ml-8 focus:outline-none active:border-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="h-6 stroke-current"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button
          type="button"
          @click="open = !open"
          v-if="open"
          class="ml-2 font-bold bg-transparent border-none outline-none focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="open = !open"
          tabindex="-1"
          :class="open ? 'hidden' : ''"
          class="absolute inset-0 z-10 block w-6 ml-auto bg-transparent border-none outline-none sm:w-full focus:outline-none"
        ></button>
      </div>
      <button
        type="button"
        @click="open = !open"
        tabindex="-1"
        v-if="open"
        class="absolute inset-0 z-auto w-full h-full bg-gray-400 bg-opacity-50"
      ></button>
      <search-card :query="query" />
    </div>
  </div>
</template>

<script>
import SearchCard from "@/components/SearchCard.vue";

export default {
  components: {
    SearchCard
  },
  props: {
    title: String,
    apiKey: String,
    url: String
  },
  data() {
    return {
      open: false,
      query: ""
    };
  }
  /**
  # todos
  # loading when typing
  */
};
</script>
