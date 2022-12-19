<template>
  <div class="flex h-full w-full items-center justify-center">
    <Suspense>
      <ReportesForm />
    </Suspense>
  </div>
</template>

<script setup>
import ReportesForm from "@/components/ReportesForm.vue";
</script>
