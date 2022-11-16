<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead
        class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
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
          v-for="item in data"
          class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="px-2"><img src="img/menu_puntos.svg" /></td>
          <th
            scope="row"
            class="rounded-l-xl bg-[#44C4A1] font-medium text-gray-900 dark:text-white"
          ></th>
          <td class="py-1 px-6">{{ item.folio }}</td>
          <td class="py-1 px-6">{{ item.tipoFolio }}</td>
          <td class="py-1 px-6">
            <div class="font-semibold">{{ item.distrito }}</div>
            <div>{{ item.cluster }}</div>
          </td>
          <td class="py-1 px-6">
            <div>{{ item.fechaInicio }}</div>
            <div>{{ item.horaInicio }}</div>
          </td>
          <td class="py-1 px-6">{{ item.eta }}</td>
          <td class="py-1 px-6">{{ item.sla }}</td>
          <td class="py-1 px-6">{{ item.estatus }}</td>
          <td class="flex flex-row space-x-4 py-1 px-6 text-right">
            <div
              class="flex cursor-pointer items-center justify-center rounded-full py-5 px-6 hover:bg-[#E9F0FC]"
            >
              <img src="img/enviar_ico.svg" />
            </div>
            <div
              class="flex cursor-pointer items-center justify-center rounded-full py-5 px-5 hover:bg-[#E9F0FC]"
            >
              <img src="img/copiar_ico.svg" />
            </div>
            <div
              @click="
                $router.push(
                  `/mantenimiento/${item.tipoFolio.toLowerCase()}/${item.folio}`
                )
              "
              class="flex cursor-pointer items-center justify-center rounded-full py-5 px-6 hover:bg-[#E9F0FC]"
            >
              <img src="img/actualizar_ico.svg" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getDatabase,
  ref as refDB,
  get,
  onChildChanged,
  onChildAdded,
  onChildRemoved,
  child,
} from "firebase/database";

const db = getDatabase();
const refFolios = refDB(db, "folios");
const data = ref([]);

onChildAdded(child(refDB(db), "folios"), (snapshot) => {
    snapshot.forEach((e) => {
      e.forEach((folio) => {
        console.log(folio.val())
        data.value.push({
          tipoFolio: e.key,
          folio: folio.key,
          estatus: folio.val().estado,
          horaInicio: folio.val().horaInicio ? folio.val().horaInicio.hora : '',
          FechaInicio: folio.val().horaInicio ? folio.val().horaInicio.fechaScript : '',
          eta: folio.val().eta ? folio.val().eta.tiempo : '',
          sla: folio.val().sla ? folio.val().sla.tiempo : '',
        });
      });
    });
  });

onChildRemoved(child(refDB(db), "folios"))

</script>
