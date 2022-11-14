<template>
  <div class="flex w-full">
    <!-- Observaciones -->
    <div class="flex basis-44 flex-col"></div>
    <!-- Formulario -->
    <div class="flex flex-col w-full overflow-auto px-2">
      <div class="flex">
        <div>
          <h1 class="text-lg font-semibold">Información del folio</h1>
          <form class="mt-5">
            <div class="flex space-x-5">
              <div class="flex flex-col">
                <label class="text-sm text-[#7C8495]" for="name">Folio</label>
                <input
                  class="w-[250px] rounded-md border-2 border-[#7C8495] font-semibold font-light placeholder:font-normal focus:ring-0"
                  type="text"
                  id="name"
                />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-[#7C8495]" for="name">Tipo</label>
                <input
                  class="w-[130px] rounded-md border-2 border-[#7C8495] font-light placeholder:font-normal focus:ring-0"
                  type="text"
                  id="name"
                />
              </div>
            </div>
            <div class="mt-6 flex space-x-5">
              <div class="flex flex-col">
                <label class="text-sm text-[#7C8495]" for="name"
                  >Distrito</label
                >
                <input
                  class="w-[250px] rounded-md border-2 border-[#7C8495] font-semibold font-light placeholder:font-normal focus:ring-0"
                  type="text"
                  id="name"
                />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-[#7C8495]" for="name">Cluster</label>
                <input
                  class="w-[250px] rounded-md border-2 border-[#7C8495] font-light placeholder:font-normal focus:ring-0"
                  type="text"
                  id="name"
                />
              </div>
            </div>
            <div class="mt-6 flex space-x-5">
              <div class="flex flex-col">
                <label class="text-sm text-[#7C8495]" for="name"
                  >Supervisor</label
                >
                <input
                  class="w-[250px] rounded-md border-2 border-[#7C8495] font-semibold font-light placeholder:font-normal focus:ring-0"
                  type="text"
                  id="name"
                />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-[#7C8495]" for="name">Técnico</label>
                <input
                  class="w-[250px] rounded-md border-2 border-[#7C8495] font-light placeholder:font-normal focus:ring-0"
                  type="text"
                  id="name"
                />
              </div>
            </div>
            <div class="mt-6 flex space-x-5">
              <div class="flex flex-col">
                <label class="text-sm text-[#7C8495]" for="name">OLT</label>
                <input
                  class="w-[250px] rounded-md border-2 border-[#7C8495] font-semibold font-light placeholder:font-normal focus:ring-0"
                  type="text"
                  id="name"
                />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-[#7C8495]" for="name">Falla</label>
                <input
                  class="w-[250px] rounded-md border-2 border-[#7C8495] font-light placeholder:font-normal focus:ring-0"
                  type="text"
                  id="name"
                />
              </div>
            </div>
            <div class="mt-6 flex space-x-5">
              <div class="flex flex-col">
                <label class="text-sm text-[#7C8495]" for="name">Causa</label>
                <input
                  class="w-[250px] rounded-md border-2 border-[#7C8495] font-semibold font-light placeholder:font-normal focus:ring-0"
                  type="text"
                  id="name"
                />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-[#7C8495]" for="name"
                  >Clientes afectados</label
                >
                <input
                  class="w-[250px] rounded-md border-2 border-[#7C8495] font-light placeholder:font-normal focus:ring-0"
                  type="text"
                  id="name"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="px-4">
          <h1 class="text-lg font-semibold">
            Hora de inicio/Asignación despacho
          </h1>
        </div>
      </div>
      <div class="h-[2px] w-full bg-[#7C8495] mt-8"></div>
      <div class="flex">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>
