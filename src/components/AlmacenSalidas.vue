
<!-------------------------- Contenido de la opción Salidas ------------------------>

<template>
  <div class="h-full w-full">
    <div class="flex w-full flex-col space-y-4">
      <div class="min-h-[400px] w-full bg-[#F8FAFB] py-3 px-2 lg:px-28 shadow-md">

        <!-- Submenu salidas e hisorico -->

        <TabGroup>
          <TabList class="border-b-2">
            <div class="flex w-full space-x-4">

              <!-- Botón Salidas -->

              <Tab v-slot="{ selected }">
                <button :class="[
                  'px-14 py-2',
                  selected ? 'font-semibold text-primario' : '',
                ]">
                  Salidas
                </button>
              </Tab>

              <!-- Botón Historico -->

              <Tab v-slot="{ selected }">
                <button
                  :class="[
                    'px-14 py-2',
                    selected ? 'font-semibold text-primario' : '',
                  ]"
                >
                  Histórico
                </button>
              </Tab>

            </div>
          </TabList>

          <!-- Contenido de la tabla -->

          <TabPanels class="mt-12">

            <!-- Vista para sacar materiales -->

            <TabPanel class="flex w-full">
              <Salidas />
            </TabPanel>

            <!-- Vista de la tabla con el historial de archivos -->

            <TabPanel>
              <AlmacenSalidasHistorico/>
            </TabPanel>
          </TabPanels>

        </TabGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import Salidas from "./Salidas.vue";

import AlmacenSalidasHistorico from "./AlmacenSalidasHistorico.vue";
</script>
