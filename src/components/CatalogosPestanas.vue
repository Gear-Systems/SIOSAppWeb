<template>
  <div
    class="flex h-full w-full flex-col rounded-md bg-[#F8FAFB] py-6 px-14 shadow-md"
  >
    <TabGroup :selectedIndex="props.control">
      <TabList>
        <div class="flex w-full border-b border-[#7C8495]">
          <div class="flex w-full select-none justify-start">
            <div class="mb-[2px]">
              <Tab v-slot="{ selected }"
                ><button
                  :class="[
                    selected ? 'font-semibold text-primario' : 'text-black',
                    '-mb-0.5 rounded-md px-14 py-2 hover:bg-[#E9F0FC]',
                  ]"
                >
                  Folios
                </button></Tab
              >
              <Tab v-slot="{ selected }">
                <button
                  :class="[
                    selected ? 'font-semibold text-primario' : 'text-black',
                    '-mb-0.5 rounded-md px-14 py-2 hover:bg-[#E9F0FC]',
                  ]"
                >
                  Fallas
                </button></Tab
              >
              <Tab v-slot="{ selected }"
                ><button
                  :class="[
                    selected ? 'font-semibold text-primario' : 'text-black',
                    '-mb-0.5 rounded-md px-14 py-2 hover:bg-[#E9F0FC]',
                  ]"
                >
                  Causas
                </button></Tab
              >

              <Tab v-if="false" v-slot="{ selected }"
                ><button
                  :class="[
                    selected ? 'font-semibold text-primario' : 'text-black',
                    '-mb-0.5 rounded-md px-14 py-2 hover:bg-[#E9F0FC]',
                  ]"
                >
                  Relaciones
                </button></Tab
              >
            </div>
          </div>
        </div>
      </TabList>
      <TabPanels class="mt-6">
        <TabPanel class="flex h-full w-full"
          ><Suspense><CatalogosFolios /></Suspense
        ></TabPanel>
        <TabPanel>
          <Suspense><CatalogosFallas /></Suspense>
        </TabPanel>
        <TabPanel
          ><Suspense> <CatalogosCausas /> </Suspense
        ></TabPanel>
        <TabPanel v-if="false"
          ><Suspense><RelacionFallasCausas /></Suspense
        ></TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import {} from "vue";
import CatalogosFallas from "./CatalogosFallas.vue";
import CatalogosCausas from "./CatalogosCausas.vue";
import CatalogosFolios from "./CatalogosFolios.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import RelacionFallasCausas from "./RelacionFallasCausas.vue";

const props = defineProps(["control"]);
</script>
