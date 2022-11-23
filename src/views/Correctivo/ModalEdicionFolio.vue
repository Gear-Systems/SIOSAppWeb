<template>
  <div>
    <TransitionRoot
      appear
      :show="$store.state.a.modalEdicionFolio"
      as="template"
      class="z-50"
    >
      <Dialog as="div" @close="closeModal" class="relative z-[999]">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25"></div>
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
                class="w-full max-w-2xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="div"
                  class="mb-5 flex items-center text-lg font-medium leading-6 text-gray-900"
                >
                  <div class="flex w-[80%] text-2xl font-bold">
                    <h3>Folio Correctivo</h3>
                  </div>
                  <div class="flex w-[40%] justify-between">
                    <button
                      @click="restablecer()"
                      :class="[
                        'flex text-sm',
                        buttonDisabled ? 'text-gray-400' : '',
                      ]"
                      :disabled="buttonDisabled"
                    >
                      <RefreshIcon
                        class="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />Restablecer
                    </button>
                    <XCircleIcon
                      @click="closeModal()"
                      class="h-6 w-6 cursor-pointer"
                    />
                  </div>
                </DialogTitle>
                <div class="flex w-[100%] flex-col items-center justify-center">
                  <div class="my-2 flex w-[100%] items-center justify-center">
                    <div
                      class="flex w-2/3 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Ingresar folio
                      <input
                        v-model="infoSelected.folio"
                        placeholder="000"
                        :class="[
                          'mt-1 h-10 w-[95%] rounded-lg border-2 border-[#E5E5E5] bg-white text-black',
                          errores.folio.error ? 'border-red-400' : '',
                          loading
                            ? 'animate-pulse bg-gray-100 text-gray-500'
                            : '',
                        ]"
                        type="text"
                        name="folio"
                        id="folio"
                      />
                      <Transition
                        leave-active-class="transition duration-200 ease-in"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                        enter-active-class="transition duration-200 ease-in"
                        enter-from-class="opacity-0"
                        enter-to-class="opacity-100"
                      >
                        <span v-if="errores.folio.error" class="text-red-400">
                          {{ errores.folio.message }}
                        </span>
                      </Transition>
                    </div>
                    <div
                      class="flex w-1/3 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Tipo
                      <div class="flex w-[100%]">
                        <Listbox
                          v-model="infoSelected.tipoFolio"
                          :disabled="
                            infoData.tipoFolios.length == 0 ? true : false
                          "
                        >
                          <div class="relative mt-1 w-full">
                            <ListboxButton
                              :class="[
                                'relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
                                infoData.tipoFolios.length == 0
                                  ? 'cursor-not-allowed bg-gray-200'
                                  : '',
                              ]"
                            >
                              <span class="block truncate">{{
                                infoSelected.tipoFolio
                                  ? infoSelected.tipoFolio.name
                                    ? infoSelected.tipoFolio.name
                                    : infoSelected.tipoFolio.nombre
                                    ? infoSelected.tipoFolio.nombre
                                    : infoSelected.tipoFolio
                                  : "Tipo de folio"
                              }}</span>
                              <span
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                              >
                                <SelectorIcon
                                  class="h-5 w-5"
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
                                class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                <ListboxOption
                                  v-slot="{ active, selected }"
                                  v-for="element in infoData.tipoFolios"
                                  :value="element"
                                  as="template"
                                >
                                  <li
                                    :class="[
                                      active
                                        ? 'bg-[#E9F0FC] text-black'
                                        : 'text-black',
                                      'relative cursor-default select-none py-2 pl-10 pr-4',
                                    ]"
                                  >
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-medium'
                                          : 'font-normal',
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
                                    <span
                                      v-if="selected"
                                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
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
                    </div>
                  </div>
                  <div class="mb-4 flex w-[100%] items-center justify-between">
                    <div
                      class="mr-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Distrito
                      <div class="flex w-[100%]">
                        <Listbox
                          v-model="infoSelected.distrito"
                          :disabled="
                            infoData.distritos.length == 0 ? true : false
                          "
                        >
                          <div class="relative mt-1 w-full">
                            <ListboxButton
                              :class="[
                                'relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
                                infoData.distritos.length == 0
                                  ? 'cursor-not-allowed bg-gray-200'
                                  : '',
                              ]"
                            >
                              <span class="block truncate">{{
                                infoSelected.distrito
                                  ? infoSelected.distrito.name
                                    ? infoSelected.distrito.name
                                    : infoSelected.distrito.nombre
                                    ? infoSelected.distrito.nombre
                                    : infoSelected.distrito
                                  : "Selecciona un distrito"
                              }}</span>
                              <span
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                              >
                                <SelectorIcon
                                  class="h-5 w-5"
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
                                class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                <ListboxOption
                                  v-slot="{ active, selected }"
                                  v-for="element in infoData.distritos"
                                  :value="element"
                                  as="template"
                                >
                                  <li
                                    :class="[
                                      active
                                        ? 'bg-[#E9F0FC] text-black'
                                        : 'text-black',
                                      'relative cursor-default select-none py-2 pl-10 pr-4',
                                    ]"
                                  >
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-medium'
                                          : 'font-normal',
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
                                    <span
                                      v-if="selected"
                                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
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
                    </div>
                    <div
                      class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Cluster
                      <div class="flex w-[100%]">
                        <Listbox
                          v-model="infoSelected.clusters"
                          :disabled="
                            infoSelected.distrito.length == 0 ? true : false
                          "
                        >
                          <div class="relative mt-1 w-full">
                            <ListboxButton
                              :class="[
                                'relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
                                infoSelected.distrito.length == 0
                                  ? 'cursor-not-allowed bg-gray-200'
                                  : '',
                              ]"
                            >
                              <span class="block truncate">
                                {{
                                  infoSelected.clusters
                                    ? infoSelected.clusters
                                    : "Selecciona un cluster"
                                }}
                              </span>
                              <span
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                              >
                                <SelectorIcon
                                  class="h-5 w-5"
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
                                class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                <ListboxOption
                                  v-slot="{ active, selected }"
                                  v-for="element in infoSelected.distrito
                                    .clusters"
                                  :value="element"
                                  as="template"
                                >
                                  <li
                                    :class="[
                                      active
                                        ? 'bg-[#E9F0FC] text-black'
                                        : 'text-black',
                                      'relative cursor-default select-none py-2 pl-10 pr-4',
                                    ]"
                                  >
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-medium'
                                          : 'font-normal',
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
                                    <span
                                      v-if="selected"
                                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
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
                    </div>
                  </div>
                  <div class="mb-4 flex w-[100%] items-center justify-between">
                    <div
                      class="mr-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Supervisor
                      <div class="flex w-[100%]">
                        <Listbox
                          v-model="infoSelected.supervisores"
                          :disabled="
                            infoSelected.distrito.length == 0 ? true : false
                          "
                        >
                          <div class="relative mt-1 w-full">
                            <ListboxButton
                              :class="[
                                'relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
                                infoSelected.distrito.length == 0
                                  ? 'cursor-not-allowed bg-gray-200'
                                  : '',
                              ]"
                            >
                              <span class="block truncate">
                                {{
                                  infoSelected.supervisores
                                    ? infoSelected.supervisores.nombre
                                    : "Selecciona un supervisor"
                                }}
                              </span>
                              <span
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                              >
                                <SelectorIcon
                                  class="h-5 w-5"
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
                                class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                <ListboxOption
                                  v-slot="{ active, selected }"
                                  v-for="element in infoSelected.distrito
                                    .supervisores"
                                  :value="element"
                                  as="template"
                                >
                                  <li
                                    :class="[
                                      active
                                        ? 'bg-[#E9F0FC] text-black'
                                        : 'text-black',
                                      'relative cursor-default select-none py-2 pl-10 pr-4',
                                    ]"
                                  >
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-medium'
                                          : 'font-normal',
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
                                    <span
                                      v-if="selected"
                                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
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
                    </div>
                    <div
                      class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Técnico
                      <div class="flex w-[100%]">
                        <Listbox
                          v-model="infoSelected.tecnicos"
                          :disabled="
                            infoSelected.supervisores.length == 0 ? true : false
                          "
                        >
                          <div class="relative mt-1 w-full">
                            <ListboxButton
                              :class="[
                                'relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
                                infoSelected.supervisores.length == 0
                                  ? 'cursor-not-allowed bg-gray-200'
                                  : '',
                              ]"
                            >
                              <span class="block truncate">
                                {{
                                  infoSelected.tecnicos
                                    ? infoSelected.tecnicos.name
                                    : "Selecciona un "
                                }}
                              </span>
                              <span
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                              >
                                <SelectorIcon
                                  class="h-5 w-5"
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
                                class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                <ListboxOption
                                  v-slot="{ active, selected }"
                                  v-for="element in infoData.tecnicos"
                                  :value="element"
                                  as="template"
                                >
                                  <li
                                    :class="[
                                      active
                                        ? 'bg-[#E9F0FC] text-black'
                                        : 'text-black',
                                      'relative cursor-default select-none py-2 pl-10 pr-4',
                                    ]"
                                  >
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-medium'
                                          : 'font-normal',
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
                                    <span
                                      v-if="selected"
                                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
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
                    </div>
                  </div>
                  <div class="mb-4 flex w-[80%] items-center self-start">
                    <div
                      class="mr-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Ingresar OLT
                      <input
                        v-model="infoSelected.olt"
                        placeholder="000"
                        class="mt-1 h-10 w-[100%] rounded-lg border-2 border-[#E5E5E5] text-black"
                        type="text"
                        name="folio"
                        id="folio"
                      />
                      <Transition
                        leave-active-class="transition duration-200 ease-in"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                        enter-active-class="transition duration-200 ease-in"
                        enter-from-class="opacity-0"
                        enter-to-class="opacity-100"
                      >
                        <span v-if="errores.olt != ''" class="text-red-400">
                          {{ errores.olt }}</span
                        >
                      </Transition>
                    </div>
                    <div
                      class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Falla
                      <div class="flex w-[100%]">
                        <Listbox v-model="infoSelected.falla">
                          <div class="relative mt-1 w-full">
                            <ListboxButton
                              :class="[
                                'relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
                              ]"
                            >
                              <span class="block truncate">
                                {{
                                  infoSelected.falla
                                    ? infoSelected.falla.name
                                    : "Selecciona una falla"
                                }}
                              </span>
                              <span
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                              >
                                <SelectorIcon
                                  class="h-5 w-5"
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
                                class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                <ListboxOption
                                  v-slot="{ active, selected }"
                                  v-for="element in infoData.fallas"
                                  :value="element"
                                  as="template"
                                >
                                  <li
                                    :class="[
                                      active
                                        ? 'bg-[#E9F0FC] text-black'
                                        : 'text-black',
                                      'relative cursor-default select-none py-2 pl-10 pr-4',
                                    ]"
                                  >
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-medium'
                                          : 'font-normal',
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
                                    <span
                                      v-if="selected"
                                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
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
                    </div>
                  </div>
                  <div class="mb-4 flex w-[80%] items-center self-start">
                    <div
                      class="mr-1.5 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Causa
                      <div class="flex w-[100%]">
                        <Listbox v-model="infoSelected.causa">
                          <div class="relative mt-1 w-full">
                            <ListboxButton
                              :class="[
                                'relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
                              ]"
                            >
                              <span class="block truncate">
                                {{
                                  infoSelected.causa
                                    ? infoSelected.causa.name
                                    : "Selecciona una falla"
                                }}
                              </span>
                              <span
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                              >
                                <SelectorIcon
                                  class="h-5 w-5"
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
                                class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                <ListboxOption
                                  v-slot="{ active, selected }"
                                  v-for="element in infoData.causas"
                                  :value="element"
                                  as="template"
                                >
                                  <li
                                    :class="[
                                      active
                                        ? 'bg-[#E9F0FC] text-black'
                                        : 'text-black',
                                      'relative cursor-default select-none py-2 pl-10 pr-4',
                                    ]"
                                  >
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-medium'
                                          : 'font-normal',
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
                                    <span
                                      v-if="selected"
                                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
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
                    </div>
                    <div
                      class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                    >
                      Clientes afectados
                      <input
                        v-model="infoSelected.clientesAfectados"
                        class="mt-1 h-10 w-[100%] rounded-lg border-2 border-[#E5E5E5] text-black"
                        type="number"
                        name="folio"
                        id="folio"
                        min="0"
                        max="9999"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-4 flex justify-around">
                  <div class="flex w-1/2 justify-center">
                    <button
                      type="button"
                      class="flex justify-center rounded-md border-2 border-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:border-transparent hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                      @click="closeModal"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div class="flex w-1/2 justify-center">
                    <button
                      :disabled="buttonDisabled || loadingSubmit"
                      type="button"
                      :class="[
                        'flex min-w-[150px] justify-center rounded-md border border-transparent bg-primario px-4 py-2 text-sm   font-medium focus-visible:ring-blue-500',
                        buttonDisabled
                          ? 'cursor-not-allowed bg-gray-300'
                          : 'text-white hover:bg-primario/80',
                        loadingSubmit ? 'bg-primario/80' : '',
                      ]"
                      @click="actualizarFolio()"
                    >
                      <svg
                        v-if="loadingSubmit"
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
                      <div v-else>Actualizar</div>
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { XCircleIcon, RefreshIcon } from "@heroicons/vue/outline";
import { ref as refDB, get, set, child } from "@firebase/database";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "@/firebase/firebase";
import ListSelect from "@/components/ListSelect.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Switch,
} from "@headlessui/vue";
import { useFolios } from "@/store/folios";
import { useRouter } from "vue-router";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

