<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="flex justify-center rounded-lg bg-primario px-8 py-1.5 text-white"
      >
        <PlusCircleIcon class="h-5 w-5" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="$store.commit('abrirModalCorrectivo')"
              :class="[
                active ? 'bg-secundario text-primario' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
            >
              <FoliosCorrectivos
                :color="active ? '#2166E5' : '#101010'"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Capturar folio correctivo
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
            @click="$store.commit('abrirModalPreventivo')"
              :class="[
                active ? 'bg-secundario text-primario' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
            >
              <FoliosPreventivos
                :color="active ? '#2166E5' : '#101010'"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Capturar folio preventivo
            </button>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <button
              @click="$router.push('/consultar-folios')"
              :class="[
                active ? 'bg-secundario text-primario' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
            >
              <ConsultarFolioIco
                :color="active ? '#2166E5' : '#101010'"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Consultar folios
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-secundario text-primario' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
            >
              <ReportesIco
                :color="active ? '#2166E5' : '#101010'"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Generar reporte
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
    <Suspense>
      <ModalDatosCorrectivo v-if="$store.state.a.modalCorrectivo" />
    </Suspense>
    <Suspense>
      <ModalDatosPreventivo />
    </Suspense>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { PlusCircleIcon } from "@heroicons/vue/outline";
import ConsultarFolioIco from "./iconos/ConsultarFolioIco.vue";
import FoliosCorrectivos from "./iconos/FoliosCorrectivos.vue";
import FoliosPreventivos from "./iconos/FoliosPreventivos.vue";
import ReportesIco from "./iconos/ReportesIco.vue";
import ModalDatosCorrectivo from "@/views/Correctivo/ModalDatosCorrectivo.vue";
import ModalDatosPreventivo from "@/views/Preventivo/ModalDatosPreventivo.vue";
</script>
