'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EditorFicha from './EditorFicha';
import EditorLista from './EditorLista';
import Mensajes from './Mensajes';
import Cuenta from './Cuenta';
import { ICONOS_DISPONIBLES } from '../Icono';

const OPCIONES_ICONO = ICONOS_DISPONIBLES.map((i) => ({ valor: i, texto: i }));

const CAMPOS_PERFIL = [
  { nombre: 'nombre', etiqueta: 'Nombre visible (título grande)', tipo: 'texto' },
  { nombre: 'titular', etiqueta: 'Titular (a qué te dedicas)', tipo: 'texto' },
  { nombre: 'avatar_url', etiqueta: 'Foto / avatar', tipo: 'imagen' },
  { nombre: 'cta_texto', etiqueta: 'Texto del botón principal', tipo: 'texto' },
  { nombre: 'descripcion', etiqueta: 'Presentación', tipo: 'area', filas: 3 },
  { nombre: 'color_acento', etiqueta: 'Color de acento', tipo: 'color' },
  { nombre: 'contacto_nombre', etiqueta: 'Contacto · nombre', tipo: 'texto' },
  { nombre: 'contacto_email', etiqueta: 'Contacto · email', tipo: 'texto' },
  { nombre: 'contacto_ubicacion', etiqueta: 'Contacto · ubicación', tipo: 'texto' },
  { nombre: 'contacto_intro', etiqueta: 'Contacto · texto de introducción', tipo: 'area', filas: 2 },
  { nombre: 'pie_texto', etiqueta: 'Texto del pie de página', tipo: 'texto' },
  { nombre: 'meta_titulo', etiqueta: 'SEO · título de la pestaña', tipo: 'texto', ayuda: 'Si lo dejas vacío se genera solo' },
  { nombre: 'meta_descripcion', etiqueta: 'SEO · descripción', tipo: 'area', filas: 2 },
];

const CAMPOS_SECCION = [
  { nombre: 'titulo', etiqueta: 'Título', tipo: 'texto' },
  { nombre: 'subtitulo', etiqueta: 'Subtítulo', tipo: 'texto', ancho: 'total' },
  { nombre: 'orden', etiqueta: 'Orden', tipo: 'numero' },
  { nombre: 'visible', etiqueta: 'Visible en la web', tipo: 'bool' },
];

const CAMPOS_RED = [
  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'texto', ayuda: 'Email, GitHub, Twitch…' },
  { nombre: 'icono', etiqueta: 'Icono', tipo: 'select', opciones: OPCIONES_ICONO },
  { nombre: 'url', etiqueta: 'Enlace', tipo: 'texto', placeholder: 'https://… o mailto:…' },
  {
    nombre: 'valor',
    etiqueta: 'Texto que se muestra en Contacto',
    tipo: 'texto',
    placeholder: 'tu@correo.com, @tuusuario…',
    ayuda: 'Si lo dejas vacío se usa el propio enlace',
  },
  { nombre: 'orden', etiqueta: 'Orden', tipo: 'numero' },
  { nombre: 'en_contacto', etiqueta: 'Mostrar como dato en Contacto', tipo: 'bool' },
  { nombre: 'visible', etiqueta: 'Visible', tipo: 'bool' },
];

const CAMPOS_EDUCACION = [
  { nombre: 'titulo', etiqueta: 'Título / estudios', tipo: 'texto' },
  { nombre: 'institucion', etiqueta: 'Centro', tipo: 'texto' },
  { nombre: 'institucion_url', etiqueta: 'Enlace del centro', tipo: 'texto' },
  { nombre: 'periodo', etiqueta: 'Periodo', tipo: 'texto', placeholder: '2024 - Presente' },
  { nombre: 'logo_url', etiqueta: 'Logo', tipo: 'imagen' },
  { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'area', filas: 2 },
  { nombre: 'orden', etiqueta: 'Orden', tipo: 'numero' },
  { nombre: 'visible', etiqueta: 'Visible', tipo: 'bool' },
];

