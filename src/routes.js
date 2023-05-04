import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";
import Preventivo from "./views/Preventivo/Preventivo.vue";
import Dashboard from "./views/Dashboard.vue";
import CapturarFolio from "./views/CapturarFolio.vue";
import Correctivo from "./views/Correctivo/Correctivo.vue";
import Configuraciones from "./views/Configuraciones.vue";
import ConsultarFolios from "./views/ConsultarFolios.vue";
import Mantenimiento from "./views/Mantenimiento.vue";
import Reportes from "./views/Reportes.vue";
// import MantenimientoPreventivo from "./views/MantenimientoPreventivo.vue"
// import MantenimientoCorrectivo from "./views/MantenimientoCorrectivo.vue"
import MantenimientoCorrectivo from "./views/Correctivo.vue";
import MantenimientoPreventivo from "./views/Preventivo.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: "/",
    component: Login,
    name: "login",
    meta: { title: "Login", authorization: false, layout: true, adminRequired: false },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { title: "Dashboard", authorization: true, adminRequired: false },
  },
  {
    path: "/capturar-folio",
    component: CapturarFolio,
    meta: { title: "Capturar Folio", authorization: true, adminRequired: false },
  },
  {
    path: "/capturar-folio/preventivo/:id",
    name: "capturarPreventivo",
    component: Preventivo,
    meta: { title: "Folios preventivos", authorization: true, adminRequired: false },
    props: { control: false },
  },
  {
    path: "/capturar-folio/correctivo/:id",
    name: "capturarCorrectivo",
    component: Correctivo,
    meta: { title: "Folios Correctivos", authorization: true, adminRequired: false },
    props: { control: true },
  },
  {
    path: "/mantenimiento/preventivos/:id",
    name: "mantenimientoPreventivo",
    component: MantenimientoPreventivo,
    meta: { title: "Folios preventivos", authorization: true, adminRequired: false },
    props: { control: false },
  },
  {
    path: "/mantenimiento/correctivos/:id",
    name: "mantenimientoCorrectivo",
    component:  MantenimientoCorrectivo,
    meta: { title: "Folios Correctivos", authorization: true, adminRequired: false },
    props: { control: true },
  },
  {
    path: "/configuraciones",
    name: "Configuraciones",
    component: Configuraciones,
    meta: { title: "", authorization: true, adminRequired: true },
  },
  {
    path: "/reportes",
    name: "reportes",
    component: Reportes,
    meta: { title: "", authorization: true },
  },
  {
    path: "/about",
    meta: { title: "About", authorization: true },
    component: About,
  },
  {
    path: "/consultar-folios",
    name: "consultarFolios",
    component: ConsultarFolios,
    meta: { title: "Consultar Folios", authorization: true },
  },
  { path: "/:path(.*)", component: NotFound, meta: { authorization: true } },
];
