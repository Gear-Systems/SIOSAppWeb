<template>
  <div class="flex h-full w-full flex-col overflow-hidden">
    <!-- Filtro -->
    <div class="mt-9 flex pl-20">
      <form @submit.prevent="buscar">
        <div class="flex items-end justify-center space-x-4 lg:space-x-8">
          <div>
            <label
              for="folio"
              class="mb-1 block text-xs font-medium text-[#7C8495] dark:text-gray-300"
              >Folio</label
            >
            <input
              v-model="filtro.folio"
              type="text"
              id="folio"
              class="block w-full rounded-lg border border-[#7C8495] bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-[#101010] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Ingresar folio"
            />
          </div>
          <!-- <div>
          <label
            for="tipo"
            class="mb-1 block text-xs font-medium text-[#7C8495] dark:text-gray-300"
            >Tipo</label
          >
          <select
            id="tipo"
            class="block w-full min-w-[80px] rounded-lg border border-[#7C8495] bg-gray-50 p-2.5 text-sm text-[#101010] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          >
            <option selected>OT</option>
          </select>
        </div> -->
          <div>
            <button
              @click="buscar"
              type="submit"
              class="w-full rounded-lg bg-primario px-8 py-3 text-center text-sm font-medium text-white hover:bg-primario/80 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            >
              Buscar
            </button>
          </div>
          <div
            @click="reiniciarFiltro"
            class="flex cursor-pointer items-center justify-center"
          >
            <RefreshIcon class="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        <!-- Filtro estatus -->
        <div></div>
      </form>
    </div>
    <div class="relative mt-8 px-8 pb-8 shadow-md">
      <!-- Control paginación -->
      <div class="flex w-full justify-end">
        <button
          @click="handlePagination().backPage"
          class="border bg-gray-100 py-1 px-3 hover:bg-gray-50"
        >
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          class="border bg-gray-100 py-1 px-3 hover:bg-gray-50"
          v-for="item in Math.ceil(data.length / perPage)"
          :key="item"
          @click="() => handlePagination().goToPage(item)"
        >
          {{ item }}
        </button>
        <button
          @click="handlePagination().nextPage"
          class="border bg-gray-100 py-1 px-3 hover:bg-gray-50"
        >
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div class="overflow-x-auto">
        <table
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <thead
            class="bg-[#F2F2F2] text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="py-3 px-2"></th>
              <th scope="col" class="py-3 px-2"></th>
              <th scope="col" class="py-3 px-6">Folio</th>
              <th scope="col" class="py-3 px-6">Tipo</th>
              <th scope="col" class="py-3 px-6">Ubicación</th>
              <th scope="col" class="py-3 px-6">Detalle</th>
              <th scope="col" class="py-3 px-6">ETA</th>
              <th scope="col" class="py-3 px-6">SLA</th>
              <th scope="col" class="py-3 px-6">Estatus</th>
              <th scope="col" class="py-3 px-6">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in handlePagination().paginatedData.value"
              class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td class="px-2">
                <TableMenu v-if="user.rol === 'Administrador'" :data="item" />
              </td>
              <th
                scope="row"
                :class="[
                  'rounded-l-xl dark:text-white',
                  colorsBG(item.estatusId),
                ]"
              ></th>
              <td class="py-1 px-6 font-semibold">{{ item.folio }}</td>
              <td class="py-1 px-6">{{ item.tipoFolio }}</td>
              <td class="py-1 px-6">
                <div class="font-semibold">{{ item.distrito }}</div>
                <div>{{ item.cluster }}</div>
              </td>
              <td class="py-1 px-6">
                <div v-if="item.horaInicio != undefined ? true : false">
                  <div>
                    {{
                      `${new Date(item.horaInicio).getDate()}/${
                        new Date(item.horaInicio).getMonth() + 1
                      }/${new Date(item.horaInicio).getFullYear()}`
                    }}
                  </div>
                  <div>
                    {{
                      `${new Date(item.horaInicio).getHours()}:${new Date(
                        item.horaInicio
                      ).getMinutes()}`
                    }}
                  </div>
                </div>
              </td>
              <td class="py-1 px-6">{{ item.eta }}</td>
              <td class="py-1 px-6">{{ item.sla }}</td>
              <td
                :class="['py-1 px-6 font-semibold', colorsText(item.estatusId)]"
              >
                {{ item.estatus }}
              </td>
              <td class="grid grid-cols-2 justify-items-start">
                <!-- <div class="flex cursor-pointer items-center justify-center rounded-full py-5 px-6 hover:bg-[#E9F0FC]">
                <img src="/img/enviar_ico.svg" />
              </div> -->
                <div
                  v-show="item.estatus == 'Finalizado' ? true : false"
                  @click="copiarInfo(item)"
                  class="flex cursor-pointer items-center justify-center rounded-full py-5 px-5 hover:bg-[#E9F0FC]"
                >
                  <img src="/img/copiar_ico.svg" />
                </div>
                <div
                  @click="
                    $router.push({
                      path: `/mantenimiento/${item.incidencia}/${item.folioKey}`,
                      query: { mantenimiento: true },
                    })
                  "
                  class="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full hover:bg-[#E9F0FC] lg:h-auto lg:w-auto lg:py-3 lg:px-6"
                >
                  <img src="/img/actualizar_ico.svg" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import {
  getDatabase,
  ref as refDB,
  get,
  onChildChanged,
  onChildAdded,
  onChildRemoved,
  child,
} from "firebase/database";
import {
  RefreshIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/outline";
import TableMenu from "./TableMenu.vue";
import { clipboardCorrectivo } from "@/scripts/clipboard";
import { useUser } from "@/store/user";

const db = getDatabase();
const user = useUser();
const refFolios = refDB(db, "folios");
const filtro = reactive({
  folio: "",
});
const data = ref([]);
const filterData = ref([]);
const page = ref(1);
const perPage = 10;

onChildAdded(child(refDB(db), "folios/correctivos"), (snapshot) => {
  let color = "";
  data.value.push({
    incidencia: "correctivos",
    folioKey: snapshot.key,
    ...snapshot.val(),
  });
  data.value.sort((a, b) => {
    let fecha1 = new Date(a.horaInicio);
    let fecha2 = new Date(b.horaInicio);
    return fecha2 - fecha1
  })
});

 

const copiarInfo = (item) => {
  if (item.incidencia === "correctivos") {
    const result = clipboardCorrectivo(item);
  } else {
    alert("Lo sentimos, aún no tenemos scripts para folios preventivos.");
  }
};

onChildAdded(child(refDB(db), "folios/preventivos"), (snapshot) => {
  let color = "";
  data.value.push({
    incidencia: "preventivos",
    folioKey: snapshot.key,
    ...snapshot.val(),
  });
});

onMounted(() => {
  filterData.value = data.value;
});

const colorsBG = (estatus) => {
  let color = "";
  switch (estatus) {
    case 1:
      color = "bg-capturado";
      break;
    case 2:
      color = "bg-asignados";
      break;
    case 3:
      color = "bg-en-camino";
      break;
    case 4:
      color = "bg-en-proceso";
      break;
    case 5:
      color = "bg-cerrados";
      break;
    case 6:
      color = "bg-finalizados";
      break;
    case 7:
      color = "bg-pausados";
      break;
    case 8:
      color = "bg-programados";
      break;
    default:
      color = "bg-default";
      break;
  }
  return color;
};

const colorsText = (estatus) => {
  let color = "";
  switch (estatus) {
    case 1:
      color = "text-capturado";
      break;
    case 2:
      color = "text-asignados";
      break;
    case 3:
      color = "text-en-camino";
      break;
    case 4:
      color = "text-en-proceso";
      break;
    case 5:
      color = "text-cerrados";
      break;
    case 6:
      color = "text-finalizados";
      break;
    case 7:
      color = "text-pausados";
      break;
    case 8:
      color = "text-programados";
      break;
    default:
      color = "text-default";
      break;
  }
  return color;
};

const buscar = () => {
  filterData.value = data.value.filter((e) => {
    return e.folio.includes(filtro.folio);
  });
};

const reiniciarFiltro = () => {
  filterData.value = data.value;
  filtro.folio = "";
};

onChildRemoved(child(refDB(db), "folios"));

// control paginación
function handlePagination() {
  const paginatedData = computed(() =>
    filterData.value.slice((page.value - 1) * perPage, page.value * perPage)
  );

  const nextPage = () => {
    if (page.value !== Math.ceil(filterData.value.length / perPage)) {
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
