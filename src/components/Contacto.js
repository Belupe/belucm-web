import Icono from './Icono';
import FormularioContacto from './FormularioContacto';

/** Texto que se muestra para una red: el valor manual o, si no hay, el enlace limpio. */
function textoDeRed(red) {
  if (red.valor) return red.valor;
  return String(red.url || '')
    .replace(/^mailto:/, '')
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
}

export default function Contacto({ seccion, ajustes, redes }) {
  const datosDeRedes = redes.filter((r) => r.en_contacto);

  return (
    <section className="seccion" id="contacto">
      <div className="contenedor">
        <div className="seccion-cabecera">
          <h2>{seccion?.titulo || '¡Hablemos!'}</h2>
          {seccion?.subtitulo ? <p>{seccion.subtitulo}</p> : null}
        </div>

        <div className="contacto-grid">
          <div className="contacto-info">
            <h3>¡Conectemos!</h3>
            {ajustes.contacto_intro ? <p>{ajustes.contacto_intro}</p> : null}

            {ajustes.contacto_nombre ? (
              <div className="contacto-dato">
                <span className="icono-chip">
                  <Icono nombre="usuario" size={24} />
                </span>
                <div>
                  <span>Nombre</span>
                  <strong>{ajustes.contacto_nombre}</strong>
                </div>
              </div>
            ) : null}

            {datosDeRedes.map((r) => (
              <div className="contacto-dato" key={r.id}>
                <span className="icono-chip">
                  <Icono nombre={r.icono} size={24} />
                </span>
                <div>
                  <span>{r.nombre}</span>
                  <strong>
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer">
                        {textoDeRed(r)}
                      </a>
                    ) : (
                      textoDeRed(r)
                    )}
                  </strong>
                </div>
              </div>
            ))}

            {ajustes.contacto_ubicacion ? (
              <div className="contacto-dato">
                <span className="icono-chip">
                  <Icono nombre="ubicacion" size={24} />
                </span>
                <div>
                  <span>Ubicación</span>
                  <strong>{ajustes.contacto_ubicacion}</strong>
                </div>
              </div>
            ) : null}

            {redes.length > 0 ? (
              <div className="contacto-redes">
                <p>También puedes encontrarme en:</p>
                <div className="contacto-redes-lista">
                  {redes.map((r) => (
                    <a
                      key={r.id}
                      className="red-etiqueta"
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icono nombre={r.icono} size={17} />
                      {r.nombre}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <FormularioContacto />
        </div>
      </div>
    </section>
  );
}
