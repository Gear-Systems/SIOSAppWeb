<template>
  <div class="flex h-full w-full flex-col rounded-md bg-[#F8FAFB] py-6 px-2 lg:px-14 shadow-md">
    <div>
      <TabGroup>
        <TabList>
          <div class="flex w-full border-b border-[#7C8495]">
            <div class="flex w-full select-none justify-start">
              <div class="mb-[2px]">
                <Tab v-slot="{ selected }">
                  <button
                    :class="[
                      selected ? 'font-semibold text-primario' : 'text-black',
                      '-mb-0.5 rounded-md px-14 py-2 hover:bg-[#E9F0FC]',
                    ]"
                  >
                    Distritos/Clusters
                  </button></Tab
                >
                <Tab v-slot="{ selected }"
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
            ><Suspense><DistritosClusters /></Suspense
          ></TabPanel>
          <TabPanel
            ><Suspense><RelacionDistritosClusters /></Suspense
          ></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import DistritosClusters from "./DistritosClusters.vue";
import RelacionDistritosClusters from "./RelacionDistritosClusters.vue";
</script>