const props = defineProps(["folio", "incidencia", "infoData", "folioKey"]);
const restableciendo = ref(false);
const router = useRouter();
const folios = useFolios();
const actualizarFolioFirebase = httpsCallable(
  functions,
  "actualizarFolioCorrectivo"
);
const store = useStore();
const catalogoRef = refDB(db, "catalogo");
const loading = ref(false);
const loadingSubmit = ref(false);
const buttonDisabled = ref(true);
const update = reactive({
  distrito: false,
});
const emit = defineEmits(["abrirModalManejoFolio"]);

const errores = reactive({
  folio: { message: "", error: false },
  tipoFolio: { message: "", error: false },
  distrito: { message: "", error: false },
  cluster: { message: "", error: false },
  supervisor: { message: "", error: false },
  tecnico: { message: "", error: false },
  falla: { message: "", error: false },
  causa: { message: "", error: false },
  clientesAfectados: { message: "", error: false },
});

const oldValues = reactive({
  folio: "",
  tipoFolio: "",
});

const infoData = reactive({
  tipoFolios: [],
  distritos: [],
  fallas: [],
  causas: [],
  tecnicos: [],
});

const infoDefault = reactive({
  tipoFolio: "",
  distrito: "",
  falla: "",
  causa: "",
  clusters: "",
  supervisores: "",
  tecnicos: "",
});

