<template>
  <div>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center rounded-md p-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
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
          class="absolute right-0 z-50 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="isOpen = true"
                :class="[
                  active ? 'bg-[#E9F0FC] text-primario' : 'text-black',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <EditarIco class="mr-2 h-6 w-5" aria-hidden="true" :colors="active ? '#2166E5' : '#101D2D'"  /> 
                Editar
              </button>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="eliminar"
                :class="[
                  active ? 'bg-[#E9F0FC] text-primario' : 'text-black',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <BoteBasuraIco class="mr-2 h-5 w-5" aria-hidden="true" :colors="active ? '#2166E5' : '#101D2D'" />
                Eliminar
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <FoliosEdit
      :isOpen="isOpen"
      :data="props.data"
      @closeModal="isOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  DotsVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/outline";
import { ref as refDB, remove } from "firebase/database";
import FoliosEdit from "./FoliosEdit.vue";
import { db } from "@/firebase/firebase";
import EditarIco from "./iconos/EditarIco.vue";
import BoteBasuraIco from "./iconos/BoteBasuraIco.vue";

const props = defineProps(["data"]);
const isOpen = ref(false);

const eliminar = async () => {
  await remove(
    refDB(
      db,
      `catalogo/tipoFolios/${props.data.tipo.toLowerCase()}/${props.data.nombre}`
    )
  );
};
</script>
