'use client';

import { useEffect, useState } from 'react';

export default function Mensajes({ alCambiarDatos }) {
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);

  async function cargar() {
    setCargando(true);
    const res = await fetch('/api/admin/mensajes');
    const json = await res.json();
    setFilas(Array.isArray(json) ? json : []);
    setCargando(false);
  }

  useEffect(() => {
    cargar();
  }, []);

  async function marcar(fila, leido) {
    await fetch(`/api/admin/mensajes/${fila.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leido }),
    });
    setFilas((prev) => prev.map((f) => (f.id === fila.id ? { ...f, leido } : f)));
    alCambiarDatos?.();
  }

  async function borrar(fila) {
    if (!confirm('¿Eliminar este mensaje?')) return;
    await fetch(`/api/admin/mensajes/${fila.id}`, { method: 'DELETE' });
    setFilas((prev) => prev.filter((f) => f.id !== fila.id));
    alCambiarDatos?.();
  }

  return (
    <div>
      <div className="admin-titulo">
        <h2>Mensajes recibidos</h2>
        <button className="admin-boton" onClick={cargar}>
          Actualizar
        </button>
      </div>
      <p className="admin-descripcion">Lo que te escribe la gente desde el formulario de contacto.</p>

      {cargando ? (
        <div className="admin-vacio">Cargando…</div>
      ) : filas.length === 0 ? (
        <div className="admin-vacio">Todavía no has recibido ningún mensaje.</div>
      ) : (
        filas.map((m) => (
          <div className={`admin-ficha admin-mensaje${m.leido ? '' : ' no-leido'}`} key={m.id}>
            <div className="admin-ficha-cabecera">
              <strong>{m.asunto || '(sin asunto)'}</strong>
              <span className="admin-contador">
                {new Date(m.creado_en).toLocaleString('es-ES')}
              </span>
            </div>
            <p className="admin-mensaje-meta">
              {m.nombre} · <a href={`mailto:${m.email}`}>{m.email}</a>
            </p>
            <p className="admin-mensaje-texto">{m.mensaje}</p>
            <div className="admin-acciones">
              <button className="admin-boton" onClick={() => marcar(m, !m.leido)}>
                {m.leido ? 'Marcar como no leído' : 'Marcar como leído'}
              </button>
              <a className="admin-boton" href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.asunto || '')}`}>
                Responder
              </a>
              <button className="admin-boton peligro" onClick={() => borrar(m)}>
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