const infoInicial = reactive({
  folio: "",
  tipoFolio: "",
  distrito: "",
  falla: "",
  causa: "",
  clusters: "",
  supervisores: "",
  tecnicos: "",
  olt: "",
  clientesAfectados: 0,
});

const infoSelected = reactive({
  folio: "",
  tipoFolio: "",
  distrito: "",
  falla: "",
  causa: "",
  clusters: "",
  supervisores: "",
  tecnicos: "",
  olt: "",
  clientesAfectados: 0,
});

const fetchData = async () => {
  await get(catalogoRef).then((snapshot) => {
    snapshot.forEach((element) => {
      // tipo de folios
      if (element.key === "tipoFolios") {
        for (let data in element.val().correctivo) {
          infoData.tipoFolios.push({
            name: data,
            ...element.val().correctivo[data],
          });
        }
      }
      // distritos
      if (element.key === "distritos") {
        for (let data in element.val()) {
          infoData.distritos.push({ name: data, ...element.val()[data] });
        }
      }
      // fallas
      if (element.key === "fallas") {
        for (let data in element.val()) {
          infoData.fallas.push({ name: data, ...element.val()[data] });
        }
      }
      //Causas
      if (element.key === "causas") {
        for (let data in element.val()) {
          infoData.causas.push({ name: data, ...element.val()[data] });
        }
      }
      //Closter
    });
  });

  infoSelected.folio = props.folio;
  infoSelected.tipoFolio = infoData.tipoFolios.filter(
    (tipo) => tipo.name === props.infoData.tipoFolio
  )[0];
  infoSelected.distrito = infoData.distritos.filter((distrito) =>
    distrito.name === props.infoData.distrito ? distrito.name : ""
  )[0];
  infoSelected.clusters = props.infoData.cluster;
  infoSelected.supervisores =
    infoSelected.distrito.supervisores[props.infoData.supervisor];
  await obtenerTecnicos({ uid: props.infoData.supervisor });
  infoSelected.tecnicos = infoData.tecnicos.filter(
    (tecnico) => tecnico.uid === props.infoData.tecnico
  )[0];
  infoSelected.olt = props.infoData.olt;
  infoSelected.falla = infoData.fallas.filter(
    (falla) => falla.name === props.infoData.falla
  )[0];
  infoSelected.causa = infoData.causas.filter(
    (causa) => causa.name === props.infoData.causa
  )[0];
  infoSelected.clientesAfectados = props.infoData.clientesAfectados;
  Object.assign(oldValues, {
    folio: props.folio,
    tipoFolio: infoData.tipoFolios.filter(
      (tipo) => tipo.name === props.infoData.tipoFolio
    )[0],
  });
  Object.assign(infoInicial, infoSelected);
};

