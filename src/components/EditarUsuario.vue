<template>
  <TransitionRoot appear :show="openEditar" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="flex w-full max-w-5xl transform flex-col space-y-6 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Editar usuario
              </DialogTitle>
              <div>
                <div class="mb-4 max-h-[70px] overflow-y-auto">
                  <ul>
                    <li
                      v-for="error in functionError"
                      class="text-sm text-red-400"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
                <form class="flex w-full flex-col justify-between">
                  <div class="flex justify-between">
                    <!-- Datos -->
                    <div class="basis-[50%]">
                      <div class="flex flex-col">
                        <h2>Datos</h2>
                        <div class="h-0.5 w-2/3 bg-[#D9D9D9]"></div>
                      </div>
                      <div class="mt-6 flex flex-col space-y-2">
                        <!-- nombre -->
                        <div class="flex flex-col">
                          <label class="text-sm text-[#C4C4C4]" for="name"
                            >Nombre</label
                          >
                          <input
                            v-model="infoUser.displayName"
                            class="max-w-sm rounded-md border-2 border-[#C4C4C4] font-semibold placeholder:font-normal focus:ring-0"
                            type="text"
                            id="name"
                            placeholder="Nombre"
                          />
                          <p
                            v-for="error of $v.displayName.$errors"
                            :key="error.$uid"
                            class="text-sm text-red-400"
                          >
                            {{ error.$message }}
                          </p>
                        </div>
                        <!-- contraseña -->
                        <div class="flex flex-col">
                          <label class="text-sm text-[#C4C4C4]" for="password"
                            >Contraseña</label
                          >
                          <input
                            v-model="infoUser.password"
                            class="max-w-sm rounded-md border-2 border-[#C4C4C4] font-semibold placeholder:font-normal focus:ring-0"
                            type="password"
                            id="password"
                          />
                          <p
                            v-for="error of $v.password.$errors"
                            :key="error.$uid"
                            class="text-sm text-red-400"
                          >
                            {{ error.$message }}
                          </p>
                        </div>
                        <div class="flex max-w-sm justify-end">
                          <button
                            @click="actualizarUsuario"
                            :class="[
                              'flex min-w-[100px] justify-center rounded-lg bg-[#2166E5] py-2 px-4 font-semibold text-white',
                            ]"
                            type="button"
                          >
                            <svg
                              v-if="loading"
                              aria-hidden="true"
                              class="duration-900 h-6 w-7 animate-spin fill-secundario text-gray-200 dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <div v-else>Guardar</div>
                          </button>
                        </div>
                        <SwitchGroup>
                          <SwitchLabel class="mr-4"
                            >Login de usuario</SwitchLabel
                          >
                          <Switch
                            v-model="enabled"
                            :class="enabled ? 'bg-primario' : 'bg-[#90B3F2]'"
                            class="relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            <span class="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              :class="
                                enabled ? 'translate-x-5' : 'translate-x-0'
                              "
                              class="pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                            />
                          </Switch>
                        </SwitchGroup>
                      </div>
                    </div>
                    <!-- Rol -->
                    <div class="basis-[50%]">
                      <div class="flex justify-between">
                        <div class="relative w-[75%]">
                          <h2>Rol</h2>
                          <div class="h-0.5 w-full bg-[#D9D9D9]"></div>
                          <div class="absolute -top-3 right-0">
                            <button
                              @click="updateRolFunc"
                              :disabled="!updatingRol"
                              type="button"
                              :class="[
                                'flex min-w-[100px] justify-center rounded-lg bg-[#2166E5] py-1 px-3 font-semibold text-white',
                                updatingRol
                                  ? 'cursor-pointer bg-[#2166E5]'
                                  : 'cursor-not-allowed bg-[#2166E5]/70',
                              ]"
                            >
                              Guardar rol
                            </button>
                          </div>
                        </div>
                      </div>
                      <!-- Rol select -->
                      <div class="mt-6">
                        <label class="text-sm text-[#C4C4C4]" for="rol"
                          >Rol</label
                        >
                        <Listbox v-model="infoUser.rol">
                          <div class="relative">
                            <ListboxButton
                              class="shadow- relative w-full max-w-sm cursor-pointer rounded-md border-2 border-[#C4C4C4] bg-white py-2 pl-3 pr-10 text-left font-semibold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                            >
                              <span class="block truncate">{{
                                infoUser.rol.name
                              }}</span>
                              <span
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                              >
                                <SelectorIcon
                                  class="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </ListboxButton>

                            <transition
                              leave-active-class="transition duration-100 ease-in"
                              leave-from-class="opacity-100"
                              leave-to-class="opacity-0"
                            >
                              <ListboxOptions
                                class="absolute z-30 mt-1 max-h-60 w-full max-w-sm overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                <ListboxOption
                                  v-slot="{ active, selected }"
                                  v-for="role in rolData.roles"
                                  :key="role.name"
                                  :value="role"
                                  as="template"
                                >
                                  <li
                                    :class="[
                                      active ? 'bg-gray-100' : 'text-gray-900',
                                      'relative w-full cursor-default select-none py-2 pl-10 pr-4',
                                    ]"
                                  >
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-medium'
                                          : 'font-normal',
                                        'block w-full truncate',
                                      ]"
                                      >{{ role.name }}</span
                                    >
                                    <span
                                      v-if="selected"
                                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                                    >
                                      <CheckIcon
                                        class="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </li>
                                </ListboxOption>
                              </ListboxOptions>
                            </transition>
                          </div>
                        </Listbox>
                      </div>
                      <!-- relacion supervisor -->
                      <div
                        v-if="
                          infoUser.rol.name === 'Supervisor' &&
                          infoUser.oldRol.name === 'Supervisor'
                        "
                        class="mt-6 flex h-auto w-full justify-between"
                      >
                        <!-- distritos -->
                        <div class="flex basis-[50%] flex-col">
                          <div>
                            <label class="text-sm text-[#C4C4C4]" for="rol"
                              >Distritos</label
                            >
                            <Listbox v-model="infoUser.distritos" multiple>
                              <div class="relative">
                                <ListboxButton
                                  class="shadow- relative max-w-xs cursor-pointer rounded-md border-2 border-[#C4C4C4] bg-white py-2 pl-3 pr-10 text-left font-semibold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                                >
                                  <span class="block truncate"
                                    >Asignar distrito</span
                                  >
                                  <span
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                  >
                                    <SelectorIcon
                                      class="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </ListboxButton>

                                <transition
                                  leave-active-class="transition duration-100 ease-in"
                                  leave-from-class="opacity-100"
                                  leave-to-class="opacity-0"
                                >
                                  <ListboxOptions
                                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    <ListboxOption
                                      v-slot="{ active, selected }"
                                      v-for="distrito in distritosData"
                                      :key="distrito.name"
                                      :value="distrito.name"
                                      :disabled="distrito.disabled"
                                      as="template"
                                    >
                                      <li
                                        :class="[
                                          active
                                            ? 'bg-gray-100'
                                            : 'text-gray-900',
                                          'relative w-full cursor-default select-none py-2 pl-9 pr-4',
                                        ]"
                                      >
                                        <span
                                          :class="[
                                            selected
                                              ? 'font-medium'
                                              : 'font-normal',
                                            'block w-full truncate',
                                          ]"
                                          >{{ distrito.name }}</span
                                        >
                                        <span
                                          v-if="selected"
                                          class="absolute inset-y-0 left-0 flex items-center pl-3"
                                        >
                                          <CheckIcon
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      </li>
                                    </ListboxOption>
                                  </ListboxOptions>
                                </transition>
                              </div>
                            </Listbox>
                          </div>
                          <!-- Lista distritos -->
                          <div
                            class="mt-6 h-[150px] max-h-[150px] overflow-y-auto"
                          >
                            <ul>
                              <div class="text-sm text-[#C4C4C4]">
                                Distritos
                              </div>
                              <div class="h-[1px] w-40 bg-[#C4C4C4]/50"></div>
                              <li
                                v-for="(value, index) in infoUser.distritos"
                                class="flex items-center space-x-4"
                              >
                                <div
                                  @click="eliminarDistrito(index)"
                                  class="cursor-pointer"
                                >
                                  <XCircleIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div>{{ value }}</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <!-- tecnicos -->
                        <div class="basis-[45%]">
                          <div>
                            <label class="text-sm text-[#C4C4C4]" for="rol"
                              >Técnicos</label
                            >
                            <Listbox v-model="infoUser.tecnicos" multiple>
                              <div class="relative">
                                <ListboxButton
                                  class="shadow- relative max-w-xs cursor-pointer rounded-md border-2 border-[#C4C4C4] bg-white py-2 pl-3 pr-10 text-left font-semibold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                                >
                                  <span class="block truncate"
                                    >Asignar técnicos</span
                                  >
                                  <span
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                  >
                                    <SelectorIcon
                                      class="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </ListboxButton>

                                <transition
                                  leave-active-class="transition duration-100 ease-in"
                                  leave-from-class="opacity-100"
                                  leave-to-class="opacity-0"
                                >
                                  <ListboxOptions
                                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    <ListboxOption
                                      v-slot="{ active, selected }"
                                      v-for="tecnico in tecnicosData"
                                      :key="tecnico.name"
                                      :value="tecnico"
                                      :disabled="tecnico.disabled"
                                      as="template"
                                    >
                                      <li
                                        :class="[
                                          active
                                            ? 'bg-gray-100'
                                            : 'text-gray-900',
                                          'relative w-full cursor-default select-none py-2 pl-9 pr-4',
                                        ]"
                                      >
                                        <span
                                          :class="[
                                            selected
                                              ? 'font-medium'
                                              : 'font-normal',
                                            'block w-full truncate',
                                          ]"
                                          >{{ tecnico.name }}</span
                                        >
                                        <span
                                          v-if="selected"
                                          class="absolute inset-y-0 left-0 flex items-center pl-3"
                                        >
                                          <CheckIcon
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      </li>
                                    </ListboxOption>
                                  </ListboxOptions>
                                </transition>
                              </div>
                            </Listbox>
                          </div>

                          <!-- list tecnicos -->
                          <div
                            class="mt-6 h-[150px] max-h-[150px] overflow-y-auto"
                          >
                            <div class="text-sm text-[#C4C4C4]">Técnicos</div>
                            <div class="h-[1px] w-40 bg-[#C4C4C4]/50"></div>
                            <ul>
                              <li
                                v-for="(value, index) in infoUser.tecnicos"
                                class="flex items-center space-x-4"
                              >
                                <div
                                  @click="eliminarTecnico(index)"
                                  class="cursor-pointer"
                                >
                                  <XCircleIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div>{{ value.name }}</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex w-full justify-end space-x-12 pr-12">
                    <button
                      @click="closeModal()"
                      type="button"
                      class="rounded-lg border-2 border-[#2166E5] bg-white py-2 px-4 font-semibold text-[#2166E5]"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ChevronDownIcon, CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { XCircleIcon } from "@heroicons/vue/outline";
