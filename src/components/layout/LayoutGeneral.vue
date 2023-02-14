<script setup>
import { ref } from "vue";
import Sidebar from "@/views/Sidebar.vue";
import Navbar from "@/views/Navbar.vue";
import SidebarMobile from "../SidebarMobile.vue";
import NavbarMobile from "@/components/NavbarMobile.vue";

const props = defineProps(["mobile"])
</script>

<template>
  <div class="flex h-screen w-screen">
    <Sidebar v-if="!props.mobile" />
    <SidebarMobile v-else />
    <div class="flex h-screen w-full flex-col">
      <Navbar v-if="!props.mobile" />
      <NavbarMobile v-else />
      <div class="flex h-screen overflow-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>
