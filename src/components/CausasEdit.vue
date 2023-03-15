<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="emit('closeModal')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-[350px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-xl font-semibold leading-6 text-gray-900"
              >
                <div class="relative">
                  <h2>Editar falla</h2>
                  <div
                    @click="emit('closeModal')"
                    class="absolute top-0 right-0 cursor-pointer"
                  >
                    <XCircleIcon class="h-6 w-6" />
                  </div>
                </div>
              </DialogTitle>
              <div class="mt-4 flex flex-col space-y-6">
                <div class="flex basis-[20%] flex-col">
                  <label class="text-sm text-gray-500" for="name">Actual</label>
                  <p class="font-semibold">{{ props.data.nombre }}</p>
                </div>
                <div class="flex basis-[20%] flex-col">
                  <label class="text-sm text-gray-500" for="name">Nuevo</label>
                  <input
                    v-model="newName"
                    class="max-w-sm rounded-md border-[1.5px] border-[#7C8495] bg-transparent font-semibold placeholder:text-sm placeholder:font-normal placeholder:text-black focus:ring-0"
                    type="text"
                    id="name"
                    required
                  />
                </div>
                <div class="flex justify-between">
                  <button
                    type="button"
                    class="rounded-md py-2 px-6 text-primario hover:bg-[#E9F0FC]"
                    @click="emit('closeModal')"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    class="rounded-md bg-primario py-2 px-6 font-light text-white hover:bg-primario/60"
                    @click="actualizar()"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import {
  getDatabase,
  ref as refDB,
  update,
  get,
  child,
  remove,
} from "firebase/database";
import { XCircleIcon } from "@heroicons/vue/outline";

const db = getDatabase();
const props = defineProps(["isOpen", "data"]);
const emit = defineEmits(["closeModal"]);
const newName = ref(props.data.nombre);

const actualizar = () => {
  if (newName) {
    get(child(refDB(db), `catalogo/causas/${props.data.nombre}`)).then(
      (snapshot) => {
        update(
          refDB(db, `catalogo/causas/${newName.value}`),
          snapshot.val()
        ).then((snapshot) => {
          if (props.data.nombre != newName.value) {
            remove(refDB(db, `catalogo/causas/${props.data.nombre}`));
          }
          emit("closeModal");
        });
      }
    );
  }
};
</script>
