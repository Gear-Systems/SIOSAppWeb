<template>
  <div class="flex w-full flex-col rounded-lg h-10">
    <div>
      <TabGroup>
        <TabList>
          <div class="rounded-lg shadow-md bg-[#F8FAFB] flex w-full justify-start select-none">

              <div class="flex w-full space-x-8 ml-28 p-4">
                <div class="flex w-full border-b-2 border-gray-300">
                <Tab v-slot="{ selected }">
                  <button :class="[
                    selected
                      ? 'font-semibold text-[#2166E5]'
                      : 'text-black',
                    'hover:bg-[#E9F0FC] py-2 px-10 rounded-md',
                  ]">
                    Usuarios
                  </button>
                </Tab>

                <Tab v-slot="{ selected }"><button :class="[
                  selected
                    ? 'font-semibold text-[#2166E5]'
                    : 'text-black',
                  'hover:bg-[#E9F0FC] py-2 px-10 rounded-md',
                ]">
                    Superv.TTP
                  </button>
                </Tab>
              </div>
                <div class="w-full flex pr-12 justify-end">
                  <button @click="isOpen = true" class="flex transition-opacity justify-end w-auto hover:opacity-50 rounded-lg bg-[#2166E5] py-3 px-8 text-sm text-white">
                    <span class="mr-2"><AgregarIco/></span>Nuevo usuario
                  </button>
                </div>

              </div>

          </div>
        </TabList>

        <!-- Tabla -->

        <TabPanels class="mt-6">
          <TabPanel class="flex h-full w-full">
            <Suspense>
              <UsuariosTable />
            </Suspense>
          </TabPanel>
          <TabPanel><Suspense><CatalogoSupervisoresTTP /></Suspense></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    <UsuariosModalAgregar :isOpen="isOpen" @closeModal="isOpen = false" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import UsuariosTable from "@/components/UsuariosTable.vue";
import UsuariosModalAgregar from "@/components/UsuariosModalAgregar.vue";
import AgregarIco from "@/components/iconos/AgregarIco.vue"
import CatalogoSupervisoresTTP from "./CatalogoSupervisoresTTP.vue";

const isOpen = ref(false);
</script>
