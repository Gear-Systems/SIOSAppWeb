<template>
  <div class="my-7 flex select-none items-center">
    <div class="h-7 w-7 rounded-full bg-black">
      <ChevronLeftIcon
        :class="[
          'cursor-pointer text-white transition-all duration-500',
          $store.state.a.openSidebar == true ? '' : 'rotate-180',
        ]"
        @click="toggleSidebar"
        aria-hidden="true"
      />
    </div>
    <div class="flex w-[80%] pl-10">
      <img
        width="90"
        height="50"
        src="../../img/SiosApp.svg"
        alt="Logo SIOSApp"
      />
    </div>
    <div class="flex items-center justify-end space-x-4">
      <!-- boton atajo -->
      <NavbarBotonAtajo />
      <!-- boton notificaciones -->
      <div class="relative h-5 w-5 rounded-full">
        <img src="img/notificaciones_ico.svg" />
        <div
          class="absolute -top-4 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-white"
        >
          <span class="text-sm">2</span>
        </div>
      </div>
      <!-- Cerrar sesión -->
      <div @click="isOpen = true" class="h-5 w-5 rounded-full cursor-pointer"><img src="img/logout_ico.svg" /></div>
    </div>
    <ModalLogout :isOpen="isOpen" @close="isOpen = false" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import ModalLogout from "@/components/ModalLogout.vue";
import NavbarBotonAtajo from "@/components/NavbarBotonAtajo.vue";

const i = ref(0);
const isOpen = ref(false);
const objeto = ref({
  nombre: "Tere",
  edad: 20,
});
const arreglo = ref([]);
const auth = getAuth();
const router = useRouter();
const store = useStore();

const toggleSidebar = () => {
  // localStorage.setItem('toggleButton', localStorage.getItem('toggleButton') === 'true' ? false : true)
  store.commit("controlSidebar");
};
</script>
