import { defineStore } from "pinia";
import { db, functions } from "@/firebase/firebase";
import { ref, get, onChildChanged, update } from "firebase/database";
import { httpsCallable } from "firebase/functions";
import moment from "moment";

const asignarFolioCorrectivo = httpsCallable(
  functions,
  "asignarFolioCorrectivo"
);

export const useFolios = defineStore("folios-controller", {
  state: () => ({
    foliosData: {},
    horaInicio: new Date(),
    horaLlegada: new Date(),
    horaActivacion: new Date(),
    paso: 1,
    coordenadas: "",
    modalManejoFolio: false,
    control: 0,
    editarFolio: false,
    error: {
      code: 0,
      isError: false,
      message: "",
    },
  }),
  getters: {
    eta() {
      const eta = moment(this.horaLlegada).diff(this.horaInicio, "minutes");
      if (eta < 0) {
        Object.assign(this.error, {
          code: 1,
          isError: true,
          message: "La hora de llegada no puede ser menor a la hora de inicio.",
        });
      } else {
        Object.assign(this.error, {
          code: 0,
          isError: false,
          message: "",
        });
        return eta;
      }
    },
    sla() {
      const sla = moment(this.horaActivacion).diff(this.horaInicio, "minutes");
      const comprobarEta = moment(this.horaActivacion).diff(
        this.horaLlegada,
        "minutes"
      );
      if (sla < 0 || comprobarEta < 0) {
        Object.assign(this.error, {
          code: 2,
          isError: true,
          message:
            "La hora de activación no puede ser menor a la hora de inicio ni a la hora de llegada.",
        });
      } else {
        Object.assign(this.error, {
          code: 0,
          isError: false,
          message: "",
        });
        return sla;
      }
    },
  },
  actions: {
    async fetchData(folioKey, incidencia) {
      const foliosRef = ref(db, `folios/${incidencia}/${folioKey}`);
      await get(foliosRef).then(async (snapshot) => {
        this.foliosData = {
          incidencia: incidencia,
          folioKey: folioKey,
          ...snapshot.val(),
        };
        // if (this.control == 0) {
        this.initHoraInicio();
        this.initHoraLlegada();
        this.initHoraActivacion();
        this.initCoordenadas();
        this.initPaso();
        this.control = 1;
        // }
      });
    },
    initHoraInicio() {
      if (this.foliosData.horaInicio) {
        return (this.horaInicio = new Date(this.foliosData.horaInicio));
      } else {
        return (this.horaInicio = new Date());
      }
    },
    initHoraLlegada() {
      if (this.foliosData.horaLlegada) {
        return (this.horaLlegada = new Date(this.foliosData.horaLlegada));
      } else {
        return (this.horaLlegada = new Date());
      }
    },
    initHoraActivacion() {
      if (this.foliosData.horaActivacion) {
        return (this.horaActivacion = new Date(this.foliosData.horaActivacion));
      } else {
        return (this.horaActivacion = new Date());
      }
    },
    initCoordenadas() {
      if (this.foliosData.coordenadas) {
        this.coordenadas = this.foliosData.coordenadas;
      } else {
        this.coordenadas = "";
      }
    },
    initPaso() {
      if (this.foliosData.paso) {
        this.paso = this.foliosData.paso;
      } else {
        this.paso = 1;
      }
    },
    async paso1() {
      if (this.foliosData.paso == 1) {
        this.modalManejoFolio = true;
      } else {
        this.asignarHoraInicio().then(() => {
          alert("Folio actualizado");
        });
      }
    },
    async paso2() {
      await this.asignarHoraLlegada().then(() => {
        alert("Folio actualizado");
      });
    },
    async asignarCorrectivo(key) {
      await asignarFolioCorrectivo({
        key: key,
        tecnicoUid: this.foliosData.tecnico,
      }).catch((e) => {
        alert("Error al asignar el folio, por favor contactar a soporte");
        console.log("ERROR:", e);
      });
    },
    async asignarHoraInicio() {
      await update(
        ref(
          db,
          `folios/${this.foliosData.incidencia}/${this.foliosData.folioKey}`
        ),
        {
          horaInicio: this.horaInicio.getTime(),
          paso: this.foliosData.paso == 1 ? 2 : this.foliosData.paso,
        }
      );
    },
    async asignarHoraLlegada() {
      await update(
        ref(
          db,
          `folios/${this.foliosData.incidencia}/${this.foliosData.folioKey}`
        ),
        {
          horaLlegada: this.horaLlegada.getTime(),
          paso: this.foliosData.paso == 2 ? 3 : this.foliosData.paso,
          estatus:
            this.foliosData.estatus != "En proceso"
              ? "En proceso"
              : this.foliosData.estatus,
          estatusId:
            this.foliosData.estatusId == 3 ? 4 : this.foliosData.estatusId,
          coordenadas: this.coordenadas,
        }
      );
    },
    async actualizarPaso3(infoCapturada) {
      if (!this.error.isError) {
        await update(
          ref(
            db,
            `folios/${this.foliosData.incidencia}/${this.foliosData.folioKey}`
          ),
          {
            horaActivacion: this.horaActivacion.getTime(),
            materiales: {
              miscelaneos: infoCapturada.materiales.miscelaneos,
              totalplay: infoCapturada.materiales.ttp,
            },
            conceptos: infoCapturada.conceptos.descripcion,
            cab24: infoCapturada.conceptos.cab24,
            potenciales: {
              horaPrimeraMedicion: infoCapturada.primeraMedicion.getTime(),
              potenciaInicial: infoCapturada.potenciaInicial,
              potenciaFinal: infoCapturada.potenciaFinal,
            },
          }
        ).then(() => {
          alert("Folio actualizado");
        });
      } else {
        alert("Existen errores");
      }
    },
  },
});
