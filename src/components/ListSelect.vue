<template>
  <Listbox
    v-model="seleccionado"
    :model-value="props.default"
    :disabled="props.dataArray.length == 0 ? true : false"
  >
    <div class="relative mt-1 w-full">
      <ListboxButton
        :class="[
          'relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
          props.dataArray.length == 0 ? 'cursor-not-allowed bg-gray-200' : '',
        ]"
      >
        <span class="block truncate">{{
          seleccionado
            ? seleccionado.name
              ? seleccionado.name
              : seleccionado.nombre
              ? seleccionado.nombre
              : seleccionado
            : props.label
        }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <SelectorIcon class="h-5 w-5" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="element in props.dataArray"
            :value="element"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-[#E9F0FC] text-black' : 'text-black',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{
                  element.name
                    ? element.name
                    : element.nombre
                    ? element.nombre
                    : element
                }}</span
              >
              <!-- <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span> -->
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { watch, ref, onMounted, onUpdated } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

const seleccionado = ref();
const oldValueDefault = ref();
const props = defineProps(["dataArray", "label", "default"]);
const emits = defineEmits(["inputValue"]);

// onMounted(() => {
//   if (props.default) {
//     seleccionado.value = props.default
//   }
// });

// onUpdated(() => {
//   if (props.default != undefined) {
//     if (oldValueDefault.value != props.default) {
//         console.log(props.label);
//         seleccionado.value = props.default;
//         oldValueDefault.value = props.default;
//       }
//   }
// });

onMounted(() => {
  if (props.default != undefined) {
    if (oldValueDefault.value != props.default) {
      seleccionado.value = props.default;
      oldValueDefault.value = props.default;
    }
  }
});

watch(seleccionado, (value) => {
  emits("inputValue", value);
});
</script>
