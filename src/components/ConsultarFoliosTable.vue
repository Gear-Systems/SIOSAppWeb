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
          <td class="py-4 px-6">{{ item.folio }}</td>
          <td class="py-4 px-6">{{ item.tipoFolio }}</td>
          <td class="py-4 px-6"><div class="font-semibold">{{ item.distrito }}</div><div>{{ item.cluster }}</div></td>
          <td class="py-4 px-6"><div>{{ item.fechaInicio }}</div><div>{{ item.horaInicio }}</div></td>
          <td class="py-4 px-6">{{ item.eta }}</td>
          <td class="py-4 px-6">{{ item.sla }}</td>
          <td class="py-4 px-6">{{ item.estatus }}</td>
          <td class="py-4 px-6 text-right flex flex-row space-x-4">
            <div class="hover:bg-[#E9F0FC] rounded-full flex justify-center items-center py-5 px-6 cursor-pointer">
              <img src="img/enviar_ico.svg" />
            </div>
            <div class="hover:bg-[#E9F0FC] rounded-full flex justify-center items-center py-5 px-5 cursor-pointer">
              <img src="img/copiar_ico.svg" />
            </div>
            <div @click="$router.push(`/mantenimiento/${(item.tipoFolio).toLowerCase()}/${item.folio}`)" class="hover:bg-[#E9F0FC] rounded-full flex justify-center items-center py-5 px-6 cursor-pointer">
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
const data = await fetchData();

async function fetchData() {
  let dataFetch = [];
  await get(child(refDB(db), "folios")).then((snapshot) => {
    if (snapshot.hasChild("correctivos")) {
      for (let item in snapshot.val().correctivos) {
        console.log(snapshot.val().correctivos[item]);
        for (let folio in snapshot.val().correctivos[item]) {
          dataFetch.push({
            tipoFolio: item,
            folio: folio,
            estatus: snapshot.val().correctivos[item][folio].estatus,
            distrito: snapshot.val().correctivos[item][folio].distrito,
            cluster: snapshot.val().correctivos[item][folio].cluster,
            horaInicio: snapshot.val().correctivos[item][folio].horaInicio ? snapshot.val().correctivos[item][folio].horaInicio.hora: '',
            fechaInicio: snapshot.val().correctivos[item][folio].horaInicio ? snapshot.val().correctivos[item][folio].horaInicio.fechaScript: '',
            eta: snapshot.val().correctivos[item][folio].eta ? snapshot.val().correctivos[item][folio].eta.tiempo : '',
            sla: snapshot.val().correctivos[item][folio].sla ? snapshot.val().correctivos[item][folio].sla.tiempo : ''
          });
        }
      }
    }
  });
  console.log(dataFetch);
  return dataFetch;
}
</script>
