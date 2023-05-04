<template>
    <div class="flex w-full flex-col">
      <Horario />
      <div
        v-if="error.code == 2"
        class="mt-2 flex w-[100%] items-center justify-center py-1"
        :class="rebotar"
      >
        <span class="text-xs font-semibold text-red-400">{{
          error.message
        }}</span>
        <ExclamationCircleIcon class="ml-2 h-4 w-4 text-red-400" />
      </div>
      <!-- Si el tipo de folio es diferente a OT -->
      <div
        v-if="foliosData.tipoFolio != 'OT'"
        class="mb-4 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
      >
        OT
        <input
          v-model="infoCapturada.ot"
          class="mt-1 h-10 w-[50%] rounded-lg border-2 border-[#E5E5E5] text-black"
          type="text"
          name="ot"
          id="ot"
        />
      </div>
      <div class="my-3 flex w-[100%] items-center">
        <div class="flex w-[95%] border-b-2 border-gris-claro/30"></div>
      </div>
      <div class="mb-3 mt-5 flex w-[100%]">
        <div
          :class="
            props.incidencia == 1 ? 'flex w-[50%] flex-col' : 'flex w-[100%]'
          "
          class="flex w-[100%]"
        >
          <!-- select justificación -->
          <div
            :class="props.incidencia == 1 ? 'w-full' : 'w-[50%]'"
            class="flex flex-col"
          >
            <div class="flex pb-2 text-xs text-gris-claro">
              Justificación/pausa
            </div>
            <div class="flex w-[90%]">
              <Listbox v-model="infoCapturada.justificacion" name="justificacion">
                <div class="relative mt-1 w-full">
                  <ListboxButton
                    class="relative w-full cursor-not-allowed rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <span class="block truncate">{{
                      infoCapturada.justificacion
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
                      class="absolute mt-1 ml-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-customized ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="element in justificacionesData"
                        :key="element"
                        :value="element"
                        as="template"
                      >
                        <li
                          class="hover:cursor-pointer"
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
                            >{{ element }}</span
                          >
                          <span
                            v-if="selected"
                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                          >
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
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
            :class="props.incidencia == 1 ? 'w-full' : 'w-[50%]'"
            class="mt-4 flex"
          >
            <!-- v-if="infoCapturada.justificacion != 'Selecciona una justificación'"  -->
            <div class="flex w-[40%] flex-col">
              <div class="flex pb-1 text-xs text-gris-claro">Tiempo muerto</div>
              <div class="flex w-full items-center">
                <input
                  v-model="infoCapturada.tiempoMuerto"
                  class="flex w-[60%] rounded-lg border-none border-transparent bg-transparent text-center text-3xl font-medium focus:ring-0"
                  @keypress="isNumber($event)"
                  type="number"
                  min="0"
                  :disabled="
                    infoCapturada.justificacion == 'Selecciona una justificación'
                      ? true
                      : false
                  "
                />
                <span class="pt-2">M</span>
              </div>
            </div>
            <div class="flex w-[30%] flex-col pl-2">
              <div class="flex pb-2 text-xs text-gris-claro">ETA</div>
              <div
                class="w-[60%] items-center justify-center rounded-md border-2 bg-white p-1 text-center"
              >
                {{ foliosController.eta }}
              </div>
            </div>
            <div class="flex w-[30%] flex-col">
              <div class="flex pb-2 text-xs text-gris-claro">SLA</div>
              <div
                class="w-[65%] items-center justify-center rounded-md border-2 bg-white p-1 text-center"
              >
                {{ foliosController.sla }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-3 flex w-[100%] items-center">
        <div class="flex w-[95%] border-b-2 border-gris-claro/30"></div>
      </div>
      <div class="flex w-[100%] flex-col font-semibold">
        Potenciales
        <div class="mt-4 flex w-[100%] font-normal text-gris-claro">
          <div class="flex w-2/4 flex-col">
            <div class="flex w-full">
              <div class="w-1/2 pl-1 text-xs">
                Potencia inicial
                <input
                  v-model="infoCapturada.potenciaInicial"
                  class="mt-2 h-9 w-[85%] rounded-lg border-2 border-gris-claro text-black"
                  type="number"
                  name="potenciaInicial"
                  id="potenciaInicial"
                  min="-999"
                  max="999"
                />
              </div>
              <div class="w-1/2 text-xs">
                Potencia final
                <input
                  v-model="infoCapturada.potenciaFinal"
                  class="mt-2 h-9 w-[85%] rounded-lg border-2 border-gris-claro text-black"
                  type="number"
                  name="potenciaFinal"
                  id="potenciaFinal"
                  min="-999"
                  max="999"
                />
              </div>
            </div>
            <div
              v-if="
                !infoCapturada.potenciaInicial || !infoCapturada.potenciaFinal
              "
              class="flex pt-2 pl-[5%] text-xs font-normal text-red-400"
            >
              Registrar valores de potencias
            </div>
          </div>
          <div class="flex w-2/4 flex-col">
            <div class="mb-2 text-xs">Hora primera medición</div>
            <div class="flex text-black">
              <Popover v-slot="{ inputValue, open }" class="relative">
                <PopoverButton
                  class="group inline-flex items-center rounded-md bg-transparent bg-[#90B3F2] p-2 text-base font-medium text-white"
                >
                  <ClockIcon class="h-6 w-6 self-center" />
                </PopoverButton>
                <PopoverPanel
                  class="absolute -left-[150%] w-full max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
                >
                  <div
                    class="w-[250px] rounded-lg bg-white shadow-lg shadow-black/5 ring-1 ring-black ring-opacity-5"
                  >
                    <div class="flex">
                      <DatePicker
                        style="border: #000000"
                        mode="time"
                        :is24hr="true"
                        class="flex"
                        v-model="infoCapturada.primeraMedicion"
                      />
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
              <!-- <div class="flex items-center">
                    <input
                      v-model="infoCapturada.primeraMedicion.horas"
                      class="flex w-[50%] rounded-lg border-transparent border-gris-claro bg-transparent text-center text-base font-medium focus:ring-0"
                      @blur="actualizarHoraMedicion"
                      @keypress="isNumber($event)"
                      type="number"
                      min="0"
                      max="24"
                    />
                    <span class="pr-2 pl-2">H</span>
                  </div>
                  <div class="flex items-center px-3">
                    <input
                      v-model="infoCapturada.primeraMedicion.minutos"
                      class="flex w-[50%] rounded-lg border-transparent border-gris-claro bg-transparent text-center text-base font-medium focus:ring-0"
                      @blur="actualizarMinutoMedicion"
                      @keypress="isNumber($event)"
                      type="number"
                      min="0"
                      max="59"
                    />
                    <span class="pr-2 pl-2">M</span>
                  </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="my-3 flex w-[100%] items-center">
        <div class="flex w-[95%] border-b-2 border-gris-claro/30"></div>
      </div>
      <!-- Select para los materiales de miscelaneos -->
      <div class="mb-2 flex w-[100] flex-col font-semibold">
        Miscelaneos
        <div class="mt-4 flex w-[100%] font-normal text-gris-claro">
          <div class="w-1/2 text-xs">
            Materiales
            <div class="flex w-[95%] items-start justify-start">
              <Listbox
                v-model="infoCapturada.materiales.miscelaneos"
                name="miscelaneos"
                multiple
              >
                <div class="relative mt-1 w-full">
                  <ListboxButton
                    class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <span class="block truncate">Selecciona un material</span>
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
                      class="absolute z-20 mt-1 ml-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-customized ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="element in data.materialMisc"
                        :key="element.keyMaterial"
                        :value="element"
                        as="template"
                      >
                        <li
                          class="hover:cursor-pointer"
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
                            >{{ element.keyMaterial }}</span
                          >
                          <span
                            v-if="selected"
                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                          >
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
            </div>
            <Transition
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
              enter-active-class="transition duration-200 ease-in"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
            >
              <div
                v-if="
                  (errores.miscelaneo && errores.ttp) ||
                  (errores.miscelaneo && !errores.ttp)
                "
                class="flex pt-2 text-xs font-normal text-red-400"
              >
                Selección de material requerida
              </div>
            </Transition>
          </div>
          <div class="flex w-1/2 text-black">
            <table class="w-[90%] table-fixed items-center justify-center">
              <thead>
                <tr class="border-b border-gris-claro/50">
                  <th class="w-[60%] text-start text-xs text-gris-claro">Tipo</th>
                  <th class="w-[40%] text-center text-xs text-gris-claro">
                    Cantidad
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in infoCapturada.materiales.miscelaneos"
                  class="border-b border-gris-claro/50"
                >
                  <td
                    class="w-[95%] truncate py-4 pr-2.5 text-sm"
                    :title="item.keyMaterial"
                  >
                    {{ item.keyMaterial }}
                  </td>
                  <td class="items-center">
                    <input
                      @keypress="isNumber($event)"
                      @change="
                        item.qty === '' || item.qty == 0
                          ? (item.qty = 1)
                          : item.qty
                      "
                      v-model="item.qty"
                      class="my-1 h-8 w-[100%] justify-center rounded-lg border-2 border-gris-claro text-center font-semibold text-black"
                      type="number"
                      :id="index"
                      min="1"
                      max="1000"
                    />
                  </td>
                  <td class="relative cursor-pointer">
                    <div
                      v-if="!item.action"
                      v-on:click="eliminarMaterialMiscelaneo(item, index)"
                      class=""
                    >
                      <XIcon class="absolute h-4 w-4 -translate-y-1/2" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="my-3 flex w-[100%] items-center">
        <div class="flex w-[95%] border-b-2 border-gris-claro/30"></div>
      </div>
      <!-- Select para los materiales de totalplay -->
      <div class="mb-2 flex w-[100] flex-col font-semibold">
        Material TTP
        <div class="mt-4 flex w-[100%] font-normal text-gris-claro">
          <div class="w-1/2 text-xs">
            Materiales
            <div class="flex w-[95%] items-start justify-start">
              <Listbox v-model="infoCapturada.materiales.ttp" name="ttp" multiple>
                <div class="relative mt-1 w-full">
                  <ListboxButton
                    class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <span class="block truncate">Selecciona una material</span>
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
                      class="absolute z-20 mt-1 ml-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-customized ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="element in data.materialTTP"
                        :key="element.keyMaterial"
                        :value="element"
                        as="template"
                      >
                        <li
                          class="hover:cursor-pointer"
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
                            >{{ element.keyMaterial }}</span
                          >
                          <span
                            v-if="selected"
                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                          >
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
            </div>
            <Transition
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
              enter-active-class="transition duration-200 ease-in"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
            >
              <div
                v-if="
                  (errores.miscelaneo && errores.ttp) ||
                  (!errores.miscelaneo && errores.ttp)
                "
                class="flex pt-2 text-xs font-normal text-red-400"
              >
                Selección de material requerida
              </div>
            </Transition>
          </div>
          <div class="flex w-1/2 text-black">
            <table class="w-[90%] table-fixed items-center justify-center">
              <thead>
                <tr class="border-b border-gris-claro/50">
                  <th class="w-[60%] text-start text-xs text-gris-claro">Tipo</th>
                  <th class="w-[40%] text-center text-xs text-gris-claro">
                    Cantidad
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in infoCapturada.materiales.ttp"
                  class="border-b border-gris-claro/50"
                >
                  <td
                    class="w-[95%] truncate py-4 pr-2.5 text-sm"
                    :title="item.keyMaterial"
                  >
                    {{ item.keyMaterial }}
                  </td>
                  <td class="items-center">
                    <input
                      @keypress="isNumber($event)"
                      @change="
                        item.qty === '' || item.qty == 0
                          ? (item.qty = 1)
                          : item.qty
                      "
                      v-model="item.qty"
                      class="my-1 h-8 w-[100%] justify-center rounded-lg border-2 border-gris-claro text-center font-semibold text-black"
                      type="number"
                      :id="index"
                      min="1"
                      max="1000"
                    />
                  </td>
                  <td class="relative cursor-pointer">
                    <div
                      v-if="!item.action"
                      v-on:click="eliminarMaterialTotalplay(item, index)"
                      class=""
                    >
                      <XIcon class="absolute h-4 w-4 -translate-y-1/2" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="my-3 flex w-[100%] items-center">
        <div class="flex w-[95%] border-b-2 border-gris-claro/30"></div>
      </div>
      <div class="mb-2 flex w-[100] flex-col font-semibold">
        <span v-if="props.incidencia != 1">Conceptos</span>
        <div
          v-if="props.incidencia != 1"
          class="mt-4 flex w-[100%] font-normal text-gris-claro"
        >
          <!-- Select conceptos -->
          <div class="w-1/2 text-xs">
            Conceptos
            <div class="flex w-[95%] flex-col items-start justify-start">
              <Listbox
                v-model="infoCapturada.conceptos.descripcion"
                name="concepto"
                multiple
              >
                <div class="relative mt-1 w-full">
                  <ListboxButton
                    class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <span class="block truncate">Selecciona un concepto</span>
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
                      class="absolute z-20 mt-1 ml-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-customized ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="element in data.conceptos"
                        :key="element.keyConceptos"
                        :value="element"
                        :title="element.descripcion ? element.descripcion : ''"
                        as="template"
                      >
                        <li
                          class="hover:cursor-pointer"
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
                            >{{ element.keyConceptos }}</span
                          >
                          <span
                            v-if="selected"
                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                          >
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
              <!-- Concepto CAB 24 (Tabla) -->
              <div class="mt-5 flex w-[100%]">
                <table
                  class="mt-3 h-fit w-[90%] table-fixed items-center justify-center"
                >
                  <thead>
                    <tr class="border-b border-gris-claro/50">
                      <th class="w-[60%] text-start text-xs text-gris-claro">
                        Concepto CAB 24
                      </th>
                      <th class="w-[25%] text-center text-xs text-gris-claro">
                        Editar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      :class="[
                        error.code === 3 ? 'border-b-2 border-red-300' : '',
                        'relative',
                      ]"
                    >
                      <td
                        class="mt-2 w-[95%] truncate pr-2.5 text-sm font-semibold text-black"
                        title="CAB 24"
                      >
                        <div class="flex w-full">
                          <ExclamationIcon
                            v-if="mostrarErrorCoordenadas"
                            class="mr-5 h-5 w-5 text-red-400"
                            aria-hidden="true"
                          />
                          <span> CAB 24 </span>
                        </div>
                      </td>
                      <td class="items-center">
                        <div class="flex w-[100%] items-center justify-center">
                          <PencilAltIcon
                            class="h-5 w-5 cursor-pointer text-center text-black"
                            @click="isOpen = true"
                          />
                        </div>
                      </td>
                      <span
                        class="absolute -bottom-5 left-0 text-xs font-semibold text-red-400"
                        >{{ error.message }}</span
                      >
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Modal de Coordenadas -->
              <TransitionRoot appear :show="isOpen" as="template" class="z-50">
                <Dialog
                  as="div"
                  @close="validarCoordenadasCompletas"
                  class="relative z-50"
                >
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
                          class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                          <DialogTitle
                            as="div"
                            class="mb-5 flex text-lg font-medium leading-6 text-gray-900"
                          >
                            <div class="flex w-[80%]">
                              <span>CAB-024</span>
                            </div>
                            <div class="flex w-[20%] cursor-pointer justify-end">
                              <XCircleIcon
                                class="h-6 w-6 text-black"
                                aria-hidden="true"
                                @click="validarCoordenadasCompletas"
                              />
                            </div>
                          </DialogTitle>
                          <div
                            class="flex h-6 w-fit cursor-pointer items-center justify-center"
                            @click="() => infoCapturada.conceptos.cab24.push('')"
                          >
                            <PlusSmIcon
                              class="h-5 w-5 text-black hover:text-black"
                              aria-hidden="true"
                            />
                            <span class="pl-2">Agregar</span>
                          </div>
                          <Transition
                            leave-active-class="transition duration-200 ease-in"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                            enter-active-class="transition duration-200 ease-in"
                            enter-from-class="opacity-0"
                            enter-to-class="opacity-100"
                          >
                            <div
                              v-if="mostrarErrorCoordenadas"
                              class="mt-2 flex w-full justify-center text-xs text-red-400"
                            >
                              Favor de verificar coordenadas ingresadas
                            </div>
                          </Transition>
                          <div
                            v-for="(item, index) in infoCapturada.conceptos.cab24"
                            class="my-3 flex w-[90%] cursor-pointer items-center justify-center space-x-4"
                          >
                            <span class="pl-10">{{ index + 1 }}</span>
                            <input
                              v-model="infoCapturada.conceptos.cab24[index]"
                              class="h-8 w-[80%] rounded-lg border-2 font-semibold text-black"
                              :class="
                                infoCapturada.conceptos.errores[index] == true
                                  ? 'border-red-400'
                                  : 'border-gris-claro'
                              "
                              type="text"
                              :name="'coordenada' + index"
                              :id="'coordenada' + index"
                              placeholder="00.000000, 00.000000"
                              @blur="validarCoordenadas(index, item)"
                            />
                            <XCircleIcon
                              class="h-6 w-6 text-black hover:text-black"
                              aria-hidden="true"
                              @click="
                                () =>
                                  infoCapturada.conceptos.cab24.splice(index, 1)
                              "
                            />
                          </div>
                          <div class="mt-4 flex justify-center">
                            <button
                              type="button"
                              class="mt-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              @click="validarCoordenadasCompletas"
                            >
                              Aceptar
                            </button>
                          </div>
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </Dialog>
              </TransitionRoot>
              <!-- Fin del Modal de Coordenadas -->
            </div>
          </div>
          <div class="flex h-fit w-1/2 text-black">
            <table class="w-[90%] table-fixed items-center justify-center">
              <thead>
                <tr class="border-b border-gris-claro/50">
                  <th class="w-[60%] text-start text-xs text-gris-claro">Tipo</th>
                  <th class="w-[45%] text-center text-xs text-gris-claro">
                    Cantidad
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in infoCapturada.conceptos.descripcion"
                  class="border-b border-gris-claro/50"
                >
                  <td
                    class="w-[95%] truncate py-4 pr-2.5 text-sm"
                    :title="item.keyConceptos"
                  >
                    {{ item.keyConceptos }}
                  </td>
                  <td class="items-center">
                    <input
                      @keypress="isNumber($event)"
                      @change="
                        item.qty === '' || item.qty == 0
                          ? (item.qty = 1)
                          : item.qty
                      "
                      v-model="item.qty"
                      class="my-1 h-8 w-[100%] justify-center rounded-lg border-2 border-gris-claro text-center font-semibold text-black"
                      type="number"
                      :id="index"
                      min="1"
                      max="1000"
                    />
                  </td>
                  <td class="relative cursor-pointer">
                    <div
                      v-if="!item.action"
                      v-on:click="eliminarConceptos(item, index)"
                      class=""
                    >
                      <XIcon class="absolute h-4 w-4 -translate-y-1/2" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="mt-14 mb-2 flex w-[100%] items-center justify-center space-x-4"
        >
          <button
            type="button"
            @click="actualizarPaso3(infoCapturada)"
            class="flex w-[20%] items-center justify-center rounded-xl bg-[#F2F2F2] px-10 py-2 font-medium"
            :class="agitar"
          >
            Actualizar
          </button>
          <button
            type="button"
            @click="modalConfirmacion = true"
            class="flex w-[20%] items-center justify-center rounded-xl bg-[#F2F2F2] px-10 py-2 font-medium"
            :class="agitar"
          >
            Finalizar
          </button>
          <TransitionRoot
            appear
            :show="modalConfirmacion"
            as="template"
            class="z-50"
          >
            <Dialog
              as="div"
              @close="modalConfirmacion = false"
              class="relative z-40"
            >
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
                      class="w-full max-w-xl transform overflow-hidden rounded-xl bg-white pb-6 text-left align-middle shadow-xl transition-all"
                    >
                      <DialogTitle
                        as="div"
                        class="mb-5 flex items-center py-5 text-lg font-medium leading-6"
                      >
                        <span class="flex w-[80%] pl-10"
                          >Confirmar finalización de folio</span
                        >
                        <div class="flex w-[20%] justify-end pr-2">
                          <XCircleIcon
                            @click="modalConfirmacion = false"
                            class="h-5 w-5 cursor-pointer"
                          />
                        </div>
                      </DialogTitle>
                      <div class="mx-10 flex select-none flex-col">
                        <span class="flex w-[100%] justify-center"
                          >¿Desea finalizar el folio trabajado actualmente?</span
                        >
                        <div class="mt-10 flex select-none justify-around">
                          <button
                            type="button"
                            class="flex justify-center rounded-md border-2 border-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:border-transparent hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                            @click="modalConfirmacion = false"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            class="flex justify-center rounded-md border-2 border-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:border-transparent hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                            @click="validaryEnviarInfo()"
                          >
                            Finalizar
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
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, reactive, onBeforeMount } from "vue";
  import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from "@headlessui/vue";
  import {
    CheckIcon,
    SelectorIcon,
    PencilAltIcon,
    PlusSmIcon,
    ExclamationIcon,
    ExclamationCircleIcon,
  } from "@heroicons/vue/solid";
  import {
    XCircleIcon,
    UploadIcon,
    TrashIcon,
    XIcon,
  } from "@heroicons/vue/outline";
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/vue";
  import {
    concentradoMaterialConcepto,
    calculoEta,
    calculoSla,
  } from "@/consultasBD/consultaMaterialesConcepto.js";
  import {
    guardarJustificacion,
    guardarTiempoMuerto,
  } from "@/consultasBD/guardarTiempos.js";
  import { useStore } from "vuex";
  import { db, functions } from "@/firebase/firebase";
  import { ref as refDB, get, set, child, update } from "@firebase/database";
  import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
  import { validacionCoordenadasCab24 } from "@/validaciones/coordenadas.js";
  import { arrayActiveHora, arrayActiveMinuto } from "@/JS/arreglosHorario.js";
  import Horario from "@/components/Horario.vue";
  import { store } from "@/store";
  import { guardarCierre } from "@/consultasBD/guardarCierre.js";
  import { useRouter, useRoute } from "vue-router";
  import moment from "moment";
  import { DatePicker } from "v-calendar";
  import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
  import { CalendarIcon, ClockIcon } from "@heroicons/vue/outline";
  import { httpsCallable } from "@firebase/functions";
  import { useFolios } from "@/store/foliosController";
  import { storeToRefs } from "pinia";
  
  const foliosController = useFolios();
  const { foliosData, error } = storeToRefs(foliosController);
  const { actualizarPaso3 } = foliosController;
  const data = reactive({
    materialTTP: [],
    materialMisc: [],
    conceptos: [],
  });
  const fetchData = async () => {
    // Cargar materiales totalplay
    await get(refDB(db, `almacen/materiales/totalplay`)).then((snapshot) => {
      snapshot.forEach((item) => {
        data.materialTTP.push({ keyMaterial: item.key, ...item.val(), qty: 1 });
      });
    });
    // Cargar materiales Miscelaneos
    await get(refDB(db, `almacen/materiales/miscelaneos`)).then((snapshot) => {
      snapshot.forEach((item) => {
        data.materialMisc.push({ keyMaterial: item.key, ...item.val(), qty: 1 });
      });
    });
    // Cargar conceptos
    await get(refDB(db, `catalogo/conceptos`)).then((snapshot) => {
      snapshot.forEach((item) => {
        data.conceptos.push({ keyConceptos: item.key, ...item.val(), qty: 1 });
      });
    });
  };
  
  await fetchData();
  
  // Eliminar material miscelaneo
  const eliminarMaterialMiscelaneo = (item, indexItem) => {
    infoCapturada.materiales.miscelaneos.splice(indexItem, 1);
    let index = data.materialMisc.findIndex(
      (material) => material.keyMaterial === item.keyMaterial
    );
    if (index == -1) {
      data.materialMisc.push({ ...item });
    }
  };
  
  // Eliminar material totalplay
  const eliminarMaterialTotalplay = (item, indexItem) => {
    infoCapturada.materiales.ttp.splice(indexItem, 1);
    let index = data.materialTTP.findIndex(
      (material) => material.keyMaterial === item.keyMaterial
    );
    if (index == -1) {
      data.materialTTP.push({ ...item });
    }
  };
  
  // Eliminar conceptos
  const eliminarConceptos = (item, indexItem) => {
    infoCapturada.conceptos.descripcion.splice(indexItem, 1);
    let index = data.conceptos.findIndex(
      (concepto) => concepto.keyConceptos === item.keyConceptos
    );
    if (index == -1) {
      data.conceptos.push({ ...item });
    }
  };
  
  // Validar coordenadas de cab24
  const validarCoordenadas = async (index, item) => {
    if (
      !/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
        item
      ) ||
      item == ""
    ) {
      if (!error.value.isError) {
        Object.assign(error.value, {
          code: 3,
          isError: true,
          message: "El formato es invalido o vacío",
        });
      }
    } else {
      // if (error.value.code == 3) {
      //   Object.assign(error.value, {
      //     code: 0,
      //     isError: false,
      //     message: "",
      //   });
      // }
    }
  };
  
  // Validar coordenadas de cab24
  const validarCoordenadasCompletas = () => {
    let isError = false;
    if (infoCapturada.conceptos.cab24.length > 0) {
      infoCapturada.conceptos.cab24.forEach((item) => {
        if (
          !/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
            item
          ) ||
          item == ""
        ) {
            isError = true;
          if (!error.value.isError) {
            Object.assign(error.value, {
              code: 3,
              isError: true,
              message: "El formato es invalido o vacío",
            });
          }
        }
      });
      if (!isError) {
        if (error.value.code == 3) {
          Object.assign(error.value, {
            code: 0,
            isError: false,
            message: "",
          });
        }
      }
    }
    isOpen.value = false;
  };
  
  const isNumber = ($event) => {
    let keyCode = $event.keyCode ? $event.keyCode : $event.which;
    if (keyCode < 48 || keyCode > 57) {
      $event.preventDefault();
    }
    if ($event) {
    }
  };
  
  const storeVuex = useStore();
  const router = useRouter();
  const route = useRoute();
  const storage = getStorage();
  const horario = ref();
  
  const props = defineProps([
    "incidencia",
    "folio",
    "estado",
    "tipoFolio",
    "data",
  ]);
  const isOpen = ref(false);
  const modalConfirmacion = ref(false);
  const errorCoord = ref(false);
  const cab24 = ref(0);
  const validacionHorario = ref([false, false, false]);
  
  const infoCapturada = reactive({
    justificacion: "Selecciona una justificación",
    ot: "",
    tiempoMuerto: store.state.a.tiempoMuerto,
    // Calculo realizado mediante la resta de la hora de
    // llegada menos la hora de inicio
    sla: store.state.a.sla, //SLA
    // Calculo realizado mediante la resta de la hora de
    // cierre menos el tiempo muerto introducido por el usuario
    // menos la hora de activacion
    potenciaInicial: 0,
    potenciaFinal: 0,
    primeraMedicion: new Date(),
    materiales: {
      miscelaneos: [],
      ttp: [],
    },
    conceptos: {
      descripcion: [],
      cab24: [],
      errores: [],
    },
  });
  const fotos = ref({
    despues: {
      file: null,
      file64: null,
    },
  });
  
  const errores = ref({
    potencia: false,
    miscelaneo: false,
    ttp: false,
    fotoDespues: false,
  });
  
  // MIS VARIABLES
  const materialesData = reactive({
    totalplay: [],
    miscelaneos: [],
  });
  
  const materialesFilterData = reactive({
    totalplay: [],
    miscelaneos: [],
  });
  
  const justificacionesData = ref([]);
  //
  const fecha = ref();
  const hora = ref();
  const minuto = ref();
  const rebotar = ref("");
  
  const validarTiempoMuerto = ref(false);
  const mostrarErrorCoordenadas = ref(false);
  const agitar = ref("");
  
  const concentradoDatos = ref(concentradoMaterialConcepto());
  concentradoDatos.value.justificaciones.sort();
  const conceptosData = ref([]);
  const conceptosFilterData = ref([]);
  
  onBeforeMount(() => {
    if (foliosData.value.materiales.miscelaneos) {
      foliosData.value.materiales.miscelaneos.forEach((item) => {
        let index = data.materialMisc.findIndex(
          (material) => material.keyMaterial === item.keyMaterial
        );
        if (index != -1) {
          data.materialMisc.splice(index, 1);
        }
      });
      infoCapturada.materiales.miscelaneos =
        foliosData.value.materiales.miscelaneos;
    }
    if (foliosData.value.materiales.totalplay) {
      foliosData.value.materiales.totalplay.forEach((item) => {
        let index = data.materialTTP.findIndex(
          (material) => material.keyMaterial === item.keyMaterial
        );
        if (index != -1) {
          data.materialTTP.splice(index, 1);
        }
      });
      infoCapturada.materiales.ttp = foliosData.value.materiales.totalplay;
    }
    if (foliosData.value.conceptos) {
      foliosData.value.conceptos.forEach((item) => {
        let index = data.conceptos.findIndex(
          (concepto) => concepto.keyConceptos === item.keyConceptos
        );
        if (index != -1) {
          data.conceptos.splice(index, 1);
        }
      });
      infoCapturada.conceptos.descripcion = foliosData.value.conceptos;
    }
    if (foliosData.value.potenciales) {
      if (foliosData.value.potenciales.potenciaInicial) {
        infoCapturada.potenciaInicial =
          foliosData.value.potenciales.potenciaInicial;
      }
      if (foliosData.value.potenciales.potenciaFinal) {
        infoCapturada.potenciaFinal = foliosData.value.potenciales.potenciaFinal;
      }
      if (foliosData.value.potenciales.horaPrimeraMedicion) {
        infoCapturada.primeraMedicion = new Date(
          foliosData.value.potenciales.horaPrimeraMedicion
        );
      }
    }
    if(foliosData.value.cab24) {
      infoCapturada.conceptos.cab24 = foliosData.value.cab24;
    }
  });
  </script>
  