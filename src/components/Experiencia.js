import Icono from './Icono';

export default function Experiencia({ seccion, experiencia }) {
  if (!experiencia.length) return null;

  return (
    <section className="seccion" id="experiencia">
      <div className="contenedor">
        <div className="seccion-cabecera">
          <h2>{seccion?.titulo || 'Experiencia'}</h2>
          {seccion?.subtitulo ? <p>{seccion.subtitulo}</p> : null}
        </div>

        <div className="lista-vertical">
          {experiencia.map((x) => (
            <article key={x.id} className="tarjeta entrada">
              {x.logo_url ? (
                <img className="entrada-logo" src={x.logo_url} alt="" />
              ) : (
                <span className="entrada-logo">
                  <Icono nombre="herramientas" size={20} />
                </span>
              )}

              <div className="entrada-cuerpo">
                <div className="entrada-fila">
                  <h3>{x.puesto}</h3>
                  <span className="entrada-meta">
                    {x.periodo ? (
                      <>
                        <Icono nombre="calendario" size={15} />
                        {x.periodo}
                      </>
                    ) : null}
                    {x.actual ? <span className="badge-actual">Actual</span> : null}
                  </span>
                </div>

                {x.empresa ? (
                  x.empresa_url ? (
                    <a
                      className="entrada-institucion"
                      href={x.empresa_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {x.empresa}
                    </a>
                  ) : (
                    <span className="entrada-institucion">{x.empresa}</span>
                  )
                ) : null}

                {x.descripcion ? <p className="entrada-descripcion">{x.descripcion}</p> : null}

                {x.tecnologias?.length ? (
                  <div className="entrada-tecnologias">
                    <strong>Tecnologías utilizadas:</strong>
                    <div className="pastillas">
                      {x.tecnologias.map((t, i) => (
                        <span key={i} className="pastilla">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
