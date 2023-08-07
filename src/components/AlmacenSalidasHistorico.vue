<template>
    <div class="relative overflow-x-auto">

        <!-- Tabla de los archivos subidos -->

        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">

            <!-- Títulos -->

            <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-6 text-center">Nombre del archivo</th>
                    <th scope="col" class="py-3 px-6 text-center">Subido</th>
                    <th scope="col" class="py-3 px-6 text-center">Descargar archivo</th>
                </tr>
            </thead>

            <!-- Contenido proporcioando por los archivos -->

            <tbody>
                <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800" >
                    <th scope="row"
                        class="whitespace-nowrap text-center py-4 px-6 font-medium text-gray-900 dark:text-white">
                        item nombre
                    </th>
                    <td class="py-4 px-6 text-center">Fecha</td>
                    <td class="py-4 px-6 text-center">
                        <div class="flex justify-center cursor-pointer">
                            <DownloadIcon class="w-5 h-5" aria-hidden="true" />
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { DownloadIcon } from "@heroicons/vue/outline";

</script>