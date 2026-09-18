'use client';

import { useEffect, useState } from 'react';
import Campo from './Campo';

export default function EditorFicha({ entidad, titulo, descripcion, campos }) {
  const [datos, setDatos] = useState(null);
  const [aviso, setAviso] = useState(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/${entidad}`);
      const json = await res.json();
      setDatos(json || {});
    })();
  }, [entidad]);

  async function guardar() {
    setGuardando(true);
    try {
      const res = await fetch(`/api/admin/${entidad}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      if (!res.ok) throw new Error('No se pudo guardar');
      setAviso({ tipo: 'ok', texto: 'Cambios guardados' });
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
    } finally {
      setGuardando(false);
      setTimeout(() => setAviso(null), 2600);
    }
  }

  if (!datos) return <div className="admin-vacio">Cargando…</div>;

  return (
    <div>
      <div className="admin-titulo">
        <h2>{titulo}</h2>
        <button className="admin-boton principal" onClick={guardar} disabled={guardando}>
          {guardando ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </div>
      {descripcion ? <p className="admin-descripcion">{descripcion}</p> : null}
      {aviso ? <div className={`aviso ${aviso.tipo}`} style={{ marginBottom: 14 }}>{aviso.texto}</div> : null}

      <div className="admin-ficha">
        <div className="admin-rejilla">
          {campos.map((c) => (
            <Campo
              key={c.nombre}
              def={c}
              valor={datos[c.nombre]}
              alCambiar={(campo, valor) => setDatos((prev) => ({ ...prev, [campo]: valor }))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
