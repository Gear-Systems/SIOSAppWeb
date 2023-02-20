<template>
  <div
    class="flex h-full w-full flex-col rounded-md bg-[#F8FAFB] py-6 px-14 shadow-md"
  >
    <Suspense><DespachoTTP /></Suspense>
  </div>
</template>

<script setup>
import {} from "vue";
import DespachoTTP from "./DespachoTTP.vue";

const props = defineProps(["control"]);
</script>
