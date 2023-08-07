
<!-------------------------- Contenido de la opción Entradas ------------------------>

<template>
  <div class="h-full w-full">
    <div class="flex w-full flex-col space-y-4">
      <div class="min-h-[400px] w-full bg-[#F8FAFB] py-3 px-2 lg:px-28 shadow-md">

        <!-- Submenu entradas e hisorico -->

        <TabGroup>
          <TabList class="border-b-2">
            <div class="flex justify-center lg:justify-start w-full space-x-4">

              <!-- Botón Entradas -->

              <Tab v-slot="{ selected }">
                <button :class="[
                  'px-14 py-2',
                  selected ? 'font-semibold text-primario' : '',
                ]">
                  Entradas
                </button>
              </Tab>

              <!-- Botón Historico -->

              <Tab v-slot="{ selected }">
                <button :class="[
                  'px-14 py-2',
                  selected ? 'font-semibold text-primario' : '',
                ]">
                  Histórico
                </button>
              </Tab>

            </div>
          </TabList>

          <!-- Contenido de la tabla -->

          <TabPanels class="mt-12">
            <TabPanel class="flex w-full justify-center">

              <!-- Vista para subir los archivos en entradas-->

              <div v-if="!data.length" class="min-w-[400px] max-w-[500px]">
                <DropZone #default="{ dropZoneActive }" @files-dropped="readFile">
                  <div :class="[
                    'flex justify-center border-2 border-dashed bg-white p-28',
                    dropZoneActive ? 'bg-gray-50' : '',
                  ]">
                    <div v-if="dropZoneActive">
                      <div>Suelta</div>
                    </div>
                    <div v-else>
                      <div>Soltar tu .xlsx aquí</div>
                    </div>
                  </div>
                </DropZone>
              </div>

              <!-- Vista para cuando recibe el archivo -->

              <div v-else class="h-full w-full">
                <EntradasTable :data="data" @cancelar="data = []" @subir="upload" />
              </div>

            </TabPanel>

            <!-- Vista de la tabla con el historial de archivos -->
            
            <TabPanel>
              <Suspense>
                <AlmacenEntradasHistorico />
              </Suspense>
            </TabPanel>
            
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import DropZone from "./DropZone.vue";
import readXlsxFile from "read-excel-file";
import {
  getDatabase,
  ref as refDB,
  get,
  update,
  set,
  push,
} from "firebase/database";
import { auth } from "@/firebase/firebase";
import EntradasTable from "./EntradasTable.vue";
import AlmacenEntradasHistorico from "./AlmacenEntradasHistorico.vue";

const db = getDatabase();
const materialesRef = refDB(db, "/almacen/materiales/totalplay");
const storage = getStorage();
const codigosValidos = ref([]);
const data = ref([]);
const file = ref();

onMounted(() => {
  get(materialesRef).then((snapshot) => {
    snapshot.forEach((element) => {
      codigosValidos.value.push({
        codigo: element.val().code,
        descripcion: element.key,
        unidad: element.val().unidad,
      });
    });
  });
});

const schema = {
  CODIGO: {
    prop: "codigo",
    type: String,
    required: true,
  },
  CANTIDAD: {
    prop: "cantidad",
    type: Number,
    required: true,
  },
};
function readFile(newFiles) {
  data.value = [];
  file.value = newFiles;
  readXlsxFile(newFiles[0], { schema }).then(({ rows, errors }) => {
    if (errors.length) {
      return;
    } else {
      let validarCodigo;
      rows.forEach((item) => {
        validarCodigo = codigosValidos.value.find(
          (it) => it.codigo === item.codigo
        );
        if (validarCodigo) {
          data.value.push({
            codigo: item.codigo,
            descripcion: validarCodigo.descripcion,
            unidad: validarCodigo.unidad,
            cantidad: item.cantidad,
            error: false,
          });
        } else {
          data.value.push({
            codigo: item.codigo,
            descripcion: "No encontrado",
            unidad: "No encontrado",
            cantidad: item.cantidad,
            error: true,
          });
        }
      });
    }
  });
}

const files = ref();

async function upload(validatedData) {
  alert("Materiales subidos correctamente.");
  data.value = [];
  validatedData.forEach((material) => {
    get(refDB(db, `almacen/inventario/${material.descripcion}`)).then(
      (snapshot) => {
        update(refDB(db, `almacen/inventario/${material.descripcion}`), {
          entradas: snapshot.val().entradas + material.cantidad,
          stock: snapshot.val().stock + material.cantidad,
        });
      }
    );
  });
  await addFiles();
}

async function addFiles() {
  let historicoRef = refDB(db, "almacen/historico/entradas");
  let historicoPush = push(historicoRef);
  let creado = new Date().getTime();
  let documentRef = refStorage(
    storage,
    `historico/entradas/${creado}_${file.value[0].name}`
  );

  if (
    file.value[0].type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    file.value = file.value;
    uploadBytes(documentRef, file.value[0])
      .then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          await set(historicoPush, {
            creado: creado,
            nombre: file.value[0].name,
            url: url,
            usuario: auth.currentUser.uid,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Formato incorrecto de archivo");
  }
}
</script>