const CAMPOS_EXPERIENCIA = [
  { nombre: 'puesto', etiqueta: 'Puesto', tipo: 'texto' },
  { nombre: 'empresa', etiqueta: 'Empresa / proyecto', tipo: 'texto' },
  { nombre: 'empresa_url', etiqueta: 'Enlace', tipo: 'texto' },
  { nombre: 'periodo', etiqueta: 'Periodo', tipo: 'texto', placeholder: '2025 - Presente' },
  { nombre: 'logo_url', etiqueta: 'Logo', tipo: 'imagen' },
  { nombre: 'tecnologias', etiqueta: 'Tecnologías', tipo: 'lista', placeholder: 'Proxmox, Docker, UniFi' },
  { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'area', filas: 2 },
  { nombre: 'orden', etiqueta: 'Orden', tipo: 'numero' },
  { nombre: 'actual', etiqueta: 'En curso (etiqueta «Actual»)', tipo: 'bool' },
  { nombre: 'visible', etiqueta: 'Visible', tipo: 'bool' },
];

const CAMPOS_PROYECTO = [
  { nombre: 'titulo', etiqueta: 'Título', tipo: 'texto' },
  { nombre: 'imagen_url', etiqueta: 'Imagen / portada', tipo: 'imagen' },
  {
    nombre: 'video_url',
    etiqueta: 'Enlace del botón «Ver»',
    tipo: 'texto',
    placeholder: 'https://www.youtube.com/watch?v=…',
    ayuda: 'El vídeo de YouTube que se abre al pulsar «Ver»',
  },
  { nombre: 'resumen', etiqueta: 'Resumen (en la tarjeta)', tipo: 'area', filas: 2 },
  { nombre: 'descripcion', etiqueta: 'Descripción (en la ventana emergente)', tipo: 'area', filas: 4 },
  { nombre: 'tecnologias', etiqueta: 'Tecnologías', tipo: 'lista', placeholder: 'Next.js, PostgreSQL' },
  { nombre: 'orden', etiqueta: 'Orden', tipo: 'numero' },
  { nombre: 'destacado', etiqueta: 'Destacado (título en azul)', tipo: 'bool' },
  { nombre: 'visible', etiqueta: 'Visible', tipo: 'bool' },
];

