// Estrellas deterministas: misma posición en servidor y cliente (sin Math.random).
function estrellas(cantidad) {
  const salida = [];
  let semilla = 20260918;
  const siguiente = () => {
    semilla = (semilla * 1103515245 + 12345) % 2147483648;
    return semilla / 2147483648;
  };
  for (let i = 0; i < cantidad; i++) {
    const tam = 1 + Math.round(siguiente() * 1.6 * 10) / 10;
    salida.push({
      left: `${(siguiente() * 100).toFixed(2)}%`,
      top: `${(siguiente() * 100).toFixed(2)}%`,
      width: `${tam}px`,
      height: `${tam}px`,
      opacity: (0.18 + siguiente() * 0.55).toFixed(2),
      animationDelay: `${(siguiente() * 5).toFixed(2)}s`,
      animationDuration: `${(3 + siguiente() * 4).toFixed(2)}s`,
    });
  }
  return salida;
}

const ESTRELLAS = estrellas(90);

export default function Fondo() {
  return (
    <div className="fondo" aria-hidden="true">
      <span className="orbe orbe-1" />
      <span className="orbe orbe-2" />
      <span className="orbe orbe-3" />
      {ESTRELLAS.map((e, i) => (
        <span key={i} className="estrella" style={e} />
      ))}
    </div>
  );
}