import useVuelidate from "@vuelidate/core";
import { auth, functions } from "@/firebase/firebase";
import { updateProfile, updatePassword } from "firebase/auth";
import {
  helpers,
  required,
  requiredIf,
  minLength,
  maxLength,
  sameAs,
  not,
} from "@vuelidate/validators";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  getDatabase,
  ref as refDB,
  get,
  query,
  equalTo,
  orderByChild,
  update,
  remove,
} from "@firebase/database";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const functionsFirebase = {
  disable: httpsCallable(functions, "disableUser"),
  enable: httpsCallable(functions, "enableUser"),
  updateRol: httpsCallable(functions, "updateRol"),
};
const enabled = ref(false);
const props = defineProps(["openEditar", "data"]);
const emit = defineEmits(["closeModalEditar"]);
const updateUser = httpsCallable(functions, "updateUser"); // Función para crear usuario desde firebase function
const db = getDatabase();
const functionError = ref([]);
const loading = ref(false);
const controlState = ref(false);
const updatingRol = ref(false);
const control = reactive({
  distritos: false,
  tecnicos: false,
});

// Data Rol
const rolData = ref({
  roles: [
    { name: "Administrador" },
    { name: "Despacho" },
    { name: "Supervisor" },
    { name: "Técnico" },
  ],
});

