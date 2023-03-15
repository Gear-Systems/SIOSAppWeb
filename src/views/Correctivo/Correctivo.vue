<template>
  <div class="w-full h-full">
    <Suspense>
      <CorrectivoComponent />
    </Suspense>
  </div>
</template>

<script setup>
import CorrectivoComponent from "@/components/CorrectivoComponent.vue";
</script>
