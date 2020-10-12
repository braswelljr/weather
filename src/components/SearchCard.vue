<template>
  <div class="fixed z-40 flex items-center justify-center text-5xl bg-gray-700">
    {{ query }}
  </div>
</template>
<script>
export default {
  props: {
    query: String
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
