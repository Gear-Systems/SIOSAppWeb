<template>
  <div class="h-full w-full">
    <Suspense>
      <MantenimientoCorrectivoComponent />
    </Suspense>
  </div>
</template>

<script setup>
import MantenimientoCorrectivoComponent from "@/components/mantenimiento/correctivo/ManteniminetoCorrectivoComponent.vue";
</script>
