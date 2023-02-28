<template>
  <div class="flex w-full flex-col">
    <Horario
      :state="props.estado"
      :incidencia="props.incidencia"
      :folio="props.folio"
      :tipoFolio="props.tipoFolio"
      :fechaInicioBD="props.data.horaActivacion"
      :horaInicioBD="props.data.horaActivacion"
      @guardarFecha="guardarFechaFunc"
    ></Horario>
    <div
      v-if="error"
      class="mt-2 flex w-[100%] items-center justify-center py-1"
      :class="rebotar"
    >
      <span class="text-xs font-semibold text-red-400">{{
        "Campo(s) requerido(s). Selecciona una fecha y horario válido"
      }}</span>
      <ExclamationCircleIcon class="ml-2 h-4 w-4 text-red-400" />
    </div>
    <!-- Si el tipo de folio es diferente a OT -->
    <div
      v-if="props.data.tipoFolio != 'OT'"
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
              :class="
                infoCapturada.eta.tiempo == ''
                  ? 'border-gris-claro'
                  : infoCapturada.eta.color
              "
            >
              {{
                moment(props.data.horaLlegada).diff(
                  moment(props.data.horaInicio),
                  "minutes"
                )
              }}
            </div>
          </div>
          <div class="flex w-[30%] flex-col">
            <div class="flex pb-2 text-xs text-gris-claro">SLA</div>
            <div
              class="w-[65%] items-center justify-center rounded-md border-2 bg-white p-1 text-center"
              :class="
                infoCapturada.sla.tiempo == '--:--'
                  ? 'border-gris-claro'
                  : infoCapturada.sla.color
              "
            >
              {{ sla }}
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
                      v-for="element in materialesFilterData.miscelaneos"
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
                      v-for="element in materialesFilterData.totalplay"
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
                      v-for="element in conceptosFilterData"
                      :key="element.keyConceptos"
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
                  <tr>
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
                          @click="openModal()"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Modal de Coordenadas -->
            <TransitionRoot appear :show="isOpen" as="template" class="z-50">
              <Dialog as="div" @close="closeModal" class="relative z-50">
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
                              @click="closeModal"
                            />
                          </div>
                        </DialogTitle>
                        <div
                          class="flex h-6 w-fit cursor-pointer items-center justify-center"
                          @click="agregarCoordenada"
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
                            :disabled="
                              !infoCapturada.conceptos.cab24[index].action
                            "
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
                            @blur="corroborarCoordenadas(index, item)"
                          />
                          <XCircleIcon
                            class="h-6 w-6 text-black hover:text-black"
                            aria-hidden="true"
                            @click="eliminarCoordenada(index)"
                          />
                        </div>
                        <div class="mt-4 flex justify-center">
                          <button
                            type="button"
                            class="mt-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            @click="closeModal"
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
      <div class="mt-14 mb-2 flex w-[100%] items-center justify-center">
        <button
          type="button"
          @click="openModalConfirmacion()"
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
            @close="closeModalConfirmacion"
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
                          @click="closeModalConfirmacion"
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
                          @click="closeModalConfirmacion"
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
import { ref, watch, computed, onMounted, reactive } from "vue";
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
import Horario from "@/views/Preventivo/Horario.vue";
import { store } from "@/store";
import { guardarCierre } from "@/consultasBD/guardarCierre.js";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import { SetupCalendar, Calendar, DatePicker } from "v-calendar";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { CalendarIcon, ClockIcon } from "@heroicons/vue/outline";
import { httpsCallable } from "@firebase/functions";

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

