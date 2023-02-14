<script setup>
import { ref } from 'vue'
import BotonPreventivo from './components/BotonPreventivo.vue';
import LayoutGeneral from './components/layout/LayoutGeneral.vue';
import LayoutLogin from './components/layout/LayoutLogin.vue';

const mobile = ref(false);

const checkScreen = () => {
  const windowsWidth = window.innerWidth;
  if (windowsWidth <= 768) {
    mobile.value = true;
    return;
  }
  mobile.value = false;
  // store.state.c.mobileNav = false;
  return;
};

window.addEventListener("resize", checkScreen);
checkScreen();
</script>

<template>
   <component :is="$route.meta?.layout ? LayoutLogin : LayoutGeneral " :mobile="mobile"> <router-view /> </component>
</template>
