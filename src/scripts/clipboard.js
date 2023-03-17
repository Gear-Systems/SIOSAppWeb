import { db } from "../firebase/firebase";
import { ref as refDB, get, update } from "firebase/database";

const formatDate = (date) => {
  let fecha = new Date(date);
  return `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;
};
const clipboardCorrectivo = async (item) => {
  let horaAsignacion = formatDate(item.horaInicio);
  let horaLlegada = formatDate(item.horaLlegada);
  let horaActivacion = formatDate(item.horaActivacion);
  let horaPremerMedicion = formatDate(item.potenciales.horaPrimeraMedicion);
  let supervisoresTTP = "";
  let despachoTTP = "";
  let ubicacionData = "";
  const coordenadas = item.coordenadas.split(",");

  if (!item.ubicacion) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordenadas[0]},${coordenadas[1]}&location_type=ROOFTOP&result_type=street_address&key=AIzaSyBqOgizUSx7Sx4RudGJH841N0ODjepjMl4`;
    const ubicacion = await fetch(url, {
      method: "post",
    });
    ubicacionData = await ubicacion.json();
    if ((ubicacionData.status = "OK")) {
      ubicacionData = ubicacionData.results[0].formatted_address;
      update(refDB(db, `folios/correctivos/${item.folioKey}`), {
        ubicacion: ubicacionData,
      });
    } else {
      ubicacionData = "Ubicación no encontrada.";
      alert(
        "¡Cuidado! No encontramos la ubicación con las coordenadas del folio"
      );
    }
  } else {
    ubicacionData = item.ubicacion;
  }

  let format = ` *FOLIO*: ${item.folio}
*OT*: ${item.ot ? item.ot : horaPremerMedicion}
*UBICACIÓN_DE_1er_,_2do_NIVEL_Y_DERIVACION_CON_SU*: null
*CAUSA DEL DAÑO*: ${item.causa}
*UBICACIÓN DEL DAÑO*: null
*COORDENADAS_DEL_DAÑO*: ${item.coordenadas}
*POTENCIA INICIAL*: ${item.potenciales.potenciaInicial}
*POTENCIA FINAL*: ${item.potenciales.potenciaFinal}
*COORDENADAS_DEL CAB_24*: null
*TRABAJOS_REALIZADOS (CONCEPTOS)*: `;

  item.conceptos.forEach((e) => {
    format += `${e.keyConceptos}\n`;
  });

  format += `*DESCRIP_DE_ACTIVIDADES*: `;

  for (const nota in item.notas) {
    console.log(item.notas[nota].texto);
    format += `-${item.notas[nota].texto}\n`;
  }

  format += `*MATERIALES UTILIZADOS*: `;

  if (item.materiales.totalplay) {
    item.materiales.totalplay.forEach((e) => {
      format += `${e.keyMaterial}\n`;
    });
  }

  const tecnicoName = await get(refDB(db, `usuarios/${item.tecnico}`));
  const distritoData = await get(
    refDB(db, `catalogo/distritos/${item.distrito}`)
  );

  format += `*FECHA_HR_FINAL_DE_ REPARACION*: ${horaActivacion}
*ATIENDE_NOM_TEC*: ${tecnicoName.val().displayName}
*PROVEEDOR*:  ios
*SUPERVISOR*: `;

  if (distritoData.hasChild("supervisores ttp")) {
    supervisoresTTP = distritoData.val()["supervisores ttp"];
  } else {
    alert("¡Cuidado! El distrito no tiene supervisores de totalplay");
  }

  if (distritoData.hasChild("despachoTTP")) {
    despachoTTP = distritoData.val().despachoTTP;
  } else {
    alert("¡Cuidado! El distrito no tiene despacho de ttp");
  }

  for (const supervisorttp in supervisoresTTP) {
    format += ` ${supervisorttp}`;
  }

  format += `\n*ATENDIO_DESP*: ${despachoTTP}
*JUSTIFICACIÓN DEL SLA*: null`;

  try {
    navigator.clipboard.writeText(format);
  } catch (e) {
    console.log(e);
  }
};

export { clipboardCorrectivo };