const obtenerTecnicos = async (supervisor) => {
  // infoSelected.supervisores = event;
  infoData.tecnicos = [];
  await get(refDB(db, `catalogo/supervisores/${supervisor.uid}`)).then(
    (snapshot) => {
      snapshot.forEach((element) => {
        if (element.key === "tecnicos") {
          for (let data in element.val()) {
            infoData.tecnicos.push({
              name: element.val()[data].nombre,
              uid: data,
            });
          }
        }
      });
    }
  );
};

await fetchData();

function closeModal() {
  store.commit("cerrarModalEdicion");
}

const validarTipoFolio = async (event) => {
  infoSelected.tipoFolio = event;
};

// Validar existencia del folio en la base de datos.
const validarExistencia = async () => {
  loading.value = true;
  if (infoSelected.folio.length < 7) {
    Object.assign(errores.folio, {
      message: "El folio no puede ser menor a 7 digitos",
      error: true,
    });
    loading.value = false;
    return false;
  }

  if (infoSelected.folio && infoSelected.tipoFolio) {
    let result = await folios.validarExistencia(
      infoSelected.folio,
      infoSelected.tipoFolio.name
    );
    if (result) {
      Object.assign(errores.folio, {
        message: "El folio ya existe",
        error: true,
      });
      loading.value = false;
      return false;
    }
  }
  loading.value = false;
  return Object.assign(errores.folio, {
    message: "",
    error: false,
  });
};

