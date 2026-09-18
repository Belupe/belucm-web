import Icono from './Icono';

export default function Hero({ ajustes, redes }) {
  const inicial = (ajustes.nombre || '?').trim().charAt(0).toUpperCase();

  return (
    <header className="hero" id="inicio">
      <div className="hero-avatar-envoltorio">
        {ajustes.avatar_url ? (
          <img className="hero-avatar" src={ajustes.avatar_url} alt={ajustes.nombre || 'Avatar'} />
        ) : (
          <div className="hero-avatar hero-avatar-placeholder">{inicial}</div>
        )}
      </div>

      <h1>{ajustes.nombre}</h1>
      {ajustes.titular ? <p className="hero-titular">{ajustes.titular}</p> : null}
      {ajustes.descripcion ? <p className="hero-descripcion">{ajustes.descripcion}</p> : null}

      {ajustes.cta_texto ? (
        <a className="boton-principal" href="#proyectos">
          {ajustes.cta_texto}
          <Icono nombre="flecha" size={17} />
        </a>
      ) : null}

      {redes.length > 0 ? (
        <nav className="redes" aria-label="Redes sociales">
          {redes.map((r) => (
            <a
              key={r.id}
              className="red-boton"
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              title={r.nombre}
              aria-label={r.nombre}
            >
              <Icono nombre={r.icono} size={18} />
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
