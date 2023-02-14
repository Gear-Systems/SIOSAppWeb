<template>
  <div class="flex h-screen min-h-screen w-screen items-center justify-center">
    <div class="flex h-[70%] min-h-[500px] w-[70%] bg-red-200">
      <div
        class="flex h-[100%] w-[50%] border-r-2 text-white border-black bg-green-200"
      ></div>
      <div class="flex h-[100%] w-[50%] flex-col items-center bg-orange-200">
        <div class="mt-10 mb-10 flex w-full justify-center">
          <span class="text-3xl font-semibold tracking-wide"
            >Iniciar Sesión</span
          >
        </div>
        <div
          v-if="errorMessage"
          class="mb-10 flex w-[80%] place-content-around items-center rounded-md bg-red-400"
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
        <div class="flex w-full flex-col items-center justify-center">
          <form
            @submit.prevent="login"
            class="flex flex-col items-center justify-center space-y-14"
            method="post"
            autocomplete="on"
          >
            <input
              class="font-bold text-black"
              type="text"
              id="correo"
              v-model="correo"
              placeholder="Correo"
              required
            />
            <input
              class="font-bold text-black"
              type="password"
              id="pass"
              v-model="pass"
              placeholder="Contraseña"
              required
              minlength="6"
            />
            <span class="text-sm font-bold text-black"
              >Olvidé mi contraseña</span
            >
            <button
              type="submit"
              class="bg-[#C4C4C4] px-20 py-2 hover:bg-[#C4C4C4]/80"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { validacion } from "../validaciones/login.js";
import { ExclamationIcon, XIcon } from "@heroicons/vue/solid";
import { useRouter } from "vue-router";

const correo = ref("");
const pass = ref("");
const auth = getAuth();
const errorMessage = ref("");
const router = useRouter();

const login = () => {
  signInWithEmailAndPassword(auth, correo.value, pass.value)
    .then((userCredential) => {
      console.log(userCredential);
      router.push("/capturar-folio");
    })
    .catch((error) => {
      errorMessage.value = validacion(error);
    });
};
const vaciarErrores = () => {
  errorMessage.value = "";
};
</script>
