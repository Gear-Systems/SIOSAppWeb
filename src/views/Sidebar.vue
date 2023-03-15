<template>
  <div
    class="h-screen select-none relative rounded-tr-3xl rounded-br-3xl pt-10 shadow-xl transition-all duration-500 ease-in-out"
    :class="[$store.state.a.openSidebar == true ? 'w-[20%]' : 'w-[5%]']"
  >
    <!-- Tarjeta bienvenido -->
    <div class="flex items-center justify-center transition-all duration-600">
      <div
        class="flex h-14 w-14 items-center justify-center rounded-full bg-azul-marino"
      >
        <img src="https://firebasestorage.googleapis.com/v0/b/siosapp-335118.appspot.com/o/resource%2Ficons%2Fsvg%2Fsidebar%2Fusuario.svg?alt=media&token=e8deb6f4-06f3-4d0b-a903-0c1863c09f37" width="25" />
      </div>
      <TransitionRoot
        :show="$store.state.a.openSidebar"
        as="div"
        enter="transition-opacity duration-600"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity duration-200"
        leave-from="opacity-0"
        leave-to="opacity-100"
      >
        <div class="flex flex-col pl-4">
          <div class="text-sm">Bienvenido(a)</div>
          <div class="text-xl font-semibold">{{ userData.displayName }}</div>
        </div>
      </TransitionRoot>
    </div>
    <!-- Fin tarjeta bienvenido -->
    <!-- Separador -->
    <div
      class="mt-12 flex w-full items-center justify-center transition-all duration-600"
    >
      <div class="flex w-[80%] border-b-[3px] border-black"></div>
    </div>
    <!-- Fin separador -->
    <div
      class="mt-8 flex justify-center"
      :class="[$store.state.a.openSidebar ? 'w-full' : 'w-[100%]']"
    >
      <ul class="flex flex-col space-y-4">
        <li
          class="font-medium flex cursor-pointer items-center justify-center space-x-4 rounded-md p-2 transition-all duration-600"
          :class="[
            $route.path == '/dashboard' ? 'bg-secundario text-primario' : '',
            $store.state.a.openSidebar ? 'w-full' : 'w-18',
          ]"
          @click="$router.push('/dashboard')"
        >
          <div class="flex h-7 w-7 items-center justify-center rounded-full">
            <DashboardIco
              :color="$route.path == '/dashboard' ? '#2166E5' : '#101010'"
            />
          </div>
          <TransitionRoot
            :show="$store.state.a.openSidebar"
            as="div"
            class="min-w-[65%]"
            enter="transition-all duration-1500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-all duration-100"
            leave-from="opacity-0"
            leave-to="opacity-100"
          >
            Dashboard
          </TransitionRoot>
        </li>
        <li
          class="font-medium flex cursor-pointer items-center justify-center space-x-4 rounded-md p-2 transition-all duration-600"
          :class="[
            $route.path == '/capturar-folio' ? 'bg-secundario text-primario' : '',
            $store.state.a.openSidebar ? 'w-full' : 'w-18',
          ]"
          @click="$router.push('/capturar-folio')"
        >
        <div class="flex h-7 w-7 items-center justify-center rounded-full">
            <CapturarFolioIco
              :color="$route.path == '/capturar-folio' ? '#2166E5' : '#101010'"
            />
          </div>
          <TransitionRoot
            :show="$store.state.a.openSidebar"
            as="div"
            class="min-w-[65%]"
            enter="transition-opacity duration-1500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity duration-200"
            leave-from="opacity-0"
            leave-to="opacity-100"
          >
            Capturar folio
          </TransitionRoot>
        </li>
        <li
          class="font-medium flex cursor-pointer items-center justify-center space-x-4 rounded-md p-2 transition-all duration-600"
          :class="[$route.path == '/consultar-folios' ? 'bg-secundario text-primario' : '']"
          @click="$router.push({ name: 'consultarFolios' })"
        >
        <div class="flex h-7 w-7 items-center justify-center rounded-full">
            <ConsultarFolioIco
              :color="$route.path == '/consultar-folios' ? '#2166E5' : '#101010'"
            />
          </div>
          <TransitionRoot
            :show="$store.state.a.openSidebar"
            as="div"
            class="min-w-[70%]"
            enter="transition-opacity duration-1500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity duration-200"
            leave-from="opacity-0"
            leave-to="opacity-100"
          >
            Consultar folios
          </TransitionRoot>
        </li>
        <li
        @click="$router.push({ name: 'reportes' })"
          class="font-medium flex cursor-pointer items-center justify-center space-x-4 rounded-md p-2 transition-all duration-600"
          :class="[$route.path == '/reportes' ? 'bg-secundario text-primario' : '']"
        >
        <div class="flex h-7 w-7 items-center justify-center rounded-full">
            <ReportesIco
              :color="$route.path == '/reportes' ? '#2166E5' : '#101010'"
            />
          </div>
          <TransitionRoot
            :show="$store.state.a.openSidebar"
            as="div"
            class="min-w-[70%]"
            enter="transition-opacity duration-1500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity duration-200"
            leave-from="opacity-0"
            leave-to="opacity-100"
          >
            Reportes
          </TransitionRoot>
        </li>
        <li
        v-if="user.rol === 'Administrador'"
          @click="$router.push('/configuraciones')"
          class="font-medium flex cursor-pointer items-center justify-center space-x-4 rounded-md p-2 transition-all duration-600"
          :class="[$route.path == '/configuraciones' ? 'bg-secundario text-primario' : '']"
        >
        <div class="flex h-7 w-7 items-center justify-center rounded-full">
            <ConfiguracionIco
              :color="$route.path == '/configuraciones' ? '#2166E5' : '#101010'"
            />
          </div>
          <TransitionRoot
            :show="$store.state.a.openSidebar"
            as="div"
            class="min-w-[70%]"
            enter="transition-opacity duration-1500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity duration-200"
            leave-from="opacity-0"
            leave-to="opacity-100"
          >
            Configuración
          </TransitionRoot>
        </li>
      </ul>
    </div>
    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      v{{ version }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, reactive } from "vue";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { auth } from "@/firebase/firebase";
import { TransitionRoot } from "@headlessui/vue";
import DashboardIco from "@/components/iconos/DashboardIco.vue";
import CapturarFolioIco from "@/components/iconos/CapturarFolioIco.vue";
import ConsultarFolioIco from "@/components/iconos/ConsultarFolioIco.vue";
import ReportesIco from "@/components/iconos/ReportesIco.vue";
import ConfiguracionIco from "@/components/iconos/ConfiguracionIco.vue";
import { useUser } from "@/store/user";

const i = ref(0);
const user = useUser();
const userData = reactive({
  displayName: "",
});
const objeto = ref({
  nombre: "Tere",
  edad: 20,
});

const version = __APP_VERSION__;

onAuthStateChanged(auth, (user) => {
  if (user) {
    userData.displayName = user.displayName;
  }
});

const arreglo = ref([]);
const router = useRouter();
</script>
