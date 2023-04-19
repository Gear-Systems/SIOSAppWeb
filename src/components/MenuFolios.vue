<template>
  <div class="flex">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <CogIcon class="h-5 w-5 cursor-pointer text-black" />HOLA
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
          class="absolute left-0 z-50 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="editarFolio = true"
                class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-blue-100"
              >
                <PencilAltIcon
                  class="mr-2 h-5 w-5 text-black"
                  aria-hidden="true"
                />
                Editar folio
              </button>
            </MenuItem>
            <MenuItem
              v-slot="{ active }"
              v-if="paso == 2 && !foliosData.asignado"
            >
              <button
                class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-blue-100"
              >
                <ClipboardCheckIcon
                  class="mr-2 h-5 w-5 text-black"
                  aria-hidden="true"
                />
                Asignar folio a técnico
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import { PencilAltIcon, ClipboardCheckIcon } from "@heroicons/vue/solid"
import { CogIcon } from "@heroicons/vue/outline"
import { useFolios } from "@/store/foliosController";
import { storeToRefs } from "pinia";

const foliosController = useFolios();
const { editarFolio } = storeToRefs(foliosController);
</script>
