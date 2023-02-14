<template>
  <div class="mt-5 flex flex-col lg:flex-row h-full w-full justify-center space-y-8 items-center lg:items-start lg:space-x-24">
    <div class="flex justify-center">
      <div class="flex flex-col space-y-8">
        <h2 class="text-xl font-semibold">Alta supervisor TTP</h2>
        <!-- Nombre -->
        <div class="flex flex-col">
          <label class="text-sm text-gray-500" for="name">Nombre</label>
          <div class="relative">
            <input
              v-model="formData.nombre"
              placeholder="Escribe el nombre del supervisor"
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
    <div class="flex space-x-12">
      <div class="flex flex-col space-y-6">
        <SupervisoresTTPTable :supervisorTTPData="supervisorTTPData" />
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
import SupervisoresTTPTable from "./SupervisoresTTPTable.vue";

const db = getDatabase();
const formData = reactive({
  nombre: null,
});

const supervisorTTPData = ref([]);

const rules = computed(() => {
  return {
    nombre: {
      requiredFalla: helpers.withMessage("Campo requerido.", required),
    },
  };
});

// Obtener supervisorTTP desde base de datos
await onChildAdded(refDB(db, `catalogo/supervisorTTP`), (snapshot) => {
  supervisorTTPData.value.push({
    nombre: snapshot.key,
  });
});

// Eliminar item de array cluster si se eliminó desde base de datos
onChildRemoved(refDB(db, `catalogo/supervisorTTP`), (snapshot) => {
  supervisorTTPData.value = supervisorTTPData.value.filter((value) => {
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
    setDB(refDB(db, `catalogo/supervisorTTP/${formData.nombre}`), {
      creado: serverTimestamp(),
    }).then((snapshot) => {
      $v.value.$reset();
      Object.assign(formData, {
        nombre: null,
      });
    });
  }
};
</script>
