<template>
  <div class=" w-full px-2 lg:px-10 h-fit ">
    <TabGroup>
      <TabList>
        <div class="flex w-full">
          <div class="flex items-center justify-center">
            {{ $route.meta.title }}
          </div>
          <div class="flex w-full justify-center">
            <div class="rounded-xl bg-white drop-shadow-md py-3 px-4">
              <Tab v-slot="{ selected }">
                <button
                  :class="[
                    selected ? 'border-none bg-secundario text-primario font-semibold' : '',
                    'rounded-lg py-3 px-8',
                  ]" 
                >
                  Catálogos
                </button></Tab
              >
              <Tab v-slot="{ selected }"
                ><button
                  :class="[
                    selected ? 'border-none bg-secundario text-primario font-semibold' : '',
                    'rounded-lg py-3 px-8',
                  ]"
                >
                  Almacén
                </button></Tab
              >
            </div>
          </div>
        </div>
      </TabList>
      <TabPanels class="mt-12 overflow-hidden">
        <TabPanel class="flex w-full h-full"> <Catalogos/> </TabPanel>
        <TabPanel><Almacen /></TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import Catalogos from "@/components/Catalogos.vue";
import Almacen from "@/components/Almacen.vue";
</script>
