<template>
  <div>
    <TransitionRoot
      appear
      :show="$store.state.a.modalManejoFolio"
      as="template"
      class="z-50"
    >
      <Dialog as="div" @close="setIsOpen" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25"></div>
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
                class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="div"
                  class="mb-5 flex items-center text-lg font-medium leading-6 text-gray-900"
                >
                  <div
                    v-if="props.permitirCierre"
                    class="flex w-[100%] justify-end"
                  >
                    <XCircleIcon
                      @click="setIsOpen(close)"
                      class="h-6 w-6 cursor-pointer"
                    />
                  </div>
                </DialogTitle>
                <div class="mt-4 flex w-full flex-col">
                  <div
                    class="flex w-full flex-col justify-center self-center text-center"
                  >
                    ¿Asignar folio al técnico o continuar la captura de
                    información?
                    <slot name="mensaje"></slot>
                  </div>
                  <div class="mt-8 flex justify-around">
                    <div
                      v-if="!props.botonCapturar"
                      class="flex w-1/2 justify-center"
                    >
                      <button
                        type="button"
                        class="flex justify-center rounded-md border border-transparent bg-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                        @click="closeModal"
                      >
                        Cancelar
                      </button>
                    </div>
                    <div class="flex w-1/2 justify-center">
                      <button
                        type="button"
                        class="flex justify-center rounded-md border-2 border-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:border-transparent hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                        @click="asignarFolio"
                      >
                        Asignar
                      </button>
                    </div>
                    <div
                      v-if="props.botonCapturar"
                      class="flex w-1/2 justify-center"
                    >
                      <button
                        type="button"
                        class="flex justify-center rounded-md border border-transparent bg-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                        @click="capturaFolio()"
                      >
                        Capturar
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { XCircleIcon } from "@heroicons/vue/outline";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { store } from "@/store";
import { functions } from "@/firebase/firebase";
import { httpsCallable } from "firebase/functions";

const storeVuex = useStore();
const props = defineProps(["botonCapturar", "permitirCierre", "infoSelected"]);
const isOpen = ref(store.state.a.modalManejoFolio);
// const asignarFolioFirebase = httpsCallable(functions, "asignarFolioPreventivo");
const emits = defineEmits("asignarFolio", "capturarFolio");
function closeModal() {
  storeVuex.commit("cerrarModalManejoFolio");
}

const asignarFolio = async () => {
  // await asignarFolioFirebase(props.infoSelected)
  //   .then((result) => {
  //     console.log(result);
  //     closeModal();
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  emits("asignarFolio");
};

const capturaFolio = () => {
  emits("capturarFolio");
};

function setIsOpen(value) {
  if (props.permitirCierre) {
    storeVuex.commit(
      value ? "abrirModalManejoFolio" : "cerrarModalManejoFolio"
    );
  }
}
</script>
