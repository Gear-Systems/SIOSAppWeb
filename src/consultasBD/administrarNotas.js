import {
  getDatabase,
  ref as refDB,
  child,
  update,
  set,
  push,
  remove,
} from "@firebase/database";
// import { useFolios } from "@/store/foliosController";

const foliosController = "";

export const guardarNuevaNota = async (msg, color_lateral, color_nuevo) => {
  const db = getDatabase();
  const notasRef = refDB(
    db,
    `folios/${foliosController.foliosData.incidencia}/${foliosController.foliosData.folioKey}/notas`
  );
  const nuevaNotaRef = push(notasRef);

  await update(nuevaNotaRef, {
    texto: msg,
    color: color_nuevo,
    colorLateral: color_lateral,
  });
  return nuevaNotaRef.key;
};

export const actualizarNota = async (
  msg,
  lateral_nuevo,
  color_nuevo,
  id_mensaje
) => {
  const db = getDatabase();
  update(
    child(
      refDB(db),
      `folios/${foliosController.foliosData.incidencia}/${foliosController.foliosData.folioKey}/notas/${id_mensaje}`
    ),
    {
      texto: msg,
      color: color_nuevo,
      colorLateral: lateral_nuevo,
    }
  ).catch(function (err) {});
};

export const eliminarNotaBD = async (folio, incidencia, tipoFolio, id_nota) => {
  const db = getDatabase();
  set(
    child(
      refDB(db),
      `folios/${foliosController.foliosData.incidencia}/${foliosController.foliosData.folioKey}/notas/${id_nota}`
    ),
    null
  );
};
