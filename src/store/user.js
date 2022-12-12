import { defineStore } from "pinia";
import { auth } from "@/firebase/firebase";

export const useUser = defineStore({
  id: "users",
  state: () => ({
    rol: "",
  }),
  actions: {
    getUserRol(folio, tipoFolio) {
      return new Promise(async (resolve, reject) => {
        await auth.currentUser
          .getIdTokenResult(true)
          .then((result) => {
            this.rol = result
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