const restablecer = async () => {
  restableciendo.value = true;
  infoSelected.folio = props.folio;
  infoSelected.tipoFolio = await infoData.tipoFolios.filter(
    (tipo) => tipo.name === props.infoData.tipoFolio
  )[0];
  infoSelected.distrito = await infoData.distritos.filter((distrito) =>
    distrito.name === props.infoData.distrito ? distrito.name : ""
  )[0];
  infoSelected.clusters = props.infoData.cluster;
  infoSelected.supervisores =
    infoSelected.distrito.supervisores[props.infoData.supervisor];
  await obtenerTecnicos({ uid: props.infoData.supervisor });
  infoSelected.tecnicos = infoData.tecnicos.filter(
    (tecnico) => tecnico.uid === props.infoData.tecnico
  )[0];
  infoSelected.olt = props.infoData.olt;
  infoSelected.falla = infoData.fallas.filter(
    (falla) => falla.name === props.infoData.falla
  )[0];
  infoSelected.causa = infoData.causas.filter(
    (causa) => causa.name === props.infoData.causa
  )[0];
  infoSelected.clientesAfectados = props.infoData.clientesAfectados;
  Object.assign(oldValues, {
    folio: props.folio,
    tipoFolio: infoData.tipoFolios.filter(
      (tipo) => tipo.name === props.infoData.tipoFolio
    )[0],
  });
  restableciendo.value = false;
};

//observadores
watch(
  () => infoSelected.supervisores,
  async (value) => {
    if (!restableciendo.value) {
      infoSelected.tecnicos = "";
      await obtenerTecnicos(value);
    }
  }
);

const actualizarFolio = async () => {
  loadingSubmit.value = true;
  if (!infoSelected.folio || errores.folio.error) {
    return;
  }
  await actualizarFolioFirebase({ key: props.folioKey, ...infoSelected })
    .then((result) => {
      router.go(0);
    })
    .catch((error) => {
      loadingSubmit.value = false;
    });
};

watch(
  () => infoSelected.distrito,
  () => {
    if (!restableciendo.value) {
      Object.assign(infoSelected, {
        clusters: "",
        supervisores: "",
        tecnicos: "",
      });
    }
  }
);

watch(
  () => infoSelected.folio,
  (value) => {
    if (
      value &&
      infoSelected.tipoFolio &&
      value != props.folio &&
      infoSelected.tipoFolio != props.infoData.tipoFolio
    ) {
      validarExistencia();
    }
  }
);

watch(
  () => infoSelected.tipoFolio,
  (value) => {
    if (
      value &&
      infoSelected.folio &&
      value != props.infoData.tipoFolio &&
      infoSelected.folio != props.folio
    ) {
      validarExistencia();
    }
  }
);

watch(infoSelected, (value) => {
  console.log(value, props.infoData.tipoFolio);
  if (
    (infoSelected.folio != props.folio ||
      infoSelected.tipoFolio.name != props.infoData.tipoFolio ||
      infoSelected.distrito.name != props.infoData.distrito ||
      infoSelected.clusters != props.infoData.cluster ||
      infoSelected.supervisores.uid != props.infoData.supervisor ||
      infoSelected.tecnicos.uid != props.infoData.tecnico ||
      infoSelected.olt != props.infoData.olt ||
      infoSelected.falla.name != props.infoData.falla ||
      infoSelected.causa.name != props.infoData.causa ||
      infoSelected.clientesAfectados != props.infoData.clientesAfectados) &&
    !errores.folio.error
  ) {
    buttonDisabled.value = false;
  } else {
    buttonDisabled.value = true;
  }
});
</script>