const tecnicosData = reactive([]);

const distritosData = reactive([]);

// User Data
const userData = reactive({
  name: "prueba",
  password: null,
  rol: { name: "Rol" },
  distritos: [],
  tecnicos: [],
});

const infoUser = reactive({
  displayName: props.data.name,
  password: "",
  rol: { name: props.data.rol },
  oldRol: { name: props.data.rol },
  userKey: props.data.key,
  distritos: [],
  tecnicos: [],
});

// Validaciones
const rules = computed(() => {
  return {
    displayName: {
      requiredName: helpers.withMessage("Campo requerido.", required),
      minLengthValue: helpers.withMessage(
        "El campo no puede ser menor a 2 caracteres.",
        minLength(2)
      ),
      maxLengthValue: helpers.withMessage(
        "El campo tiene demasiados caracteres",
        maxLength(50)
      ),
    },
    password: {
      minLengthValue: helpers.withMessage(
        "El campo no puede ser menor a 8 caracteres.",
        minLength(8)
      ),
    },
  };
});

const $v = useVuelidate(rules, infoUser);

const fetchData = async () => {
  tecnicosData.splice(0);
  infoUser.distritos.splice(0);
  infoUser.tecnicos.splice(0);

  const result = query(
    refDB(db, "usuarios"),
    orderByChild("rol"),
    equalTo("Técnico")
  );

  // Obtener técnicos
  await get(
    query(refDB(db, "usuarios"), orderByChild("rol"), equalTo("Técnico"))
  ).then((snapshot) => {
    snapshot.forEach((elements) => {
      tecnicosData.push({
        key: elements.key,
        name: elements.val().displayName,
        disabled: false,
      });
    });
  });

  // obtener distritos
  await get(refDB(db, `catalogo/distritos`)).then((snapshot) => {
    snapshot.forEach((elements) => {
      distritosData.push({ name: elements.key, disabled: false });
    });
  });
};

