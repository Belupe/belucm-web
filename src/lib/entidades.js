// Definición de las tablas editables desde el panel.
// Los nombres de columna SOLO salen de aquí: nunca del cuerpo de la petición.

const T = { texto: 'texto', entero: 'entero', bool: 'bool', lista: 'lista' };

export const ENTIDADES = {
  ajustes: {
    tabla: 'ajustes',
    singleton: true,
    clave: 'id',
    columnas: {
      nombre: T.texto,
      titular: T.texto,
      descripcion: T.texto,
      avatar_url: T.texto,
      cta_texto: T.texto,
      contacto_nombre: T.texto,
      contacto_email: T.texto,
      contacto_ubicacion: T.texto,
      contacto_intro: T.texto,
      pie_texto: T.texto,
      meta_titulo: T.texto,
      meta_descripcion: T.texto,
      color_acento: T.texto,
    },
  },
  secciones: {
    tabla: 'secciones',
    clave: 'clave',
    claveTexto: true,
    sinAlta: true,
    sinBaja: true,
    orden: 'orden, clave',
    columnas: { titulo: T.texto, subtitulo: T.texto, visible: T.bool, orden: T.entero },
  },
  redes: {
    tabla: 'redes',
    clave: 'id',
    orden: 'orden, id',
    columnas: {
      nombre: T.texto,
      icono: T.texto,
      url: T.texto,
      valor: T.texto,
      en_contacto: T.bool,
      orden: T.entero,
      visible: T.bool,
    },
  },
  categorias: {
    tabla: 'habilidad_categorias',
    clave: 'id',
    orden: 'orden, id',
    columnas: { nombre: T.texto, icono: T.texto, orden: T.entero },
  },
  habilidades: {
    tabla: 'habilidades',
    clave: 'id',
    orden: 'orden, id',
    columnas: { categoria_id: T.entero, nombre: T.texto, orden: T.entero },
  },
  educacion: {
    tabla: 'educacion',
    clave: 'id',
    orden: 'orden, id',
    columnas: {
      titulo: T.texto,
      institucion: T.texto,
      institucion_url: T.texto,
      periodo: T.texto,
      descripcion: T.texto,
      logo_url: T.texto,
      orden: T.entero,
      visible: T.bool,
    },
  },
  experiencia: {
    tabla: 'experiencia',
    clave: 'id',
    orden: 'orden, id',
    columnas: {
      puesto: T.texto,
      empresa: T.texto,
      empresa_url: T.texto,
      periodo: T.texto,
      actual: T.bool,
      descripcion: T.texto,
      logo_url: T.texto,
      tecnologias: T.lista,
      orden: T.entero,
      visible: T.bool,
    },
  },
  proyectos: {
    tabla: 'proyectos',
    clave: 'id',
    orden: 'orden, id',
    columnas: {
      titulo: T.texto,
      resumen: T.texto,
      descripcion: T.texto,
      imagen_url: T.texto,
      video_url: T.texto,
      tecnologias: T.lista,
      destacado: T.bool,
      orden: T.entero,
      visible: T.bool,
    },
  },
  mensajes: {
    tabla: 'mensajes',
    clave: 'id',
    sinAlta: true,
    orden: 'creado_en DESC, id DESC',
    columnas: { leido: T.bool },
  },
};

export function convertir(tipo, valor) {
  switch (tipo) {
    case 'entero': {
      const n = parseInt(valor, 10);
      return Number.isFinite(n) ? n : 0;
    }
    case 'bool':
      return valor === true || valor === 'true' || valor === 1 || valor === '1';
    case 'lista':
      if (Array.isArray(valor)) return valor.map((v) => String(v).trim()).filter(Boolean);
      return String(valor || '')
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);
    default:
      return valor === null || valor === undefined ? '' : String(valor);
  }
}

/** Devuelve { columnas: [...], valores: [...] } solo con las claves permitidas. */
export function prepararCampos(def, cuerpo, { soloPresentes = true } = {}) {
  const columnas = [];
  const valores = [];
  for (const [col, tipo] of Object.entries(def.columnas)) {
    const presente = Object.prototype.hasOwnProperty.call(cuerpo, col);
    if (soloPresentes && !presente) continue;
    columnas.push(col);
    valores.push(convertir(tipo, presente ? cuerpo[col] : tipo === 'lista' ? [] : ''));
  }
  return { columnas, valores };
}
