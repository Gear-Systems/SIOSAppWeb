import { db } from "../firebase/firebase";
import { ref as refDB, get } from "firebase/database";

const formatDate = (date) => {
  let fecha = new Date(date);
  return `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;
};
const clipboard = async (item) => {
  let horaAsignacion = formatDate(item.horaInicio);
  let horaLlegada = formatDate(item.horaLlegada);
  let horaActivacion = formatDate(item.horaActivacion);
  let horaPremerMedicion = formatDate(item.potenciales.horaPrimeraMedicion);

  let format = `FOLIO: ${item.folio}
OT: ${item.ot ? item.ot : null}
DISTRITO: ${item.ot ? item.ot : null}
CLUSTER: ${item.cluster}
OLT: ${item.olt}
CLIENTES AFECTADOS: ${item.clientesAfectados}
FALLA REPORTADA: ${item.falla}
FECHA_Y_HR_DE_ASG_DESP: ${horaAsignacion}
FECHA_Y_HR_DE_ASG_PROV: ${horaAsignacion}
HR_DE_LLEGADA_A_LA_ZONA: ${horaLlegada}
HR_DE_LA_1er_MEDICION: ${horaPremerMedicion}
UBICACIÓN_DE_1er__2do_NIVEL_Y_DERIVACION_CON_SU: null
CAUSA DEL DAÑO: ${item.causa}
UBICACIÓN DEL DAÑO: null
COORDENADAS_DEL_DAÑO: ${item.coordenadas}
DESCRIP_DE_ACTIVIDADES: null
POTENCIA INICIAL: ${item.potenciales.potenciaInicial}
POTENCIA FINAL: ${item.potenciales.potenciaFinal}
TRABAJOS_REALIZADOS (CONCEPTOS):\n`;

  item.conceptos.forEach((e) => {
    format += `${e.keyConceptos}\n`;
  });

  format += `MATERIALES UTILIZADOS:\n`;

  if (item.materiales.totalplay) {
    item.materiales.totalplay.forEach((e) => {
      format += `${e.keyMaterial}\n`;
    });
  }

  const tecnicoName = await get(refDB(db, `usuarios/${item.tecnico}`));

  format += `FECHA_HR_FINAL_DE_ REPARACION: ${horaActivacion}
ATIENDE_NOM_TEC: ${tecnicoName.val().displayName}
PROVEEDOR: ios
SUPERVISOR:\n`;

  const supervisoresTTP = await get(
    refDB(db, `catalogo/distritos/${item.distrito}/supervisores ttp`)
  );

  supervisoresTTP.forEach((e) => {
    format += `${e.key}\n`;
  });

  format += `ATENDIO_DESP: null
JUSTIFICACIÓN DEL SLA: null`;

  try {
    navigator.clipboard.writeText(format);
  } catch (e) {
    console.log(e);
  }
};

export default clipboard;
