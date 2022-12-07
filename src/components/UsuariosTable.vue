<template>
  <div class="flex h-full w-full bg-[#F8FAFB] rounded-lg">
    <div class="relative w-full overflow-x-auto py-6 shadow-md sm:rounded-lg ">
      <div class="flex items-center bg-[#F8FAFB] pb-4 mx-16">
        <div class="transition hover:bg-[#90B3F2] py-3 px-3 rounded-full">
          <BoteBasuraIco/>
        </div>
        <Menu as="div" class="relative ml-8 inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
              Todos
              <ChevronDownIcon class="ml-2 -mr-1 h-5 w-5 text-gray-500 hover:text-gray-400" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
              class="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="">
                <MenuItem v-slot="{ active }">
                <button :class="[
                  active ? '' : '',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100',
                ]">
                  Desactivar
                </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button :class="[
                  active ? '' : '',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100',
                ]">
                  Eliminar
                </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <div class="flex basis-1/2 justify-between px-6 pr-28">
          <label for="table-search" class="sr-only">Search</label>
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
            <input type="text" id="table-search-users"
              class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Buscar usuario" />
          </div>
        </div>
      </div>

      <div class="flex bg-[#F8FAFB] justify-center">
        <table class="mx-14 mt-20 text-left  text-sm text-gray-500 dark:text-gray-400">
          <tbody>
            <tr v-for="usuario in handlePagination().paginatedData.value"
              class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-search-1" type="checkbox"
                    class="h-4 w-4 ml-4 rounded border-black bg-white-200 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600" />
                  <label for="checkbox-table-search-1" class="sr-only bg-red-300">checkbox</label>
                </div>
              </td>
              <th scope="row" class="flex items-center whitespace-nowrap py-4 px-14 text-gray-900 dark:text-white">
                <div class="pl-3">
                  <div class="text-base font-semibold">{{ usuario.name }}</div>
                  <div class="font-normal text-black-400">
                    {{ usuario.email }}
                  </div>
                </div>
              </th>
              <td class="py-4 px-10">{{ usuario.rol }}</td>
              <td class="py-4 px-12">Usuario</td>
              <td class="py-4 px-6">
                <div class="flex items-center text-black">
                  <div :class="[
                    'mr-4 h-3 w-3 rounded-full',
                    usuario.disabled ? 'bg-red-400' : 'bg-green-400',
                  ]"></div>
                  {{ usuario.disabled ? "Deshabilitado" : "Activo" }}
                </div>
              </td>
              <td class="py-7 px-7">
                <EditarIco class=" transition hover:bg-[#90B3F2] rounded-full"/>
              </td>
              <td class="py-4 px-6">
                <BoteBasuraIco />
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <div class="flex w-full justify-end pr-10">
        <button @click="handlePagination().backPage" class="border bg-gray-100 py-1 px-3 hover:bg-gray-50">
          Prev
        </button>
        <button class="border bg-gray-100 py-1 px-3 hover:bg-gray-50"
          v-for="item in Math.ceil(usuarios.length / perPage)" :key="item"
          @click="() => handlePagination().goToPage(item)">
          {{ item }}
        </button>
        <button @click="handlePagination().nextPage" class="border bg-gray-100 py-1 px-3 hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  getDatabase,
  ref as refDB,
  onChildChanged,
  onChildAdded,
  onChildRemoved,
} from "firebase/database";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/vue";
import { ChevronDownIcon, CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import EditarIco from "./iconos/EditarIco.vue";
import BoteBasuraIco from "./iconos/BoteBasuraIco.vue";

const db = getDatabase();
const usuariosDB = refDB(db, "usuarios");
const roleSearch = ref([]);
const roles = ref([
  { name: "Administrador" },
  { name: "Despacho" },
  { name: "Supervisor" },
  { name: "Técnico" },
]);
const usuarios = ref([]);
const page = ref(1);
const perPage = 10;

// Actualizar información de usuario
const updateTable = (data) => {
  let index = usuarios.value.findIndex((element, index) => {
    if (element.key === data.key) {
      return true;
    }
  });
  usuarios.value[index] = {
    key: data.key,
    name: data.val().displayName,
    email: data.val().email,
    disabled: data.val().disabled,
    rol: data.val().rol,
  };
};

// crear tabla y observar si se agrega un nuevo usuario
const updateTableNewUser = async (data) => {
  let objectDataSnapshot = new Object();
  let exist =
    usuarios.value.findIndex((element) => element.key === data.key) != -1
      ? true
      : false;

  if (!exist) {
    objectDataSnapshot = {
      key: data.key,
      name: data.val().displayName,
      email: data.val().email,
      disabled: data.val().disabled,
      rol: data.val().rol,
    };
    usuarios.value.push(objectDataSnapshot);
    await handlePagination();
  }
};

// Actualizar tabla cuando se borra un usuario
const deleteUser = (data) => {
  let index = usuarios.value.findIndex((element, index) => {
    if (element.key === data.key) {
      return true;
    }
  });
  usuarios.value.splice(index, 1);
};

// observador de datos de usaurios (tiempo real)
onChildChanged(usuariosDB, (snapshot) => {
  const data = snapshot;
  updateTable(data);
});

// observador si se crea un nuevo usuario (tiempo real)
await onChildAdded(usuariosDB, (snapshot) => {
  const data = snapshot;
  // console.log(snapshot.val())
  updateTableNewUser(data);
});

// Observador si se elimina un usuario (tiempo real)
onChildRemoved(usuariosDB, (snapshot) => {
  const data = snapshot;
  deleteUser(data);
});

// control paginación

function handlePagination() {
  const paginatedData = computed(() =>
    usuarios.value.slice((page.value - 1) * perPage, page.value * perPage)
  );

  const nextPage = () => {
    if (page.value !== Math.ceil(usuarios.value.length / perPage)) {
      page.value += 1;
    }
  };

  const backPage = () => {
    if (page.value !== 1) {
      page.value -= 1;
    }
  };

  const goToPage = (numPage) => {
    page.value = numPage;
  };

  return {
    paginatedData,
    perPage,
    page,
    nextPage,
    backPage,
    goToPage,
  };
}

</script>
