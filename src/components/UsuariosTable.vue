<template>
  <div class="flex h-full w-full rounded-lg bg-[#F8FAFB] pb-12">
    <div class="mt-6 w-full shadow-md sm:rounded-lg">
      <!-- Filtro -->
      <div
        class="mx-16 flex items-center border-b-2 border-gray-300 bg-[#F8FAFB]"
      >
        <div
          v-if="false"
          class="rounded-full py-3 px-3 transition hover:bg-[#90B3F2]"
        >
          <BoteBasuraIco />
        </div>
        <Listbox v-model="selectedFiltro">
          <div class="relative mt-1">
            <ListboxButton
              class="relative w-36 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm placeholder:text-black focus:border-blue-500 focus:ring-blue-500"
            >
              <span class="block w-fit truncate">{{
                selectedFiltro.name
              }}</span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <ChevronDownIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute mt-1 max-h-60 w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="filtro in filtros"
                  :key="filtro.name"
                  :value="filtro"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'bg-[#E9F0FC] text-primario' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ filtro.name }}</span
                    >
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-primario"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        <div class="flex basis-1/2 justify-between px-6 pr-28">
          <label for="table-search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <svg
                class="h-5 w-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm placeholder:text-black focus:border-blue-500 focus:ring-blue-500"
              placeholder="Buscar usuario"
            />
          </div>
        </div>
      </div>
      <!-- Tabla -->
      <div class="flex min-h-[200px] justify-center bg-[#F8FAFB]">
        <table
          class="mx-14 mt-8 h-fit text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <tbody>
            <tr
              v-for="usuario in handlePagination().paginatedData.value"
              class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td v-if="false" class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="bg-white-200 ml-4 h-4 w-4 rounded border-black text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="checkbox-table-search-1"
                    class="sr-only bg-red-300"
                    >checkbox</label
                  >
                </div>
              </td>
              <th
                scope="row"
                class="flex items-center whitespace-nowrap py-4 px-14 text-gray-900 dark:text-white"
              >
                <div class="pl-3">
                  <div class="text-base font-semibold">{{ usuario.name }}</div>
                  <div class="text-black-400 font-normal">
                    {{ usuario.email }}
                  </div>
                </div>
              </th>
              <td class="py-4 px-10">{{ usuario.rol }}</td>
              <td class="py-4 px-12">
                {{
                  `${new Date(usuario.created).getDate()}/${new Date(
                    usuario.created
                  ).getMonth()}/${new Date(usuario.created).getFullYear()}`
                }}
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center text-black">
                  <div
                    :class="[
                      'mr-4 h-3 w-3 rounded-full',
                      usuario.disabled ? 'bg-red-400' : 'bg-green-400',
                    ]"
                  ></div>
                  {{ usuario.disabled ? "Deshabilitado" : "Activo" }}
                </div>
              </td>
              <td class="px-7">
                <div
                  @click="abrirEditar(usuario)"
                  class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#90B3F2]"
                >
                  <EditarIco />
                </div>
              </td>
              <td class="py-4 px-6">
                <div
                  @click="controlUsuario(usuario.key, usuario.disabled)"
                  class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#90B3F2]"
                >
                  <BoteBasuraIco />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex w-full justify-end pr-10">
        <button
          @click="handlePagination().backPage"
          class="border bg-gray-100 py-1 px-3 hover:bg-gray-50"
        >
          Prev
        </button>
        <button
          class="border bg-gray-100 py-1 px-3 hover:bg-gray-50"
          v-for="item in Math.ceil(usuarios.length / perPage)"
          :key="item"
          @click="() => handlePagination().goToPage(item)"
        >
          {{ item }}
        </button>
        <button
          @click="handlePagination().nextPage"
          class="border bg-gray-100 py-1 px-3 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
    <EditarUsuario
    v-if="usuarioData && openEditar"
      :data="usuarioData"
      :openEditar="openEditar"
      @closeModalEditar="openEditar = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {
  getDatabase,
  ref as refDB,
  onChildChanged,
  onChildAdded,
  onChildRemoved,
} from "firebase/database";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ChevronDownIcon, CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import EditarIco from "./iconos/EditarIco.vue";
import BoteBasuraIco from "./iconos/BoteBasuraIco.vue";
import { auth, functions } from "@/firebase/firebase";
import { httpsCallable } from "firebase/functions";
import EditarUsuario from "./EditarUsuario.vue";

const db = getDatabase();

const functionsFirebase = {
  disable: httpsCallable(functions, "disableUser"),
  enable: httpsCallable(functions, "enableUser"),
};
const usuariosDB = refDB(db, "usuarios");
const openEditar = ref(false);
const usuarios = ref([]);
const usuariosFilter = ref([]);
const usuarioData = ref();
const page = ref(1);
const perPage = 10;
// const rol = ref();

const filtros = [
  { name: "Todos" },
  { name: "Administrador" },
  { name: "Despacho" },
  { name: "Supervisor" },
  { name: "Técnico" },
  { name: "Usuario activo" },
  { name: "Usuario inactivo" },
];

const selectedFiltro = ref(filtros[0]);

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
    created: data.val().created,
  };
};

// auth.onAuthStateChanged((user) => {
//   if(user) {
//     user.getIdTokenResult().then(tokenResult => {
//       rol.value = tokenResult.claims.name
//     })
//   }
// })

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
      created: data.val().created,
    };
    usuarios.value.push(objectDataSnapshot);
    usuariosFilter.value = usuarios.value;
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
    usuariosFilter.value.slice((page.value - 1) * perPage, page.value * perPage)
  );

  const nextPage = () => {
    if (page.value !== Math.ceil(usuariosFilter.value.length / perPage)) {
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

watch(selectedFiltro, (value) => {
  console.log(value);
  switch (value.name) {
    case "Todos":
      usuariosFilter.value = usuarios.value;
      break;
    case "Usuario activo":
      usuariosFilter.value = usuarios.value.filter((element) => {
        if (!element.disabled === true) return element;
      });
      break;
    case "Usuario inactivo":
      usuariosFilter.value = usuarios.value.filter((element) => {
        if (element.disabled) return element;
      });
      break;
    default:
      usuariosFilter.value = usuarios.value.filter((element) =>
        element.rol.includes(value.name)
      );
      break;
  }
});

const controlUsuario = async (uid, isDisable) => {
  if (isDisable) {
    await functionsFirebase
      .enable(uid)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    await functionsFirebase
      .disable(uid)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const abrirEditar = (usuario) => {
  usuarioData.value = usuario;
  openEditar.value = true;
}
</script>
