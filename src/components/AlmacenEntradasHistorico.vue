<template>
    <div class="relative overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-6 text-center">Nombre del archivo</th>
                    <th scope="col" class="py-3 px-6 text-center">Subido</th>
                    <th scope="col" class="py-3 px-6 text-center">Descargar archivo</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800" v-for="item in data"
                    :key="item.nombre">
                    <th scope="row"
                        class="whitespace-nowrap text-center py-4 px-6 font-medium text-gray-900 dark:text-white">
                        {{ item.nombre }}
                    </th>
                    <td class="py-4 px-6 text-center">{{ `${new Date(item.creado).getDate()}/${new
                            Date(item.creado).getMonth()}/${new Date(item.creado).getFullYear()} ${new
                                Date(item.creado).getHours()}:${new Date(item.creado).getMinutes()}`
                    }}</td>
                    <td class="py-4 px-6 text-center">
                        <div class="flex justify-center cursor-pointer" @click="descargar(item.url)">
                            <DownloadIcon class="w-5 h-5" aria-hidden="true" />
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { db } from "@/firebase/firebase";
import { get, ref as refDB, orderByChild, query, startAt, endAt } from "firebase/database";
import { DownloadIcon } from "@heroicons/vue/outline";

const data = reactive([])

const fetchData = async () => {
    let queryDb = query(refDB(db, "almacen/historico/entradas"), orderByChild("creado", "asc"), endAt(new Date().getTime()))
    await get(queryDb).then((snapshot) => {
        snapshot.forEach((element) => {
            data.push({ ...element.val() })
        })
    })
}

await fetchData();

const descargar = (url) => {
    window.location.href = url;
}
</script>