'use client';

import { useEffect, useState } from 'react';
import Icono from './Icono';

export default function Proyectos({ seccion, proyectos }) {
  const [abierto, setAbierto] = useState(null);

  useEffect(() => {
    if (!abierto) return undefined;
    const alPulsar = (e) => {
      if (e.key === 'Escape') setAbierto(null);
    };
    document.addEventListener('keydown', alPulsar);
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', alPulsar);
      document.body.style.overflow = previo;
    };
  }, [abierto]);

  if (!proyectos.length) return null;

  return (
    <section className="seccion" id="proyectos">
      <div className="contenedor">
        <div className="seccion-cabecera">
          <h2>{seccion?.titulo || 'Mis Proyectos'}</h2>
          {seccion?.subtitulo ? <p>{seccion.subtitulo}</p> : null}
        </div>

        <div className="proyectos-grid">
          {proyectos.map((p) => (
            <article
              key={p.id}
              role="button"
              tabIndex={0}
              className={`tarjeta proyecto${p.destacado ? ' destacado' : ''}`}
              onClick={() => setAbierto(p)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setAbierto(p);
                }
              }}
              aria-label={`Ver detalles de ${p.titulo}`}
            >
              {p.imagen_url ? (
                <img className="proyecto-imagen" src={p.imagen_url} alt="" />
              ) : (
                <div className="proyecto-imagen proyecto-imagen-vacia">
                  <Icono nombre="code" size={34} />
                </div>
              )}

              <h3>{p.titulo}</h3>
              {p.resumen ? <p className="proyecto-resumen">{p.resumen}</p> : null}

              {p.tecnologias?.length ? (
                <div className="pastillas">
                  {p.tecnologias.map((t, i) => (
                    <span key={i} className="pastilla">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              {p.video_url ? (
                <a
                  className="boton-ver"
                  href={p.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icono nombre="externo" size={14} />
                  Ver
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      {abierto ? <ModalProyecto proyecto={abierto} cerrar={() => setAbierto(null)} /> : null}
    </section>
  );
}

function ModalProyecto({ proyecto, cerrar }) {
  return (
    <div
      className="modal-fondo"
      role="dialog"
      aria-modal="true"
      aria-label={proyecto.titulo}
      onClick={cerrar}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={cerrar} aria-label="Cerrar">
          <Icono nombre="cerrar" size={17} />
        </button>

        <div className="modal-cabecera">
          {proyecto.imagen_url ? <img src={proyecto.imagen_url} alt="" /> : null}
          <h3>{proyecto.titulo}</h3>
        </div>

        <div className="modal-bloque">
          <h4>Descripción</h4>
          <p>{proyecto.descripcion || proyecto.resumen || 'Sin descripción.'}</p>
        </div>

        {proyecto.tecnologias?.length ? (
          <div className="modal-bloque">
            <h4>Tecnologías</h4>
            <div className="pastillas">
              {proyecto.tecnologias.map((t, i) => (
                <span key={i} className="pastilla">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {proyecto.video_url ? (
          <a className="boton-ver" href={proyecto.video_url} target="_blank" rel="noopener noreferrer">
            <Icono nombre="externo" size={15} />
            Ver Proyecto
          </a>
        ) : null}
      </div>
    </div>
  );
}
