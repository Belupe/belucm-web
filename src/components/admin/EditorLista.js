'use client';

import { useEffect, useState } from 'react';
import Campo from './Campo';

export default function EditorLista({
  entidad,
  titulo,
  descripcion,
  campos,
  etiqueta = (f) => f.titulo || f.nombre || 'Sin título',
  nuevoPorDefecto = {},
  permiteAlta = true,
  permiteBaja = true,
  alCambiarDatos,
}) {
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      setCargando(true);
      try {
        const res = await fetch(`/api/admin/${entidad}`);
        const json = await res.json();
        if (!cancelado) setFilas(Array.isArray(json) ? json : []);
      } finally {
        if (!cancelado) setCargando(false);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [entidad]);

  function actualizarLocal(indice, campo, valor) {
    setFilas((prev) => prev.map((f, i) => (i === indice ? { ...f, [campo]: valor } : f)));
  }

  function mostrar(tipo, texto) {
    setAviso({ tipo, texto });
    setTimeout(() => setAviso(null), 2600);
  }

  async function guardar(fila) {
    const clave = fila.clave !== undefined ? fila.clave : fila.id;
    const res = await fetch(`/api/admin/${entidad}/${encodeURIComponent(clave)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fila),
    });
    if (res.ok) {
      mostrar('ok', 'Guardado');
      alCambiarDatos?.();
    } else {
      const json = await res.json().catch(() => ({}));
      mostrar('error', json.error || 'No se pudo guardar');
    }
  }

  async function crear() {
    const res = await fetch(`/api/admin/${entidad}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...nuevoPorDefecto, orden: filas.length + 1 }),
    });
    if (res.ok) {
      const creada = await res.json();
      setFilas((prev) => [...prev, creada]);
      alCambiarDatos?.();
    } else {
      mostrar('error', 'No se pudo crear');
    }
  }

  async function borrar(fila) {
    const clave = fila.clave !== undefined ? fila.clave : fila.id;
    if (!confirm(`¿Eliminar "${etiqueta(fila)}"? Esta acción no se puede deshacer.`)) return;
    const res = await fetch(`/api/admin/${entidad}/${encodeURIComponent(clave)}`, { method: 'DELETE' });
    if (res.ok) {
      setFilas((prev) => prev.filter((f) => (f.clave !== undefined ? f.clave : f.id) !== clave));
      alCambiarDatos?.();
    } else {
      mostrar('error', 'No se pudo eliminar');
    }
  }

  return (
    <div>
      <div className="admin-titulo">
        <h2>{titulo}</h2>
        {permiteAlta ? (
          <button className="admin-boton principal" onClick={crear}>
            + Añadir
          </button>
        ) : null}
      </div>
      {descripcion ? <p className="admin-descripcion">{descripcion}</p> : null}
      {aviso ? <div className={`aviso ${aviso.tipo}`} style={{ marginBottom: 14 }}>{aviso.texto}</div> : null}

      {cargando ? (
        <div className="admin-vacio">Cargando…</div>
      ) : filas.length === 0 ? (
        <div className="admin-vacio">Todavía no hay nada aquí. Pulsa «Añadir» para empezar.</div>
      ) : (
        filas.map((fila, indice) => (
          <div className="admin-ficha" key={fila.clave !== undefined ? fila.clave : fila.id}>
            <div className="admin-ficha-cabecera">
              <strong>{etiqueta(fila)}</strong>
            </div>

            <div className="admin-rejilla">
              {campos.map((c) => (
                <Campo
                  key={c.nombre}
                  def={{ ...c, id: fila.clave !== undefined ? fila.clave : fila.id }}
                  valor={fila[c.nombre]}
                  alCambiar={(campo, valor) => actualizarLocal(indice, campo, valor)}
                />
              ))}
            </div>

            <div className="admin-acciones">
              <button className="admin-boton principal" onClick={() => guardar(fila)}>
                Guardar
              </button>
              {permiteBaja ? (
                <button className="admin-boton peligro" onClick={() => borrar(fila)}>
                  Eliminar
                </button>
              ) : null}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
