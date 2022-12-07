<template>
  <div class="flex h-full w-full flex-col rounded-lg h-10">
    <div>
      <TabGroup>
        <TabList>
          <div class="flex rounded-lg shadow-md bg-[#F8FAFB] flex w-full justify-start select-none">

              <div class="flex w-full space-x-8 ml-28 p-4">

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

                <div class="w-full justify-end">
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
          <TabPanel>Content 2</TabPanel>
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

const isOpen = ref(false);
</script>
