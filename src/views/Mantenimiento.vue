<template>
  <div class="w-full px-6">
    <div
      @click="$router.push({ name: 'consultarFolios' })"
      class="flex cursor-pointer items-center space-x-2"
    >
      <ChevronLeftIcon class="h-5 w-5" />
      <p>Consulta de folios</p>
    </div>
    <div class="mt-4">
      <FormularioMantenimiento />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FormularioMantenimiento from "@/components/FormularioMantenimiento.vue";
import { ChevronLeftIcon } from "@heroicons/vue/outline";
</script>