const infoCapturada = ref({
  justificacion: "Selecciona una justificación",
  ot: "",
  tiempoMuerto: store.state.a.tiempoMuerto,
  eta: await calculoEta(
    route.params.id,
    props.incidencia,
    props.data.horaInicio,
    props.data.horaLlegada
  ), // ETA
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
const error = ref(false);
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

onMounted(async () => {
  const almacenMiscelaneosRef = refDB(db, "almacen/materiales/miscelaneos");
  const almacenTotalplayRef = refDB(db, "almacen/materiales/totalplay");
  const conceptosRef = refDB(db, "catalogo/conceptos");
  const justificacionesRef = refDB(db, "catalogo/justificaciones");

  if (props.data.horaActivacion) {
    horario.value = props.data.horaActivacion;
  }

  // Obtener materiales miscelaneos
  await get(almacenMiscelaneosRef).then((snapshot) => {
    snapshot.forEach((element) => {
      materialesData.miscelaneos.push({
        keyMaterial: element.key,
        qty: 1,
        action: "new",
        ...element.val(),
      });
    });
    materialesFilterData.miscelaneos = materialesData.miscelaneos;
  });
  // Obtener materiales totaplay
  await get(almacenTotalplayRef).then((snapshot) => {
    snapshot.forEach((element) => {
      materialesData.totalplay.push({
        keyMaterial: element.key,
        qty: 1,
        action: "new",
        ...element.val(),
      });
    });
    materialesFilterData.totalplay = materialesData.totalplay;
  });

  // Obtener conceptos del catálogo
  await get(conceptosRef).then((snapshot) => {
    snapshot.forEach((element) => {
      conceptosData.value.push({
        keyConceptos: element.key,
        qty: 1,
        action: "new",
        ...element.val(),
      });
    });
    conceptosFilterData.value = conceptosData.value;
  });

  // Obtener justificaciones del catálogo
  await get(justificacionesRef).then((snapshot) => {
    justificacionesData.value = snapshot.val();
  });

  // Obtener potenciales
  if (props.data.potenciales) {
    if (props.data.potenciales.horaPrimeraMedicion) {
      infoCapturada.value.primeraMedicion =
        props.data.potenciales.horaPrimeraMedicion;
    }
    if (props.data.potenciales.potenciaInicial) {
      infoCapturada.value.potenciaInicial =
        props.data.potenciales.potenciaInicial;
    }
    if (props.data.potenciales.potenciaFinal) {
      infoCapturada.value.potenciaFinal = props.data.potenciales.potenciaFinal;
    }
  }

  // Buscar si hay materiales capturados previamente
  if (props.data.materiales) {
    // Miscelaneos
    if (props.data.materiales.miscelaneos) {
      props.data.materiales.miscelaneos.forEach((e, index) => {
        const indexData = materialesFilterData.miscelaneos.findIndex(
          (material) => material.keyMaterial === e.keyMaterial
        );
        materialesFilterData.miscelaneos.splice(indexData, 1);
      });
      infoCapturada.value.materiales.miscelaneos =
        props.data.materiales.miscelaneos;
    }
    // Totalplay
    if (props.data.materiales.totalplay) {
      props.data.materiales.totalplay.forEach((e, index) => {
        const indexData = materialesFilterData.totalplay.findIndex(
          (material) => material.keyMaterial === e.keyMaterial
        );
        materialesFilterData.totalplay.splice(indexData, 1);
      });
      infoCapturada.value.materiales.ttp = props.data.materiales.totalplay;
    }
  }
  // Buscar si hay conceptos capturados previamente
  if (props.data.conceptos) {
    props.data.conceptos.forEach((e, index) => {
      const indexData = conceptosFilterData.value.findIndex(
        (concepto) => concepto.keyConceptos === e.keyConceptos
      );
      conceptosFilterData.value.splice(indexData, 1);
    });
    infoCapturada.value.conceptos.descripcion = props.data.conceptos;
  }
  // Buscar si hay CAB24 capturado previamente
  if (props.data.cab24) {
    infoCapturada.value.conceptos.cab24 = props.data.cab24;
  }
});

// Función para eliminar material miscelaneo en la base de datos
const eliminarMaterialMiscelaneo = async (item, index) => {
  let object = item;
  object.qty = 1;
  const foliosRef = refDB(
    db,
    `folios/correctivos/${route.params.id}/materiales/miscelaneos`
  );
  const foliosData = await get(foliosRef);
  const materiales = foliosData.val();
  const materialIndex = materiales.findIndex(
    (mat) => mat.keyMaterial === item.keyMaterial
  );
  if (materialIndex !== -1) {
    materiales.splice(materialIndex, 1);
    await set(foliosRef, materiales).then(() => {
      infoCapturada.value.materiales.miscelaneos.splice(index, 1);
      materialesFilterData.miscelaneos.push(object);
    });
  }
};

const eliminarMaterialTotalplay = async (item, index) => {
  let object = item;
  if (object.action) {
    delete object.action;
  }
  object.qty = 1;
  const foliosRef = refDB(
    db,
    `folios/correctivos/${route.params.id}/materiales/totalplay`
  );
  const foliosData = await get(foliosRef);
  const materiales = foliosData.val();
  const materialIndex = materiales.findIndex(
    (mat) => mat.keyMaterial === item.keyMaterial
  );
  if (materialIndex !== -1) {
    materiales.splice(materialIndex, 1);
    await set(foliosRef, materiales).then(() => {
      infoCapturada.value.materiales.ttp.splice(index, 1);
      materialesFilterData.totalplay.push(object);
    });
  }
};

const eliminarConceptos = async (item, index) => {
  let object = item;
  if (object.action) {
    delete object.action;
  }
  object.qty = 1;
  const foliosRef = refDB(
    db,
    `folios/correctivos/${route.params.id}/conceptos`
  );
  const foliosData = await get(foliosRef);
  const conceptos = foliosData.val();
  const conceptoIndex = conceptos.findIndex(
    (mat) => mat.keyConceptos === item.keyConceptos
  );
  if (conceptoIndex !== -1) {
    conceptos.splice(conceptoIndex, 1);
    await set(foliosRef, conceptos).then(() => {
      infoCapturada.value.conceptos.descripcion.splice(index, 1);
      conceptosFilterData.value.push(object);
    });
  }
};

watch(
  () => fotos.value.despues.file,
  () => {
    errores.value.fotoDespues = fotos.value.despues.file ? false : true;
  }
);

function closeModal() {
  isOpen.value = false;
}
async function closeModalConfirmacion() {
  modalConfirmacion.value = false;
  return "closing";
}
const openModal = () => {
  let i = 0;
  if (infoCapturada.value.conceptos.cab24.length > 1) {
    while (i <= infoCapturada.value.conceptos.cab24.length) {
      if (i != 0 && infoCapturada.value.conceptos.cab24[i] == "") {
        infoCapturada.value.conceptos.cab24.splice(i, 1);
        infoCapturada.value.conceptos.errores.splice(i, 1);
        i--;
      }
      i++;
    }
  }
  isOpen.value = true;
};

function cambiarError() {
  if (errorCoord.value) {
    errorCoord.value = false;
  }
}

const selectFileDespues = async (e) => {
  fotos.value.despues.file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(fotos.value.despues.file);
  reader.onload = (event) => {
    fotos.value.despues.file64 = reader.result;
  };
  // fotos.value.despues.file64 = URL.createObjectURL(fotos.value.despues.file64)
};
/* const eliminarImgDespues = () => {
    fotos.value.despues.file = null;
    fotos.value.despues.file64 = null;
  };
  const actualizarTiempoMuerto = async () => {
    if (infoCapturada.value.tiempoMuerto == "") {
      infoCapturada.value.tiempoMuerto = 0;
    }
    store.commit("actualizarTiempoMuerto", infoCapturada.value.tiempoMuerto);
    guardarTiempoMuerto(
      props.folio,
      infoCapturada.value.tiempoMuerto,
      props.incidencia,
      props.tipoFolio
    );
    let sla = await calculoSla(
      props.folio,
      props.incidencia,
      props.tipoFolio,
      store.state.a.tiempoMuerto
    );
    store.commit("asignarSla", sla);
    validarTiempoMuerto.value = true;
  }; */

const isNumber = ($event) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if (keyCode < 48 || keyCode > 57) {
    $event.preventDefault();
  }
  if ($event) {
  }
};

const agregarCoordenada = () => {
  infoCapturada.value.conceptos.cab24.push("");
};
const corroborarCoordenadas = (index, item) => {
  mostrarErrorCoordenadas.value = false;
  infoCapturada.value.conceptos.errores[index] =
    validacionCoordenadasCab24(item);
  infoCapturada.value.conceptos.errores.forEach((element, index) => {
    if (element) {
      mostrarErrorCoordenadas.value = true;
    }
  });
};
const eliminarCoordenada = async (n) => {
  // Eliminar item en el arreglo
  infoCapturada.value.conceptos.cab24.splice(n, 1);
  // Subir a la base de datos nuevo arreglo
  await set(
    refDB(db, `folios/correctivos/${route.params.id}/cab24`),
    infoCapturada.value.conceptos.cab24
  );
  infoCapturada.value.conceptos.errores.splice(n, 1);
  mostrarErrorCoordenadas.value = false;
  infoCapturada.value.conceptos.errores.forEach((element) => {
    if (element) {
      mostrarErrorCoordenadas.value = true;
    }
  });
  if (infoCapturada.value.conceptos.cab24.length == 0) {
    agregarCoordenada();
  }
};

const openModalConfirmacion = () => {
  if (infoCapturada.value.ot === "" && props.data.tipoFolio != "OT") {
    alert("La OT es requerida para finalizar el folio.");
    return false;
  }
  if (
    infoCapturada.value.conceptos.descripcion.length === 0 &&
    infoCapturada.value.conceptos.cab24.filter(Boolean).length === 0
  ) {
    alert("Se debe colocar al menos un concepto.");
    return false;
  }
  modalConfirmacion.value = true;
};

const validaryEnviarInfo = async () => {
  const finalizarFolioFirebase = httpsCallable(
    functions,
    "finalizarFoliosCorrectivos"
  );
  if (infoCapturada.value.materiales) {
    if (infoCapturada.value.materiales.miscelaneos) {
      for (const material in infoCapturada.value.materiales.miscelaneos) {
        if (infoCapturada.value.materiales.miscelaneos[material].action) {
          delete infoCapturada.value.materiales.miscelaneos[material].action;
        }
      }
    }
  }
  if (infoCapturada.value.materiales) {
    if (infoCapturada.value.materiales.ttp) {
      for (const material in infoCapturada.value.materiales.ttp) {
        if (infoCapturada.value.materiales.ttp[material].action) {
          delete infoCapturada.value.materiales.ttp[material].action;
        }
      }
    }
  }

  if (infoCapturada.value.conceptos.descripcion) {
    for (const concepto in infoCapturada.value.conceptos.descripcion) {
      if (infoCapturada.value.conceptos.descripcion[concepto].action) {
        delete infoCapturada.value.conceptos.descripcion[concepto].action;
      }
    }
  }

  await finalizarFolioFirebase({
    folioKey: route.params.id,
    ...infoCapturada.value,
  });
  storeVuex.commit("cerrarModalManejoFolio");
  router.push("/capturar-folio");
  // limpiarValores();
};

const guardarFechaFunc = (event) => {
  horario.value = event;
};

const guardarSla = async (sla) => {
  await update(refDB(db, `folios/correctivos/${route.params.id}`), {
    sla: sla,
  });
};

const sla = computed(() => {
  let fecha1 = moment(props.data.horaInicio);
  let fecha2 = moment(horario.value);

  // if (infoCapturada.value.tiempoMuerto) {
  //   fecha2.add(-infoCapturada.value.tiempoMuerto, "minutes");
  // }

  if (horario.value) {
    let horaCompleta = moment
      .duration(fecha2.diff(fecha1))
      .asHours()
      .toFixed(2);

    if (horaCompleta > 1) {
      let hora = horaCompleta.split(".")[0];
      let minutos = ((0 + "." + horaCompleta.split(".")[1]) * 60).toFixed(0);

      guardarSla(
        `${hora}:${
          minutos >= 0 && minutos <= 9 ? `0${minutos.toString()}` : minutos
        }`
      );
      // minutos -= infoCapturada.value.tiempoMuerto;
      return `${hora}:${
        minutos >= 0 && minutos <= 9 ? `0${minutos.toString()}` : minutos
      }`;
    }
    if (horaCompleta < 1) {
      guardarSla(parseInt(horaCompleta * 60));
      return parseInt(horaCompleta * 60);
    }
    guardarSla(`${horaCompleta.replace(".", ":")}`);
    return `${horaCompleta.replace(".", ":")}`;
  }
});

const limpiarValores = () => {
  arrayActiveHora.forEach((value, index) => {
    arrayActiveHora[index] = "";
  });
  arrayActiveMinuto.forEach((value, index) => {
    arrayActiveMinuto[index] = "";
  });
  fecha.value = null;
  hora.value = null;
  minuto.value = null;
  error.value = false;
  rebotar.value = "";
  validacionHorario.value = [false, false, false];

  // --> Limpiar la muestra de justificacion con el commit
  // --> Limpiar la SLA con el commit
  store.commit("limpiarJustificacion");
  store.commit("limpiarSLA");
};
</script>
