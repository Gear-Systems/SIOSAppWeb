import { defineStore } from "pinia";
import { get, ref as refDB, child } from "firebase/database";
import { db } from "@/firebase/firebase";

export const useFolios = defineStore({
  id: "folios",
  state: () => ({}),
  actions: {
    validarExistencia(folio, tipoFolio) {
      return new Promise(async (resolve, reject) => {
        await get(child(refDB(db), "folios"))
          .then((snapshot) => {
            snapshot.forEach((e) => {
              e.forEach((folios) => {
                if (
                  folios.val().tipoFolio === tipoFolio &&
                  folios.key === folio
                ) {
                  resolve(true);
                }
              });
            });
            resolve(false);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