await fetchData();

onMounted(async () => {
  enabled.value = !props.data.disabled;
  infoUser.name = props.data.displayName;
  infoUser.rol = rolData.value.roles.filter((element) => {
    if (element.name === props.data.rol) return element;
  })[0];

  if (props.data.rol === "Supervisor") {
    await get(refDB(db, `catalogo/supervisores/${props.data.key}`)).then(
      (snapshot) => {
        if (snapshot.hasChild("distritos")) {
          infoUser.distritos = snapshot.val().distritos;
          for (let distritoDB in snapshot.val().distritos) {
            for (let distrito in distritosData) {
              if (
                distritosData[distrito].name ===
                snapshot.val().distritos[distritoDB]
              ) {
                distritosData[distrito].disabled = true;
              }
            }
          }
        }
      }
    );
    await get(refDB(db, `catalogo/supervisores/${props.data.key}`)).then(
      (snapshot) => {
        if (snapshot.hasChild("tecnicos")) {
          for (let tecnico in snapshot.val().tecnicos) {
            infoUser.tecnicos.push(
              tecnicosData.filter((element) => element.key.includes(tecnico))[0]
            );
          }
        }
      }
    );
  }
});

// Eliminar técnico de la lista
const eliminarTecnico = async (index) => {
  for (let tecnico in tecnicosData) {
    if (tecnicosData[tecnico].name === infoUser.tecnicos[index].name) {
      tecnicosData[tecnico].disabled = false;
    }
  }
  await remove(
    refDB(
      db,
      `catalogo/supervisores/${infoUser.userKey}/tecnicos/${infoUser.tecnicos[index].key}`
    )
  );
  infoUser.tecnicos.splice(index, 1);
};

// Eliminar distritos de la lista
const eliminarDistrito = async (index) => {
  for (let distrito in distritosData) {
    if (distritosData[distrito].name === infoUser.distritos[index]) {
      distritosData[distrito].disabled = false;
    }
  }
  console.log(infoUser.distritos[index]);

  await remove(
    refDB(db, `catalogo/distritos/Distrito 2/supervisores/${infoUser.userKey}`)
  );
  infoUser.distritos.splice(index, 1);
  await remove(
    refDB(db, `catalogo/supervisores/${infoUser.userKey}/distritos`)
  );
  await update(
    refDB(db, `catalogo/supervisores/${infoUser.userKey}/distritos`),
    { ...infoUser.distritos }
  );
};

const resetModal = () => {
  delete infoUser.distritos;
  delete infoUser.email;
  delete infoUser.lastname;
  delete infoUser.name;
  delete infoUser.password;
  delete infoUser.password_confirm;
  infoUser.rol = { name: "Rol" };
  infoUser.distritos = [];
  infoUser.tecnicos = [];
  $v.value.$reset();
};

const closeModal = () => {
  emit("closeModalEditar");
  resetModal();
};

