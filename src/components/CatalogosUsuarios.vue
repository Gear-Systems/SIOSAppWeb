<template>
  <div class="flex w-full flex-col rounded-lg pb-1">
    <div>
      <TabGroup>
        <TabList>
          <div
            class="flex w-full select-none justify-start rounded-lg bg-[#F8FAFB] shadow-md"
          >
            <div class="lg:ml-28 flex w-full space-x-8 p-2 lg:p-4">
              <div class="flex w-full border-b-2 border-gray-300">
                <Tab v-slot="{ selected }">
                  <button
                    :class="[
                      selected ? 'font-semibold text-[#2166E5]' : 'text-black',
                      'rounded-md py-2 px-10 hover:bg-[#E9F0FC]',
                    ]"
                  >
                    Usuarios
                  </button>
                </Tab>

                <Tab v-slot="{ selected }"
                  ><button
                    :class="[
                      selected ? 'font-semibold text-[#2166E5]' : 'text-black',
                      'rounded-md py-2 px-10 hover:bg-[#E9F0FC]',
                    ]"
                  >
                    Superv.TTP
                  </button>
                </Tab>
              </div>
              <div class="flex w-full justify-end lg:pr-12">
                <button
                  @click="isOpen = true"
                  class="flex w-auto justify-around items-center rounded-lg bg-[#2166E5] px-4 lg:py-3 lg:px-8 text-sm text-white transition-opacity hover:opacity-50"
                >
                  <span class="lg:mr-2"><AgregarIco /></span>Nuevo usuario
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
          <TabPanel
            ><Suspense><CatalogoSupervisoresTTP /></Suspense
          ></TabPanel>
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
import AgregarIco from "@/components/iconos/AgregarIco.vue";
import CatalogoSupervisoresTTP from "./CatalogoSupervisoresTTP.vue";

const isOpen = ref(false);
</script>