export default function Panel({ usuario }) {
  const router = useRouter();
  const [pestana, setPestana] = useState('perfil');
  const [categorias, setCategorias] = useState([]);
  const [sinLeer, setSinLeer] = useState(0);

  const refrescar = useCallback(async () => {
    const [cats, msgs] = await Promise.all([
      fetch('/api/admin/categorias').then((r) => r.json()).catch(() => []),
      fetch('/api/admin/mensajes').then((r) => r.json()).catch(() => []),
    ]);
    setCategorias(Array.isArray(cats) ? cats : []);
    setSinLeer(Array.isArray(msgs) ? msgs.filter((m) => !m.leido).length : 0);
  }, []);

  useEffect(() => {
    refrescar();
  }, [refrescar]);

  async function salir() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  const pestanas = [
    { clave: 'perfil', texto: 'Perfil e inicio' },
    { clave: 'secciones', texto: 'Secciones' },
    { clave: 'redes', texto: 'Redes y contacto' },
    { clave: 'habilidades', texto: 'Habilidades' },
    { clave: 'educacion', texto: 'Educación' },
    { clave: 'experiencia', texto: 'Experiencia' },
    { clave: 'proyectos', texto: 'Proyectos' },
    { clave: 'mensajes', texto: 'Mensajes', contador: sinLeer || null },
    { clave: 'cuenta', texto: 'Cuenta' },
  ];

  return (
    <div className="admin-envoltorio">
      <header className="admin-cabecera">
        <div className="admin-cabecera-interior">
          <h1>Panel de administración</h1>
          <div className="admin-cabecera-acciones">
            <a className="admin-boton" href="/" target="_blank" rel="noopener noreferrer">
              Ver la web
            </a>
            <button className="admin-boton" onClick={salir}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="admin-cuerpo">
        <nav className="admin-nav">
          {pestanas.map((p) => (
            <button
              key={p.clave}
              className={pestana === p.clave ? 'activo' : ''}
              onClick={() => setPestana(p.clave)}
            >
              {p.texto}
              {p.contador ? <span className="admin-contador">{p.contador}</span> : null}
            </button>
          ))}
        </nav>

        <main className="admin-panel">
          {pestana === 'perfil' ? (
            <EditorFicha
              entidad="ajustes"
              titulo="Perfil e inicio"
              descripcion="Lo que aparece en la portada, en el bloque de contacto y en los metadatos."
              campos={CAMPOS_PERFIL}
            />
          ) : null}

          {pestana === 'secciones' ? (
            <EditorLista
              entidad="secciones"
              titulo="Secciones"
              descripcion="Títulos, orden y visibilidad de cada bloque de la página."
              campos={CAMPOS_SECCION}
              etiqueta={(f) => f.clave}
              permiteAlta={false}
              permiteBaja={false}
            />
          ) : null}

          {pestana === 'redes' ? (
            <EditorLista
              entidad="redes"
              titulo="Redes sociales y contacto"
              descripcion="Los botones de la portada y del bloque de contacto. Marca «Mostrar como dato en Contacto» para que además aparezca con su icono y su texto en la columna de «¡Conectemos!» (correo, GitHub, etc.)."
              campos={CAMPOS_RED}
              etiqueta={(f) => f.nombre || 'Nueva red'}
              nuevoPorDefecto={{
                nombre: 'Nueva red',
                icono: 'globe',
                url: '',
                valor: '',
                en_contacto: false,
                visible: true,
              }}
            />
          ) : null}

          {pestana === 'habilidades' ? (
            <>
              <EditorLista
                entidad="categorias"
                titulo="Categorías de habilidades"
                descripcion="Cada categoría es una tarjeta (Lenguajes, Redes, Sistemas…)."
                campos={[
                  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'texto' },
                  { nombre: 'icono', etiqueta: 'Icono', tipo: 'select', opciones: OPCIONES_ICONO },
                  { nombre: 'orden', etiqueta: 'Orden', tipo: 'numero' },
                ]}
                etiqueta={(f) => f.nombre || 'Nueva categoría'}
                nuevoPorDefecto={{ nombre: 'Nueva categoría', icono: 'code' }}
                alCambiarDatos={refrescar}
              />
              <div style={{ height: 34 }} />
              <EditorLista
                entidad="habilidades"
                titulo="Habilidades"
                descripcion="Cada etiqueta dentro de una categoría."
                campos={[
                  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'texto' },
                  {
                    nombre: 'categoria_id',
                    etiqueta: 'Categoría',
                    tipo: 'select',
                    opciones: categorias.map((c) => ({ valor: String(c.id), texto: c.nombre })),
                  },
                  { nombre: 'orden', etiqueta: 'Orden', tipo: 'numero' },
                ]}
                etiqueta={(f) => f.nombre || 'Nueva habilidad'}
                nuevoPorDefecto={{
                  nombre: 'Nueva habilidad',
                  categoria_id: categorias[0]?.id || 1,
                }}
              />
            </>
          ) : null}

          {pestana === 'educacion' ? (
            <EditorLista
              entidad="educacion"
              titulo="Educación"
              descripcion="Tu formación académica y certificaciones."
              campos={CAMPOS_EDUCACION}
              etiqueta={(f) => f.titulo || 'Nueva entrada'}
              nuevoPorDefecto={{ titulo: 'Nuevos estudios', visible: true }}
            />
          ) : null}

          {pestana === 'experiencia' ? (
            <EditorLista
              entidad="experiencia"
              titulo="Experiencia"
              descripcion="Trabajos, prácticas y proyectos con recorrido."
              campos={CAMPOS_EXPERIENCIA}
              etiqueta={(f) => f.puesto || 'Nueva entrada'}
              nuevoPorDefecto={{ puesto: 'Nuevo puesto', visible: true }}
            />
          ) : null}

          {pestana === 'proyectos' ? (
            <EditorLista
              entidad="proyectos"
              titulo="Proyectos"
              descripcion="Las tarjetas de la cuadrícula. Al pulsar una se abre su ventana con el resumen; el botón «Ver» abre el enlace del vídeo."
              campos={CAMPOS_PROYECTO}
              etiqueta={(f) => f.titulo || 'Nuevo proyecto'}
              nuevoPorDefecto={{ titulo: 'Nuevo proyecto', visible: true }}
            />
          ) : null}

          {pestana === 'mensajes' ? <Mensajes alCambiarDatos={refrescar} /> : null}

          {pestana === 'cuenta' ? <Cuenta usuario={usuario} /> : null}
        </main>
      </div>
    </div>
  );
}
