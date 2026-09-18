'use client';

import { useState } from 'react';

export default function Cuenta({ usuario }) {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [repetir, setRepetir] = useState('');
  const [aviso, setAviso] = useState(null);

  async function guardar(e) {
    e.preventDefault();
    if (nueva !== repetir) {
      setAviso({ tipo: 'error', texto: 'Las contraseñas nuevas no coinciden' });
      return;
    }
    const res = await fetch('/api/admin/cuenta', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actual, nueva }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      setAviso({ tipo: 'ok', texto: 'Contraseña actualizada' });
      setActual('');
      setNueva('');
      setRepetir('');
    } else {
      setAviso({ tipo: 'error', texto: json.error || 'No se pudo cambiar' });
    }
  }

  return (
    <div>
      <div className="admin-titulo">
        <h2>Cuenta</h2>
      </div>
      <p className="admin-descripcion">
        Sesión iniciada como <strong>{usuario || '—'}</strong>.
      </p>

      <form className="admin-ficha" onSubmit={guardar}>
        <div className="admin-rejilla">
          <div className="campo">
            <label htmlFor="actual">Contraseña actual</label>
            <input id="actual" type="password" value={actual} onChange={(e) => setActual(e.target.value)} required />
          </div>
          <div className="campo">
            <label htmlFor="nueva">Nueva contraseña</label>
            <input id="nueva" type="password" value={nueva} onChange={(e) => setNueva(e.target.value)} required minLength={8} />
          </div>
          <div className="campo">
            <label htmlFor="repetir">Repetir nueva</label>
            <input id="repetir" type="password" value={repetir} onChange={(e) => setRepetir(e.target.value)} required minLength={8} />
          </div>
        </div>

        {aviso ? <div className={`aviso ${aviso.tipo}`} style={{ marginTop: 14 }}>{aviso.texto}</div> : null}

        <div className="admin-acciones">
          <button className="admin-boton principal" type="submit">
            Cambiar contraseña
          </button>
        </div>
      </form>
    </div>
  );
}
