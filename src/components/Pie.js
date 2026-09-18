export default function Pie({ ajustes }) {
  const anio = new Date().getFullYear();
  return (
    <footer className="pie">
      <div className="contenedor pie-interior">
        <span>
          © {anio} {ajustes.nombre}. {ajustes.pie_texto}
        </span>
        <div className="pie-enlaces">
          <a href="#inicio">↑ Volver arriba</a>
          <a href="/admin">Admin</a>
        </div>
      </div>
    </footer>
  );
}
