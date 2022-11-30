import {
  getDatabase,
  ref as refDB,
  get,
  set,
  child,
  update,
} from "@firebase/database";

export const guardarFechaInicio = (folio, incidencia, timestamp) => {
  const db = getDatabase();
  update(
    child(
      refDB(db),
      `folios/` +
        (incidencia == 1 ? `preventivos` : `correctivos`) +
        `/${folio}`
    ),
    { horaInicio: timestamp.getTime() }
  );
};

export const guardarFechaLlegada = (folio, incidencia, timestamp) => {
  const db = getDatabase();
  update(
    child(
      refDB(db),
      `folios/` +
        (incidencia == 1 ? `preventivos` : `correctivos`) +
        `/${folio}`
    ),
    { horaLlegada: timestamp.getTime() }
  );
};

export const guardarFechaActivacion = (folio, incidencia, timestamp) => {
  const db = getDatabase();
  update(
    child(
      refDB(db),
      `folios/` +
        (incidencia == 1 ? `preventivos` : `correctivos`) +
        `/${folio}`
    ),
    { horaActivacion: timestamp.getTime() }
  );
};
