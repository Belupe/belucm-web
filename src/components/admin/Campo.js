'use client';

import { useState } from 'react';

export default function Campo({ def, valor, alCambiar }) {
  const [subiendo, setSubiendo] = useState(false);
  const [errorSubida, setErrorSubida] = useState('');
  const nombre = def.nombre;
  const clase = def.ancho === 'total' || def.tipo === 'area' ? 'campo ancho-total' : 'campo';

  async function subir(e) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    setSubiendo(true);
    setErrorSubida('');
    try {
      const form = new FormData();
      form.append('archivo', archivo);
      const res = await fetch('/api/admin/subir', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'No se pudo subir');
      alCambiar(nombre, json.url);
    } catch (err) {
      setErrorSubida(err.message);
    } finally {
      setSubiendo(false);
      e.target.value = '';
    }
  }

  if (def.tipo === 'bool') {
    return (
      <label className="admin-check">
        <input
          type="checkbox"
          checked={Boolean(valor)}
          onChange={(e) => alCambiar(nombre, e.target.checked)}
        />
        {def.etiqueta}
      </label>
    );
  }

  return (
    <div className={clase}>
      <label htmlFor={`${nombre}-${def.id || ''}`}>{def.etiqueta}</label>

      {def.tipo === 'area' ? (
        <textarea
          id={`${nombre}-${def.id || ''}`}
          value={valor ?? ''}
          rows={def.filas || 3}
          onChange={(e) => alCambiar(nombre, e.target.value)}
          placeholder={def.placeholder || ''}
        />
      ) : def.tipo === 'select' ? (
        <select
          id={`${nombre}-${def.id || ''}`}
          value={valor ?? ''}
          onChange={(e) => alCambiar(nombre, e.target.value)}
        >
          {(def.opciones || []).map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.texto}
            </option>
          ))}
        </select>
      ) : def.tipo === 'lista' ? (
        <input
          id={`${nombre}-${def.id || ''}`}
          value={Array.isArray(valor) ? valor.join(', ') : valor ?? ''}
          onChange={(e) => alCambiar(nombre, e.target.value.split(',').map((v) => v.trimStart()))}
          placeholder={def.placeholder || 'Separadas por comas'}
        />
      ) : (
        <input
          id={`${nombre}-${def.id || ''}`}
          type={def.tipo === 'numero' ? 'number' : def.tipo === 'color' ? 'color' : 'text'}
          value={valor ?? ''}
          onChange={(e) =>
            alCambiar(nombre, def.tipo === 'numero' ? Number(e.target.value) : e.target.value)
          }
          placeholder={def.placeholder || ''}
        />
      )}

      {def.tipo === 'imagen' ? (
        <div className="admin-subida">
          <label>
            {subiendo ? 'Subiendo…' : 'Subir imagen'}
            <input type="file" accept="image/*" onChange={subir} disabled={subiendo} />
          </label>
          {valor ? <img className="admin-vista-previa" src={valor} alt="" /> : null}
          {errorSubida ? <span style={{ color: '#ff9b9b', fontSize: '0.8rem' }}>{errorSubida}</span> : null}
        </div>
      ) : null}

      {def.ayuda ? (
        <span style={{ fontSize: '0.78rem', color: 'var(--texto-tenue)' }}>{def.ayuda}</span>
      ) : null}
    </div>
  );
}
