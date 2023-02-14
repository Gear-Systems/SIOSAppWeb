<template>
  <div class="mt-5 flex flex-col lg:flex-row items-center lg:items-start h-full w-full justify-center lg:space-x-24">
    <div class="flex justify-center">
      <div class="flex flex-col space-y-8">
        <h2 class="text-xl font-semibold">Agregar nuevo concepto</h2>
        <!-- Nombre -->
        <div class="flex flex-col">
          <label class="text-sm text-gray-500" for="name">Nombre</label>
          <div class="relative">
            <input
              v-model="formData.nombre"
              placeholder="Escribe el nombre del concepto"
              class="max-w-sm rounded-md border-[1.5px] border-[#7C8495] bg-transparent font-semibold placeholder:text-sm placeholder:font-normal placeholder:text-black focus:ring-0"
              type="text"
              id="name"
            />
            <p
              v-for="error of $v.nombre.$errors"
              :key="error.$uid"
              class="absolute text-sm text-red-400"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-500" for="descripcion"
            >Descripción</label
          >
          <div class="relative">
            <textarea
              v-model="formData.descripcion"
              placeholder="Escribe una breve descripción del concepto..."
              id="descripcion"
              class="min-w-full max-w-full rounded-md border-[1.5px] border-[#7C8495] bg-transparent font-semibold placeholder:text-sm placeholder:font-normal placeholder:text-black focus:ring-0"
            ></textarea>
            <p
              v-for="error of $v.descripcion.$errors"
              :key="error.$uid"
              class="absolute text-sm text-red-400"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="flex w-full justify-end">
          <button
            @click="guardar"
            type="button"
            class="rounded-md bg-primario py-2 px-6 font-light text-white hover:bg-primario/60"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
    <div class="mt-12 flex space-x-12">
      <div class="flex flex-col space-y-6">
        <h2 class="text-center text-xl font-semibold">Conceptos</h2>
        <ConceptosTable :conceptosData="conceptosData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import {
  getDatabase,
  ref as refDB,
  get,
  child,
  set as setDB,
  serverTimestamp,
  onChildRemoved,
  onChildAdded,
} from "firebase/database";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, helpers } from "@vuelidate/validators";
import ConceptosTable from "./ConceptosTable.vue";

const db = getDatabase();
const formData = reactive({
  nombre: null,
  descripcion: null,
});

const conceptosData = ref([]);

const rules = computed(() => {
  return {
    nombre: {
      requiredFalla: helpers.withMessage("Campo requerido.", required),
    },
    descripcion: {
      max: helpers.withMessage(
        "El campo no puede ser mayor a 255 caracteres",
        maxLength(255)
      ),
    },
  };
});

// Obtener conceptos desde base de datos
await onChildAdded(refDB(db, `catalogo/conceptos`), (snapshot) => {
  conceptosData.value.push({
    nombre: snapshot.key,
  });
});

// Eliminar item de array cluster si se eliminó desde base de datos
onChildRemoved(refDB(db, `catalogo/conceptos`), (snapshot) => {
  conceptosData.value = conceptosData.value.filter((value) => {
    if (value.nombre !== snapshot.key) {
      return value;
    }
  });
});

const $v = useVuelidate(rules, formData);

// Guardar valor en base de datos
const guardar = async () => {
  let result = await $v.value.$validate();
  if (result) {
    setDB(refDB(db, `catalogo/conceptos/${formData.nombre}`), {
      creado: serverTimestamp(),
      descripcion: formData.descripcion,
    }).then((snapshot) => {
      $v.value.$reset();
      Object.assign(formData, {
        nombre: null,
        descripcion: null,
      });
    });
  }
};
</script>
