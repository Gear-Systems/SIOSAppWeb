import { createApp } from "vue";
import "./tailwind.css";
import App from "./App.vue";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import { store } from "./store/index.js";
import { auth } from "../src/firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import 'v-calendar/dist/style.css';
import 'flowbite';
import { createPinia } from 'pinia'
import { useUser } from "@/store/user";

const pinia =  createPinia();
const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (to.meta.authorization && localStorage.getItem("user") === "false") {
    return { path: "/" };
  }
  if (to.name == 'login' && localStorage.getItem("user") === "true") {
    return { path: "/dashboard" };
  }
  if(to.meta.adminRequired && localStorage.getItem("rol") != "Administrador") {
    alert("No tienes permisos");
    return { path: "/dashboard" }
  }
  // if (to.name == 'capturarCorrectivo'  && to.params.control == undefined) {
  //   return { path: "/capturar-folio" };
  // }
});

app.use(pinia)
app.use(store);
app.use(router);
app.mount("#app");

const userPinia = useUser();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const claims = await user.getIdTokenResult();
    localStorage.setItem("user", true);
    localStorage.setItem("rol", claims.claims.name ? claims.claims.name : "Administrador")
    userPinia.setUserRol(claims.claims.name ? claims.claims.name : "Administrador");
  } else {
    localStorage.setItem("user", false);
    localStorage.removeItem("rol");
    userPinia.setUserRol(""); 
  }
});
