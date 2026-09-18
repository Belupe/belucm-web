import { Pool } from 'pg';
import { hashPassword } from './password';

const globalForDb = globalThis;

function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30000,
  });
}

export const pool = globalForDb.__pgPool || (globalForDb.__pgPool = createPool());

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res.rows;
}

export async function one(text, params) {
  const rows = await query(text, params);
  return rows[0] || null;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS ajustes (
  id                 SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  nombre             TEXT NOT NULL DEFAULT '',
  titular            TEXT NOT NULL DEFAULT '',
  descripcion        TEXT NOT NULL DEFAULT '',
  avatar_url         TEXT NOT NULL DEFAULT '',
  cta_texto          TEXT NOT NULL DEFAULT 'Ver mis proyectos',
  contacto_nombre    TEXT NOT NULL DEFAULT '',
  contacto_email     TEXT NOT NULL DEFAULT '',
  contacto_ubicacion TEXT NOT NULL DEFAULT '',
  contacto_intro     TEXT NOT NULL DEFAULT '',
  pie_texto          TEXT NOT NULL DEFAULT '',
  meta_titulo        TEXT NOT NULL DEFAULT '',
  meta_descripcion   TEXT NOT NULL DEFAULT '',
  color_acento       TEXT NOT NULL DEFAULT '#8b7cf6'
);

CREATE TABLE IF NOT EXISTS secciones (
  clave     TEXT PRIMARY KEY,
  titulo    TEXT NOT NULL DEFAULT '',
  subtitulo TEXT NOT NULL DEFAULT '',
  visible   BOOLEAN NOT NULL DEFAULT TRUE,
  orden     INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS redes (
  id          SERIAL PRIMARY KEY,
  nombre      TEXT NOT NULL DEFAULT '',
  icono       TEXT NOT NULL DEFAULT 'globe',
  url         TEXT NOT NULL DEFAULT '',
  valor       TEXT NOT NULL DEFAULT '',
  en_contacto BOOLEAN NOT NULL DEFAULT FALSE,
  orden       INTEGER NOT NULL DEFAULT 0,
  visible     BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS habilidad_categorias (
  id     SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL DEFAULT '',
  icono  TEXT NOT NULL DEFAULT 'code',
  orden  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS habilidades (
  id           SERIAL PRIMARY KEY,
  categoria_id INTEGER NOT NULL REFERENCES habilidad_categorias(id) ON DELETE CASCADE,
  nombre       TEXT NOT NULL DEFAULT '',
  orden        INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS educacion (
  id              SERIAL PRIMARY KEY,
  titulo          TEXT NOT NULL DEFAULT '',
  institucion     TEXT NOT NULL DEFAULT '',
  institucion_url TEXT NOT NULL DEFAULT '',
  periodo         TEXT NOT NULL DEFAULT '',
  descripcion     TEXT NOT NULL DEFAULT '',
  logo_url        TEXT NOT NULL DEFAULT '',
  orden           INTEGER NOT NULL DEFAULT 0,
  visible         BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS experiencia (
  id           SERIAL PRIMARY KEY,
  puesto       TEXT NOT NULL DEFAULT '',
  empresa      TEXT NOT NULL DEFAULT '',
  empresa_url  TEXT NOT NULL DEFAULT '',
  periodo      TEXT NOT NULL DEFAULT '',
  actual       BOOLEAN NOT NULL DEFAULT FALSE,
  descripcion  TEXT NOT NULL DEFAULT '',
  logo_url     TEXT NOT NULL DEFAULT '',
  tecnologias  TEXT[] NOT NULL DEFAULT '{}',
  orden        INTEGER NOT NULL DEFAULT 0,
  visible      BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS proyectos (
  id          SERIAL PRIMARY KEY,
  titulo      TEXT NOT NULL DEFAULT '',
  resumen     TEXT NOT NULL DEFAULT '',
  descripcion TEXT NOT NULL DEFAULT '',
  imagen_url  TEXT NOT NULL DEFAULT '',
  video_url   TEXT NOT NULL DEFAULT '',
  tecnologias TEXT[] NOT NULL DEFAULT '{}',
  destacado   BOOLEAN NOT NULL DEFAULT FALSE,
  orden       INTEGER NOT NULL DEFAULT 0,
  visible     BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS mensajes (
  id        SERIAL PRIMARY KEY,
  nombre    TEXT NOT NULL DEFAULT '',
  email     TEXT NOT NULL DEFAULT '',
  asunto    TEXT NOT NULL DEFAULT '',
  mensaje   TEXT NOT NULL DEFAULT '',
  leido     BOOLEAN NOT NULL DEFAULT FALSE,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS usuarios (
  id            SERIAL PRIMARY KEY,
  usuario       TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

// Cambios sobre bases ya creadas. Se ejecutan en cada arranque y son idempotentes.
const MIGRACIONES = `
ALTER TABLE redes ADD COLUMN IF NOT EXISTS valor       TEXT    NOT NULL DEFAULT '';
ALTER TABLE redes ADD COLUMN IF NOT EXISTS en_contacto BOOLEAN NOT NULL DEFAULT FALSE;
`;

const SECCIONES_POR_DEFECTO = [
  ['habilidades', 'Mis Habilidades', 'Tecnologías y herramientas con las que trabajo', 1],
  ['educacion', 'Educación', 'Mi formación académica y certificaciones', 2],
  ['experiencia', 'Experiencia', 'Mi trayectoria y proyectos profesionales', 3],
  ['proyectos', 'Mis Proyectos', 'Una selección de proyectos que muestran lo que hago', 4],
  ['contacto', '¡Hablemos!', '¿Tienes un proyecto en mente? Me encantaría escucharte', 5],
];

let initPromise = null;

export function initDb() {
  if (!initPromise) initPromise = runInit();
  return initPromise;
}

async function runInit() {
  const client = await pool.connect();
  try {
    await client.query(SCHEMA);
    await client.query(MIGRACIONES);

    await client.query(
      `INSERT INTO ajustes (id, nombre, titular, descripcion, cta_texto,
         contacto_nombre, contacto_email, contacto_ubicacion, contacto_intro,
         pie_texto, meta_titulo, meta_descripcion)
       VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (id) DO NOTHING`,
      [
        process.env.SITE_NOMBRE || 'belucm',
        'Administrador de Sistemas y Redes',
        'Me dedico a montar, automatizar y mantener infraestructura: servidores, redes y todo lo que hay entre medias. Aquí recojo lo que voy construyendo.',
        'Ver mis proyectos',
        '',
        process.env.SITE_EMAIL || '',
        'España',
        'Estoy abierto a nuevas oportunidades y colaboraciones. No dudes en escribirme.',
        'Todos los derechos reservados.',
        '',
        '',
      ]
    );

    for (const [clave, titulo, subtitulo, orden] of SECCIONES_POR_DEFECTO) {
      await client.query(
        `INSERT INTO secciones (clave, titulo, subtitulo, orden) VALUES ($1, $2, $3, $4)
         ON CONFLICT (clave) DO NOTHING`,
        [clave, titulo, subtitulo, orden]
      );
    }

    const { rows: users } = await client.query('SELECT COUNT(*)::int AS n FROM usuarios');
    if (users[0].n === 0) {
      const usuario = process.env.ADMIN_USER || 'admin';
      const pass = process.env.ADMIN_PASSWORD;
      if (pass) {
        await client.query(
          'INSERT INTO usuarios (usuario, password_hash) VALUES ($1, $2) ON CONFLICT (usuario) DO NOTHING',
          [usuario, hashPassword(pass)]
        );
      }
    }
  } finally {
    client.release();
  }
}
