<template>
  <form
    @submit.prevent="exportarArchivo"
    class="flex max-w-[400px] flex-col space-y-4 border bg-white p-6 drop-shadow-xl"
  >
    <h2 class="mb-2 text-xl font-semibold">Reportes</h2>
    <Listbox v-model="formData.tipoReporte">
      <div class="relative">
        <ListboxLabel class="text-sm text-gray-500"
          >Tipo de reporte</ListboxLabel
        >
        <ListboxButton
          class="shadow- relative w-full max-w-sm cursor-pointer rounded-md border-[1.5px] border-[#7C8495] py-3 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ formData.tipoReporte.name }} </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-30 mt-1 max-h-60 w-full max-w-sm overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="item in data.reportes"
              :key="item.id"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-gray-100' : 'text-gray-900',
                  'relative w-full cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block w-full truncate',
                  ]"
                  >{{ item.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <Listbox v-model="formData.tipoIncidencia">
      <div class="relative">
        <ListboxLabel class="text-sm text-gray-500"
          >Tipo de incidencia</ListboxLabel
        >
        <ListboxButton
          class="shadow- relative w-full max-w-sm cursor-pointer rounded-md border-[1.5px] border-[#7C8495] py-3 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate"
            >{{ formData.tipoIncidencia.name }}
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-30 mt-1 max-h-60 w-full max-w-sm overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="item in data.incidencias"
              :key="item.id"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-gray-100' : 'text-gray-900',
                  'relative w-full cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block w-full truncate',
                  ]"
                  >{{ item.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <Listbox v-model="formData.distrito">
      <div class="relative">
        <ListboxLabel class="text-sm text-gray-500">Distrito</ListboxLabel>
        <ListboxButton
          class="shadow- relative w-full max-w-sm cursor-pointer rounded-md border-[1.5px] border-[#7C8495] py-3 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ formData.distrito.name }} </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-30 mt-1 max-h-60 w-full max-w-sm overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="item in data.distritos"
              :key="item.id"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-gray-100' : 'text-gray-900',
                  'relative w-full cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block w-full truncate',
                  ]"
                  >{{ item.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <Popover v-slot="{ open }" class="relative">
      <div class="flex justify-center">
        <PopoverButton
          :class="open ? '' : 'text-opacity-90'"
          class="group inline-flex items-center rounded-md border-[1.5px] border-primario px-3 py-2 text-base font-light text-primario hover:bg-[#E9F0FC] hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <span>Rango de fechas</span>
        </PopoverButton>
      </div>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute w-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:-right-56 lg:top-14 z-10 mt-3 sm:px-0 lg:max-w-3xl"
        >
          <DatePicker v-model="formData.fechas" is-range />
        </PopoverPanel>
      </transition>
    </Popover>
    <div class="flex justify-end">
      <button
        type="submit"
        class="rounded-md bg-primario py-2 px-6 font-light text-white hover:bg-primario/60"
      >
        Generar reporte
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { read, writeFileXLSX, utils } from "xlsx";
import { db } from "@/firebase/firebase";
import { DatePicker } from "v-calendar";
import {
  get,
  ref as refDB,
  orderByChild,
  query,
  startAt,
  limitToFirst,
  endAt,
  equalTo,
} from "firebase/database";

const data = reactive({
  reportes: [
    { name: "Reporte de folios", id: 1 },
    { name: "Reporte de materiales", id: 2 },
  ],
  incidencias: [
    { name: "Todos", id: 0 },
    { name: "Preventivo", id: 1 },
    { name: "Correctivo", id: 2 },
  ],
  distritos: [{ name: "Todos", id: 0 }],
});

const showPicker = ref(false);

const fetchData = async () => {
  await get(refDB(db, `catalogo/distritos`)).then((snapshot) => {
    let i = 0;
    snapshot.forEach((distrito) => {
      data.distritos.push({ name: distrito.key, id: i++ });
    });
  });
};

await fetchData();

const formData = reactive({
  tipoReporte: { name: "Selecciona una opción", id: 0 },
  tipoIncidencia: data.incidencias[0],
  distrito: data.distritos[0],
  fechas: "",
});

const jsonArray = ref([]);

const exportarArchivo = async () => {
  if (formData.tipoReporte.id === 1) {
    await reporteFolio();
  }
  if (formData.tipoReporte.id === 2) {
    await reporteMateriales();
  }
};

// reporte de folios
const reporteFolio = async () => {
  jsonArray.value = [];
  switch (formData.tipoIncidencia.id) {
    case 0:
      await reporteFoliosCorrectivos();
      await reporteFoliosPreventivo();
      break;
    case 1:
      await reporteFoliosPreventivo();
      break;
    case 2:
      await reporteFoliosCorrectivos();
  }
  if (jsonArray.value.length > 0) {
    const ws = utils.json_to_sheet(jsonArray.value);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Reportes");
    writeFileXLSX(wb, "PruebaReporte.xlsx");
  }
};

// reporte de materiales
const reporteMateriales = async () => {
  jsonArray.value = [];
  let fechaInicial = new Date(formData.fechas.start).setHours(0, 0, 0);
  let fechaFinal = new Date(formData.fechas.end).setHours(23, 59, 59);
  let materiales = {};
  let materialesFolio = [];
  let materialesTemp = {};

  const foliosRef = query(
    refDB(db, `folios/correctivos`),
    orderByChild("horaInicio"),
    startAt(fechaInicial),
    endAt(fechaFinal)
  );

  await get(foliosRef).then(async (snapshot) => {
    await get(refDB(db, `almacen/materiales/totalplay`)).then(
      (snapshotMateriales) => {
        snapshotMateriales.forEach((material) => {
          materiales[material.key] = 0;
        });
      }
    );

    snapshot.forEach((folio) => {
      if (folio.hasChild("materiales/totalplay")) {
        if (folio.val().estatusId === 6) {
          materialesTemp = materiales;
          materialesFolio = folio.val().materiales["totalplay"];
          for (let materialItem in materialesTemp) {
            materialesFolio.forEach((e) => {
              if (e.keyMaterial === materialItem) {
                materialesTemp[materialItem] = e.qty;
              } else {
                materialesTemp[materialItem] = 0;
              }
            });
          }
          // const tecnicoName = get(
          //   refDB(db, `usuarios/${folio.val().tecnico}`)
          // );
          jsonArray.value.push({
            FOLIO: folio.val().folio,
            "TIPO FOLIO": folio.val().tipoFolio,
            INCIDENCIA: "Correctivo",
            OT: folio.val().ot,
            DISTRITO: folio.val().distrito,
            ClUSTER: folio.val().cluster,
            COORDENADAS: folio.val().coordenadas,
            FALLA: folio.val().falla,
            CAUSA: folio.val().causa,
            "CLIENTES AFECTADOS": folio.val().clientesAfectados,
            "ASIGNACION IOS": `${new Date(
              folio.val().horaInicio
            ).getDate()}/${new Date(
              folio.val().horaInicio
            ).getMonth()}/${new Date(
              folio.val().horaInicio
            ).getFullYear()} ${new Date(
              folio.val().horaInicio
            ).getHours()}:${new Date(folio.val().horaInicio).getMinutes()}`,
            LLEGADA: `${new Date(folio.val().horaLlegada).getDate()}/${new Date(
              folio.val().horaLlegada
            ).getMonth()}/${new Date(
              folio.val().horaLlegada
            ).getFullYear()} ${new Date(
              folio.val().horaLlegada
            ).getHours()}:${new Date(folio.val().horaLlegada).getMinutes()}`,
            ACTIVACION: `${new Date(
              folio.val().horaActivacion
            ).getDate()}/${new Date(
              folio.val().horaActivacion
            ).getMonth()}/${new Date(
              folio.val().horaActivacion
            ).getFullYear()} ${new Date(
              folio.val().horaActivacion
            ).getHours()}:${new Date(folio.val().horaActivacion).getMinutes()}`,
            ETA: folio.val().eta,
            SLA: folio.val().sla,
            ESTATUS: folio.val().estatus,
            TECNICO: "",
            CREADO: `${new Date(folio.val().creado).getDate()}/${new Date(
              folio.val().creado
            ).getMonth()}/${new Date(
              folio.val().creado
            ).getFullYear()} ${new Date(
              folio.val().creado
            ).getHours()}:${new Date(folio.val().creado).getMinutes()}`,
            ...materialesTemp,
          });
        }
      }
    });

    if (jsonArray.value.length > 0) {
      const ws = utils.json_to_sheet(jsonArray.value);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Reportes");
      writeFileXLSX(wb, "PruebaReporte.xlsx");
    }
  });
};

// lógica para reporte de folios
const reporteFoliosCorrectivos = async () => {
  let fechaInicial = new Date(formData.fechas.start).setHours(0, 0, 0);
  let fechaFinal = new Date(formData.fechas.end).setHours(23, 59, 59);

  const foliosRef = query(
    refDB(db, `folios/correctivos`),
    orderByChild("horaInicio"),
    startAt(fechaInicial),
    endAt(fechaFinal)
  );
  await get(foliosRef).then(async (snapshot) => {
    for (const folio in snapshot.val()) {
      if (snapshot.val()[folio]["estatusId"] === 6) {
        const tecnicoName = await get(
          refDB(db, `usuarios/${snapshot.val()[folio]["tecnico"]}`)
        );
        jsonArray.value.push({
          FOLIO: snapshot.val()[folio]["folio"],
          "TIPO FOLIO": snapshot.val()[folio]["tipoFolio"],
          INCIDENCIA: "Correctivo",
          OT: snapshot.val()[folio]["ot"],
          DISTRITO: snapshot.val()[folio]["distrito"],
          ClUSTER: snapshot.val()[folio]["cluster"],
          COORDENADAS: snapshot.val()[folio]["coordenadas"],
          FALLA: snapshot.val()[folio]["falla"],
          CAUSA: snapshot.val()[folio]["causa"],
          "CLIENTES AFECTADOS": snapshot.val()[folio]["clientesAfectados"],
          "ASIGNACION IOS": `${new Date(
            snapshot.val()[folio]["horaInicio"]
          ).getDate()}/${new Date(
            snapshot.val()[folio]["horaInicio"]
          ).getMonth()}/${new Date(
            snapshot.val()[folio]["horaInicio"]
          ).getFullYear()} ${new Date(
            snapshot.val()[folio]["horaInicio"]
          ).getHours()}:${new Date(
            snapshot.val()[folio]["horaInicio"]
          ).getMinutes()}`,
          LLEGADA: `${new Date(
            snapshot.val()[folio]["horaLlegada"]
          ).getDate()}/${new Date(
            snapshot.val()[folio]["horaLlegada"]
          ).getMonth()}/${new Date(
            snapshot.val()[folio]["horaLlegada"]
          ).getFullYear()} ${new Date(
            snapshot.val()[folio]["horaLlegada"]
          ).getHours()}:${new Date(
            snapshot.val()[folio]["horaLlegada"]
          ).getMinutes()}`,
          ACTIVACION: `${new Date(
            snapshot.val()[folio]["horaActivacion"]
          ).getDate()}/${new Date(
            snapshot.val()[folio]["horaActivacion"]
          ).getMonth()}/${new Date(
            snapshot.val()[folio]["horaActivacion"]
          ).getFullYear()} ${new Date(
            snapshot.val()[folio]["horaActivacion"]
          ).getHours()}:${new Date(
            snapshot.val()[folio]["horaActivacion"]
          ).getMinutes()}`,
          ETA: snapshot.val()[folio]["eta"],
          SLA: snapshot.val()[folio]["sla"],
          ESTATUS: snapshot.val()[folio]["estatus"],
          TECNICO: tecnicoName.val().displayName,
          CREADO: `${new Date(
            snapshot.val()[folio]["creado"]
          ).getDate()}/${new Date(
            snapshot.val()[folio]["creado"]
          ).getMonth()}/${new Date(
            snapshot.val()[folio]["creado"]
          ).getFullYear()} ${new Date(
            snapshot.val()[folio]["creado"]
          ).getHours()}:${new Date(
            snapshot.val()[folio]["creado"]
          ).getMinutes()}`,
        });
      }
    }
  });
};

const reporteFoliosPreventivo = async () => {
  let fechaInicial = new Date(formData.fechas.start).setHours(0, 0, 0);
  let fechaFinal = new Date(formData.fechas.end).setHours(23, 59, 59);

  const foliosRef = query(
    refDB(db, `folios/preventivos`),
    orderByChild("horaInicio"),
    startAt(fechaInicial),
    endAt(fechaFinal)
  );
  await get(foliosRef).then(async (snapshot) => {
    for (const folio in snapshot.val()) {
      if (snapshot.val()[folio]["estatusId"] === 6) {
        const tecnicoName = await get(
          refDB(db, `usuarios/${snapshot.val()[folio]["tecnico"]}`)
        );
        jsonArray.value.push({
          FOLIO: snapshot.val()[folio]["folio"],
          "TIPO FOLIO": snapshot.val()[folio]["tipoFolio"],
          INCIDENCIA: "Preventivo",
          OT: snapshot.val()[folio]["ot"],
          DISTRITO: snapshot.val()[folio]["distrito"],
          ClUSTER: snapshot.val()[folio]["cluster"],
          COORDENADAS: snapshot.val()[folio]["coordenadas"],
          FALLA: snapshot.val()[folio]["falla"],
          CAUSA: snapshot.val()[folio]["causa"],
          "CLIENTES AFECTADOS": 0,
          "ASIGNACION IOS": `${new Date(
            snapshot.val()[folio]["horaInicio"]
          ).getDate()}/${new Date(
            snapshot.val()[folio]["horaInicio"]
          ).getMonth()}/${new Date(
            snapshot.val()[folio]["horaInicio"]
          ).getFullYear()} ${new Date(
            snapshot.val()[folio]["horaInicio"]
          ).getHours()}:${new Date(
            snapshot.val()[folio]["horaInicio"]
          ).getMinutes()}`,
          LLEGADA: `${new Date(
            snapshot.val()[folio]["horaLlegada"]
          ).getDate()}/${new Date(
            snapshot.val()[folio]["horaLlegada"]
          ).getMonth()}/${new Date(
            snapshot.val()[folio]["horaLlegada"]
          ).getFullYear()} ${new Date(
            snapshot.val()[folio]["horaLlegada"]
          ).getHours()}:${new Date(
            snapshot.val()[folio]["horaLlegada"]
          ).getMinutes()}`,
          ACTIVACION: `${new Date(
            snapshot.val()[folio]["horaActivacion"]
          ).getDate()}/${new Date(
            snapshot.val()[folio]["horaActivacion"]
          ).getMonth()}/${new Date(
            snapshot.val()[folio]["horaActivacion"]
          ).getFullYear()} ${new Date(
            snapshot.val()[folio]["horaActivacion"]
          ).getHours()}:${new Date(
            snapshot.val()[folio]["horaActivacion"]
          ).getMinutes()}`,
          ETA: snapshot.val()[folio]["eta"],
          SLA: snapshot.val()[folio]["sla"],
          ESTATUS: snapshot.val()[folio]["estatus"],
          TECNICO: tecnicoName.val().displayName,
          CREADO: `${new Date(
            snapshot.val()[folio]["creado"]
          ).getDate()}/${new Date(
            snapshot.val()[folio]["creado"]
          ).getMonth()}/${new Date(
            snapshot.val()[folio]["creado"]
          ).getFullYear()} ${new Date(
            snapshot.val()[folio]["creado"]
          ).getHours()}:${new Date(
            snapshot.val()[folio]["creado"]
          ).getMinutes()}`,
        });
      }
    }
  });
};
</script>
