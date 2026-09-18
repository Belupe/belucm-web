import Icono from './Icono';

export default function Educacion({ seccion, educacion }) {
  if (!educacion.length) return null;

  return (
    <section className="seccion" id="educacion">
      <div className="contenedor">
        <div className="seccion-cabecera">
          <h2>{seccion?.titulo || 'Educación'}</h2>
          {seccion?.subtitulo ? <p>{seccion.subtitulo}</p> : null}
        </div>

        <div className="lista-vertical">
          {educacion.map((e) => (
            <article key={e.id} className="tarjeta entrada">
              {e.logo_url ? (
                <img className="entrada-logo" src={e.logo_url} alt="" />
              ) : (
                <span className="entrada-logo">
                  <Icono nombre="estrella" size={20} />
                </span>
              )}

              <div className="entrada-cuerpo">
                <div className="entrada-fila">
                  <h3>{e.titulo}</h3>
                  {e.periodo ? (
                    <span className="entrada-meta">
                      <Icono nombre="calendario" size={15} />
                      {e.periodo}
                    </span>
                  ) : null}
                </div>

                {e.institucion ? (
                  e.institucion_url ? (
                    <a
                      className="entrada-institucion"
                      href={e.institucion_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {e.institucion}
                    </a>
                  ) : (
                    <span className="entrada-institucion">{e.institucion}</span>
                  )
                ) : null}

                {e.descripcion ? <p className="entrada-descripcion">{e.descripcion}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