const actualizarUsuario = async () => {
  loading.value = true;
  let result = await $v.value.$validate();
  if (result) {
    await updateUser({
      userKey: infoUser.userKey,
      displayName: infoUser.displayName,
      password: infoUser.password,
    })
      .then(async (result) => {
        infoUser.password = "";
        loading.value = false;
        await update(refDB(db, `usuarios/${infoUser.userKey}`), {
          displayName: infoUser.displayName,
          updated: new Date().getTime(),
        });
      })
      .catch((error) => {
        infoUser.password = "";
        loading.value = false;
        console.log(error);
      });
  }
  loading.value = false;
};

watch(enabled, async () => {
  if (enabled.value === true) {
    await functionsFirebase.enable(infoUser.userKey);
  } else {
    await functionsFirebase.disable(infoUser.userKey);
  }
  controlState.value = true;
});

watch(
  () => infoUser.rol,
  (newValue, oldValue) => {
    console.log(newValue.name, infoUser.oldRol.name);
    if (newValue.name != infoUser.oldRol.name) {
      updatingRol.value = true;
    } else {
      updatingRol.value = false;
    }
  }
);

const updateRolFunc = async () => {
  let result = confirm("Presiona el botón");
  if (!result) {
    infoUser.rol = rolData.value.roles.filter((element) => {
      if (element.name === props.data.rol) return element;
    })[0];
  } else {
    await functionsFirebase
      .updateRol({ uid: infoUser.userKey, rol: infoUser.rol })
      .then(async (result) => {
        if (infoUser.rol.name === "Supervisor")
          await update(refDB(db, `catalogo/supervisores/${infoUser.userKey}`), {
            nombre: infoUser.displayName,
            creado: new Date().getTime(),
          });

        // Si era supervisor eliminar relaciones
        if (
          infoUser.oldRol.name === "Supervisor" &&
          infoUser.rol.name != "Supervisor"
        ) {
          await remove(refDB(db, `catalogo/supervisores/${infoUser.userKey}`));
          infoUser.distritos.forEach((distrito) => {
            remove(
              refDB(
                db,
                `catalogo/distritos/${distrito}/supervisores/${infoUser.userKey}`
              )
            );
          });
        }
        // Si era técnico eliminar relaciones
        if (
          infoUser.oldRol.name === "Técnico" &&
          infoUser.rol.name != "Técnico"
        ) {
          await get(refDB(db, `catalogo/supervisores`)).then((snapshot) => {
            snapshot.forEach((element) => {
              if (element.hasChild("tecnicos")) {
                for (let tecnico in element.val().tecnicos) {
                  if (tecnico === infoUser.userKey) {
                    remove(
                      refDB(
                        db,
                        `catalogo/supervisores/${element.key}/tecnicos/${tecnico}`
                      )
                    );
                  }
                }
              }
            });
          });
        }
        updatingRol.value = false;
        infoUser.oldRol.name = infoUser.rol.name;
      });
  }
};

watch(
  () => infoUser.distritos,
  async (newValue, oldValue) => {
      if (newValue.length > oldValue.length) {
        await update(
          refDB(
            db,
            `catalogo/distritos/${newValue[newValue.length - 1]}/supervisores/${
              infoUser.userKey
            }`
          ),
          { nombre: infoUser.displayName }
        );
        await update(
          refDB(db, `catalogo/supervisores/${infoUser.userKey}/distritos`),
          { ...infoUser.distritos }
        );
        for (let distrito in distritosData) {
          if (distritosData[distrito].name === newValue[newValue.length - 1]) {
            distritosData[distrito].disabled = true;
          }
        }
      }
  }
);

watch(
  () => infoUser.tecnicos,
  async (newValue, oldValue) => {
    if (newValue.length > oldValue.length) {
      await update(
        refDB(
          db,
          `catalogo/supervisores/${infoUser.userKey}/tecnicos/${
            newValue[newValue.length - 1].key
          }`
        ),
        { nombre: newValue[newValue.length - 1].name }
      );
      for (let tecnico in tecnicosData) {
        console.log(
          tecnicosData[tecnico].name,
          newValue[newValue.length - 1].name
        );
        if (tecnicosData[tecnico].name === newValue[newValue.length - 1].name) {
          tecnicosData[tecnico].disabled = true;
        }
      }
    }
  }
);
</script>
