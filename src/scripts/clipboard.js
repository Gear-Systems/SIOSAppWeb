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
  console.log("coordenadas", item);

  if (!item.ubicacion) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordenadas[0]},${coordenadas[1]}&location_type=ROOFTOP&result_type=street_address&key=AIzaSyBqOgizUSx7Sx4RudGJH841N0ODjepjMl4`;
    const ubicacion = await fetch(url, {
      method: "post",
    });
    ubicacionData = await ubicacion.json();
    console.log("ubicacion", ubicacionData)
    if (!ubicacionData.status == "ZERO_RESULTS") {
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
UBICACIÓN DEL DAÑO: ${ubicacionData}
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
  const distritoData = await get(
    refDB(db, `catalogo/distritos/${item.distrito}`)
  );

  format += `FECHA_HR_FINAL_DE_ REPARACION: ${horaActivacion}
ATIENDE_NOM_TEC: ${tecnicoName.val().displayName}
PROVEEDOR: ios
SUPERVISOR:\n`;

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
  console.log("supervisores", supervisoresTTP);

  for (const supervisorttp in supervisoresTTP) {
    format += `${supervisorttp}\n`;
  }

  format += `ATENDIO_DESP: ${despachoTTP}
JUSTIFICACIÓN DEL SLA: null`;

  try {
    navigator.clipboard.writeText(format);
  } catch (e) {
    console.log(e);
  }
};

export { clipboardCorrectivo };
