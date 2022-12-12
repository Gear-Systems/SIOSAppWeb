<template>
  <div class="flex flex-col space-y-6">
    <!-- Buscador -->
    <div class="flex items-center justify-center">
      <div class="relative">
        <input
          v-model="query"
          class="max-w-sm rounded-md border-[#7C8495] bg-transparent pr-10 font-semibold placeholder:font-normal focus:ring-0"
          type="text"
          id="name"
          placeholder="Buscar"
        />
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <SearchIcon class="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </div>
    <div class="flex flex-col">
      <ul
      class="flex max-h-[220px] min-h-[220px] flex-col overflow-auto p-2"
      >
        <li
          v-for="(item, index) in filteredData"
          :key="item.nombre"
          :class="[
            'flex w-full px-2',
            index % 2 === 0 ? 'bg-transparent' : 'bg-[#E5E6EA]',
          ]"
        >
          <div class="flex basis-full items-center">
            {{ item.nombre }}
          </div>
          <div class="basis-auto p-1">
            <CausasDropdownMenu :data="item" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { SearchIcon, DotsVerticalIcon } from "@heroicons/vue/outline";
import CausasDropdownMenu from "./CausasDropdownMenu.vue";

const query = ref("");
const props = defineProps(["causasData"]);

// Filtrar datos
const filteredData = computed(() =>
  query.value === ""
    ? props.causasData
    : props.causasData.filter((item) =>
        item.nombre
          .toLowerCase()
          .includes(query.value.toLowerCase())
      )
);
</script>
