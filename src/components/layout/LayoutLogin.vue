<template>
  <div class="flex h-screen min-h-screen w-screen items-center justify-center">
    <div class="flex h-full min-h-[500px] w-full">

      <!-- Adorno azul marino mostrado en versión web -->
      <div v-show="!mobile" class="flex h-[100%] w-[40%] border-r-2 border-black bg-azul-marino"/>


      <div class="relative flex h-[100%] w-full flex-col items-center justify-center overflow-hidden lg:w-[60%]">

        <!-- Adorno azul marino mostrado en versión movil-->
        <div v-show="mobile" class="absolute top-0 -left-28 h-20 w-64 -rotate-45 border-r-2 border-black bg-azul-marino"/>

        <div class="w-full">

          <!-- Logo de SiOSapp -->
          <div class="mb-12 flex justify-center">
            <img src="/img/SiosApp.svg" width="140" />
          </div>

          <!-- Título del apartado -->

          <div class="flex w-full justify-center">
            <h1 class="pt-2 pb-8 text-[20px] font-medium tracking-wide">
              Iniciar sesión
            </h1>
          </div>

        <!----------------------- Formulario ----------------------->

          <div class="flex w-full flex-col">
            <form @submit.prevent="login" class="flex flex-col items-center justify-center" method="post"
              autocomplete="on">

              <!---------- input usuario ---------->

              <div class="group flex w-[360px] flex-col">
                <label
                  class="font-medium text-gray-800 transition-all duration-500 group-hover:text-primario mb-1"
                  :class="user.errors ? 'text-rojo font-bold' : ''" 
                  >Usuario</label>
                <input
                  class="h-11 rounded-lg border-gray-800 text-black transition-all duration-500 group-hover:border group-hover:border-primario group-hover:placeholder:text-white placeholder:text-[15px]"
                  :class="user.errors ? 'border-rojo border-[2px]' : ''"
                  type="text" id="name" v-model="user.name" placeholder="Nombre de usuario" />

                  <div class="flex justify-end">
                    <label class="-mt-[35px] mr-3 font-[15px] group-hover:text-black transition-all duration-500"
                    :class="user.name == '' ? 'text-gray-300' : 'text-black'"
                    >@ioscomunicaciones.com</label>
                  </div>

              </div>

              <!---------- input contraseña ---------->

              <div class="group mt-4 flex w-[360px] flex-col">
                <label
                class="font-medium text-gray-800 transition-all duration-500 group-hover:text-primario"
                :class="user.errors ? 'text-rojo font-bold' : ''" 
                >Contraseña</label>
                <input
                  class="h-11 rounded-lg border-gray-800 text-black transition-all duration-500 group-hover:border group-hover:border-primario group-hover:placeholder:text-white placeholder:text-[15px]"
                  :class="user.errors ? 'border-rojo border-[2px]' : ''"
                  type="password" id="password" v-model="user.password" placeholder="Escribe tu contraseña" />
              </div>

              <!---------- Mensaje de error ---------->

              <div v-if="user.errors" class="flex bg-[#FEE7E9] rounded-lg mt-2 py-2 px-4 w-[360px] items-center">
                <ExclamationCircleIcon class="w-5 h-5 text-rojo"/>
                <label class="text-[12px] ml-2">{{ user.errors }}</label>
              </div>


              <!----------- Bóton de Iniciar Sesión ---------->

              <div class="mt-5 rounded-lg bg-primario px-[130px] py-3 hover:bg-primario/60">
                <button type="submit" class="text-white ">
                  Iniciar sesión
                </button>
              </div>

              <!---------- Bóton de olvide mi contraseña ---------->
              <!-- <div class="mt-12">
                <a href="#"
                  class="rounded-lg px-12 py-4 font-medium text-primario transition-all duration-500 hover:bg-secundario">Olvidé
                  mi contraseña</a>
              </div> -->

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
import { reactive } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ExclamationCircleIcon } from "@heroicons/vue/outline";
import { useRouter } from "vue-router";
import { auth } from "@/firebase/firebase";

const props = defineProps(["mobile"]);
const router = useRouter();

const user = reactive({
  name: "",
  password: "",
  errors: "",
})

const login = async () => {
 const email = user.name + '@ioscomunicaciones.com'
  await signInWithEmailAndPassword(auth, email, user.password).then((userCredential) => {
      router.push("/dashboard");
    }).catch((e) => {

      switch (e.code) {
        case "auth/invalid-email":
          user.errors = "El correo electrónico es inválido";
          break;

        case "auth/wrong-password":
          user.errors = "Usuario o contraseña incorrecta";
          break;

        case "auth/missing-password":
          user.errors = "Por favor ingresa una contraseña";
          break;

        case "auth/user-not-found":
          user.errors = "Usuario no encontrado";
          break;

        default:
          user.errors = "Por favor intentalo más tarde";
          break;
      }
    })
}
</script>
