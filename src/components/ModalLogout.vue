<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="emits('close')" class="relative z-10">
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Cerrar sesión
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  ¿Estás seguro que deseas cerrar sesión?
                </p>
              </div>

              <div class="mt-8 flex justify-between">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-primario/80 px-4 py-2 text-sm font-medium text-white hover:bg-primario/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="emits('close')"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-500/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="logout"
                >
                  Salir
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "vue-router";

const props = defineProps(["isOpen"]);
const emits = defineEmits(["close"]);
const router = useRouter();

const logout = () => {
    signOut(auth).then(() => {
        router.push("/");
    })
}
</script>
