<template>
  <div class="relative flex h-full w-full flex-col overflow-hidden p-8">
    <!-- regresar a consultar folio -->
    <div class="inline-block">
      <button
        @click="$router.push({ name: 'consultarFolios' })"
        type="button"
        class="flex flex-row flex-nowrap items-center rounded-md border-[1px] border-gray-200 p-2 shadow-sm hover:ring-1 hover:ring-primario"
      >
        <ChevronLeftIcon class="mr-1 h-5 w-5" />
        Consulta de folios
      </button>
    </div>
    <!-- Contenedor -->
    <div class="mt-2 flex h-full flex-row p-4">
      <!-- información folios / notas -->
      <div class="min-w-[20%] max-w-[20%]">
        <div class="flex flex-col space-y-2">
          <div class="flex items-center">
            <!-- titulo -->
            <h1 class="select-none font-semibold">Folio Correctivo</h1>
            <!-- <MenuFolios /> -->
            <Suspense>
              <ModalEdicionFolio />
            </Suspense>
          </div>
          <!-- tipo de folio -->
          <div class="flex w-[90%] select-none">
            Tipo:
            <span class="pl-5 font-semibold">{{ foliosData.tipoFolio }}</span>
          </div>
          <!-- Número de folio -->
          <div class="flex w-[50%] flex-col lg:w-[90%]">
            <span class="text-sm text-gray-500">Número de folio:</span>
            <div
              class="mt-2 flex w-[100%] items-center justify-center rounded-lg border py-2 tracking-wider"
            >
              {{ foliosData.folio }}
            </div>
          </div>
        </div>
        <div>
          <Notas v-if="!loading && paso >= 2" />
        </div>
      </div>
      <!-- pasos -->
      <div class="flex max-h-[380px] w-full overflow-y-auto overflow-x-hidden">
        <MantenimientoCorrectivoPaso1 v-if="!loading && paso == 1" />
        <MantenimientoCorrectivoPaso2 v-if="!loading && paso == 2" />
        <Suspense>
          <MantenimientoCorrectivoPaso3 v-if="!loading && paso == 3" />
        </Suspense>
      </div>
    </div>
    <!-- timeline -->
    <div class="h-[150px] w-full">
      <div class="absolute bottom-0 mb-2 w-full">
        <Timeline :pasoDB="paso" :state="paso" />
      </div>
    </div>
    <ModalEdicionFolio v-if="false" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import Timeline from "@/components/Timeline.vue";
import { useRoute } from "vue-router";
import { useFolios } from "@/store/foliosController";
import { db } from "@/firebase/firebase";
import { ref as refDB, onChildChanged } from "firebase/database";
import MantenimientoCorrectivoPaso1 from "@/components/MantenimientoCorrectivoPaso1.vue";
import MantenimientoCorrectivoPaso2 from "@/components/MantenimientoCorrectivoPaso2.vue";
import { storeToRefs } from "pinia";
import MantenimientoCorrectivoPaso3 from "@/components/MantenimientoCorrectivoPaso3.vue";
import Notas from "@/components/Notas.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { PencilAltIcon } from "@heroicons/vue/solid";
import {
  CogIcon,
  ClipboardCheckIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/outline";
import ModalEdicionFolio from "@/components/ModalEdicionFolio.vue";
import MenuFolios from "@/components/MenuFolios.vue";

const loading = ref(true);
const foliosController = useFolios();
const { foliosData, paso } = storeToRefs(foliosController);
const { fetchData } = foliosController;
const route = useRoute();
const correctivoRef = refDB(db, `folios/correctivos/${route.params.id}`);

onBeforeMount(async () => {
  await fetchData(route.params.id, "correctivos").then(() => {
    loading.value = false;
    paso.value = foliosData.value.paso;
  });
});

onChildChanged(correctivoRef, (snapshot) => {
  fetchData(route.params.id, "correctivos");
});
</script>
