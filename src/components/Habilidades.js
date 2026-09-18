import Icono from './Icono';

export default function Habilidades({ seccion, categorias }) {
  if (!categorias.length) return null;

  return (
    <section className="seccion" id="habilidades">
      <div className="contenedor">
        <div className="seccion-cabecera">
          <h2>{seccion?.titulo || 'Mis Habilidades'}</h2>
          {seccion?.subtitulo ? <p>{seccion.subtitulo}</p> : null}
        </div>

        <div className="habilidades-grid">
          {categorias.map((c) => (
            <article key={c.id} className="tarjeta habilidad-tarjeta">
              <div className="habilidad-cabecera">
                <span className="icono-chip">
                  <Icono nombre={c.icono} size={20} />
                </span>
                <h3>{c.nombre}</h3>
              </div>
              <div className="pastillas">
                {c.items.map((h) => (
                  <span key={h.id} className="pastilla">
                    {h.nombre}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
