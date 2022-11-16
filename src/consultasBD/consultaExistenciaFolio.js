import {
  getDatabase,
  ref as refDB,
  get,
  set,
  child,
  query,
} from "@firebase/database";

export const validarExistencia = async (folio, tipoFolio, incidencia) => {
  const db = getDatabase();
  let existe = false;
  return (existe = new Promise(async (resolve, reject) => {
    await get(child(refDB(db), "folios"))
      .then((snapshot) => {
        snapshot.forEach((e) => {
          e.forEach((folios) => {
            if (folios.val().tipoFolio === tipoFolio && folios.key === folio) {
              resolve(true);
            }
          });
        });
        resolve(false);
      })
      .catch((error) => {
        reject(error);
      });
  }));
};
