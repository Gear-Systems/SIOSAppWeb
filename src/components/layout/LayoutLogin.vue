<template>
  <div class="flex h-screen min-h-screen w-screen items-center justify-center">
    <div class="flex h-full min-h-[500px] w-full">
      <div
        v-show="!mobile"
        class="flex h-[100%] w-[40%] border-r-2 border-black bg-azul-marino"
      ></div>
      <div
        class="relative flex h-[100%] w-full flex-col items-center justify-center overflow-hidden lg:w-[60%]"
      >
        <div
        v-show="mobile"
          class="absolute top-0 -left-28 h-20 w-64 -rotate-45 border-r-2 border-black bg-azul-marino"
        ></div>
        <!-- Formulario -->
        <div class="w-full">
          <div class="mb-12 flex justify-center">
            <img src="/img/SiosApp.svg" width="140" />
          </div>
          <div class="flex w-full justify-center">
            <h1 class="py-8 text-2xl font-semibold tracking-wide">
              Iniciar Sesión
            </h1>
          </div>
          <!-- errores -->
          <div class="flex justify-center">
            <div
              v-if="errorMessage"
              class="mb-10 flex w-[60%] place-content-around items-center justify-center space-x-4 rounded-md bg-red-400"
            >
              <ExclamationIcon class="h-5 w-5 text-white" aria-hidden="true" />
              <span class="py-0.5 text-center text-sm text-white">{{
                errorMessage
              }}</span>
              <XIcon
                class="h-5 w-5 text-white hover:cursor-pointer"
                @click="vaciarErrores"
                aria-hidden="true"
              />
            </div>
          </div>
          <div class="flex w-full flex-col">
            <form
              @submit.prevent="login"
              class="flex flex-col items-center justify-center"
              method="post"
              autocomplete="on"
            >
              <!-- input usuario -->
              <div class="group flex w-[360px] flex-col">
                <label
                  class="font-medium text-gray-400 transition-all duration-500 group-hover:text-primario"
                  >Usuario</label
                >
                <input
                  class="rounded-lg border-secundario bg-secundario font-medium text-black transition-all duration-500 group-hover:border group-hover:border-primario group-hover:placeholder:text-secundario"
                  type="text"
                  id="correo"
                  v-model="correo"
                  placeholder="Nombre de usuario"
                  required
                />
              </div>
              <!-- input contraseña -->
              <div class="group mt-4 flex w-[360px] flex-col">
                <label
                  class="font-medium text-gray-400 transition-all duration-500 group-hover:text-primario"
                  >Contraseña</label
                >
                <input
                  class="rounded-lg border-secundario bg-secundario font-medium text-black transition-all duration-500 group-hover:border group-hover:border-primario group-hover:placeholder:text-secundario"
                  type="password"
                  id="pass"
                  v-model="pass"
                  placeholder="Ingresar contraseña"
                  required
                  minlength="6"
                />
              </div>
              <div class="mt-12">
                <button
                  type="submit"
                  class="rounded-lg bg-primario px-8 py-2 text-white hover:bg-primario/60"
                >
                  Iniciar sesión
                </button>
              </div>
              <div class="mt-12">
                <a
                  href="#"
                  class="rounded-lg px-12 py-4 font-medium text-primario transition-all duration-500 hover:bg-secundario"
                  >Olvidé mi contraseña</a
                >
              </div>
            </form>
            <div class="mt-14 flex justify-center text-sm">
              <span>IOS Comunicaciones {{ new Date().getFullYear() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { validacion } from "@/validaciones/login.js";
import { ExclamationIcon, XIcon } from "@heroicons/vue/solid";
import { useRouter } from "vue-router";

const correo = ref("");
const pass = ref("");
const auth = getAuth();
const errorMessage = ref("");
const router = useRouter();
const props = defineProps(["mobile"]);

const login = () => {
  signInWithEmailAndPassword(auth, correo.value, pass.value)
    .then((userCredential) => {
      console.log(userCredential);
      // localStorage.setItem('toggleButton', true);
      router.push("/dashboard");
    })
    .catch((error) => {
      errorMessage.value = validacion(error);
    });
};
const vaciarErrores = () => {
  errorMessage.value = "";
};
</script>
