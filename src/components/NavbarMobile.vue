<template>
    <div class="py-7 relative flex select-none justify-around px-5 items-center drop-shadow-md">
      <!-- <div class="absolute left-0 h-7 w-7 rounded-full bg-black">
        <ChevronLeftIcon
          :class="[
            'cursor-pointer text-white transition-all duration-500',
            $store.state.a.openSidebar == true ? '' : 'rotate-180',
          ]"
          @click="toggleSidebar"
          aria-hidden="true"
        />
      </div> -->
      <div class="flex w-[80%] pl-10">
        <img
          width="85"
          src="https://firebasestorage.googleapis.com/v0/b/siosapp-335118.appspot.com/o/resource%2Ficons%2Fsvg%2Fnavbar%2FsiosApp.svg?alt=media&token=fdf03f69-ac7b-4d52-8b9e-819176d7454c"
          alt="Logo SIOSApp"
        />
      </div>
      <div class="flex items-center justify-end space-x-7">
        <!-- boton atajo -->
        <NavbarBotonAtajo />
        <!-- boton notificaciones -->
        <!-- <div class="relative h-5 w-5 rounded-full">
          <img src="https://firebasestorage.googleapis.com/v0/b/siosapp-335118.appspot.com/o/resource%2Ficons%2Fsvg%2Fnavbar%2Fnotificacion.svg?alt=media&token=85500e19-ff72-4d33-8271-ed4408b5c8fe" />
          <div
            class="absolute -top-4 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-white"
          >
            <span class="text-sm">2</span>
          </div>
        </div> -->
        <!-- Cerrar sesión -->
        <div @click="isOpen = true" class="h-5 w-5 rounded-full cursor-pointer"><img src="https://firebasestorage.googleapis.com/v0/b/siosapp-335118.appspot.com/o/resource%2Ficons%2Fsvg%2Fnavbar%2Fsalir.svg?alt=media&token=16da3e8a-2f1a-4bfe-b9bf-1e55e5c964cc" /></div>
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
  