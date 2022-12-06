<template>
  <div class="flex h-full w-full flex-col">
    <!-- Table -->
    <div class="">
      <Suspense>
        <ConsultarFoliosTable />
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ConsultarFoliosTable from "@/components/ConsultarFoliosTable.vue";
import { db } from "@/firebase/firebase";
import { ref as refDB, get } from "firebase/database";

const filtroAvanzado = ref(false);
const tipoFolio = ref([]);

onMounted(() => {
  get(refDB(db, `catalogo/tipoFolios`)).then((snapshot) => {
    snapshot.forEach((element) => {
      console.log(element.val());
    })
  })
})

</script>
