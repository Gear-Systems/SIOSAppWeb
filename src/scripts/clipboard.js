const formatDate = (date) => {
  let fecha = new Date(date);
  return `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;
};
const clipboard = (item) => {
  let horaAsignacion = formatDate(item.horaInicio);
  let horaLlegada = formatDate(item.horaLlegada);
  let horaActivacion = formatDate(item.horaActivacion);
  let horaPremerMedicion = formatDate(item.potenciales.horaPrimeraMedicion);
  let format = {
    FOLIO: item.folio,
    OT: item.ot ? item.ot : null,
    DISTRITO: item.distrito,
    CLUSTER: item.cluster,
    OLT: item.olt,
    "CLIENTES AFECTADOS": item.clientesAfectados,
    "FALLA REPORTADA": item.falla,
    FECHA_Y_HR_DE_ASG_DESP: horaAsignacion,
    FECHA_Y_HR_DE_ASG_PROV: horaAsignacion,
    HR_DE_LLEGADA_A_LA_ZONA: horaLlegada,
    HR_DE_LA_1er_MEDICION: horaPremerMedicion,
    "UBICACIÓN_DE_1er_,_2do_NIVEL_Y_DERIVACION_CON_SU": null,
    "CAUSA DEL DAÑO": item.causa,
    "UBICACIÓN DEL DAÑO": null,
    COORDENADAS_DEL_DAÑO: item.coordenadas,
    DESCRIP_DE_ACTIVIDADES: null,
    "POTENCIA INICIAL": item.potenciales.potenciaInicial,
    "POTENCIA FINAL": item.potenciales.potenciaFinal,
    "TRABAJOS_REALIZADOS (CONCEPTOS)": null,
    "COORDENADAS_DEL CAB_24": null,
    "MATERIALES UTILIZADOS": null,
    "FECHA_HR_FINAL_DE_ REPARACION": horaActivacion,
    ATIENDE_NOM_TEC: null,
    PROVEEDOR: null,
    SUPERVISOR: null,
    ATENDIO_DESP: null,
    "JUSTIFICACIÓN DEL SLA": null,
  };
  try {
    navigator.clipboard.writeText(JSON.stringify(format));
  } catch (e) {
    console.log(e);
  }
};

export default clipboard;
