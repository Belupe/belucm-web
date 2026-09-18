'use client';

import { useState } from 'react';
import Icono, { GRUPOS_ICONOS, esImagen } from '../Icono';

/** Sube un archivo al servidor y devuelve su URL. */
async function subirArchivo(archivo) {
  const form = new FormData();
  form.append('archivo', archivo);
  const res = await fetch('/api/admin/subir', { method: 'POST', body: form });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'No se pudo subir');
  return json.url;
}

/** Selector visual de iconos, con opcion de subir un logo propio. */
function SelectorIcono({ valor, alElegir }) {
  const [abierto, setAbierto] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');

  async function subirLogo(e) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    setSubiendo(true);
    setError('');
    try {
      alElegir(await subirArchivo(archivo));
      setAbierto(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubiendo(false);
      e.target.value = '';
    }
  }

  return (
    <div className="selector-icono">
      <button type="button" className="selector-icono-actual" onClick={() => setAbierto(!abierto)}>
        <span className="icono-chip">
          <Icono nombre={valor} size={22} />
        </span>
        <span>{esImagen(valor) ? 'logo propio' : valor || 'elegir icono'}</span>
        <span className="selector-icono-flecha">{abierto ? '▲' : '▼'}</span>
      </button>

      {abierto ? (
        <div className="selector-icono-panel">
          {GRUPOS_ICONOS.map((grupo) => (
            <div key={grupo.titulo} className="selector-icono-grupo">
              <strong>{grupo.titulo}</strong>
              <div className="selector-icono-rejilla">
                {grupo.iconos.map((nombre) => (
                  <button
                    type="button"
                    key={nombre}
                    title={nombre}
                    className={`selector-icono-opcion${valor === nombre ? ' elegido' : ''}`}
                    onClick={() => {
                      alElegir(nombre);
                      setAbierto(false);
                    }}
                  >
                    <Icono nombre={nombre} size={20} />
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="selector-icono-grupo">
            <strong>Your own logo</strong>
            <p>
              Sube el logotipo oficial que quieras (SVG o PNG). Los iconos de arriba son dibujos
              genericos, no logos de marca.
            </p>
            <label className="selector-icono-subir">
              {subiendo ? 'Subiendo…' : 'Subir imagen'}
              <input type="file" accept="image/*" onChange={subirLogo} disabled={subiendo} />
            </label>
            {error ? <span style={{ color: '#ff9b9b', fontSize: '0.8rem' }}>{error}</span> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Campo({ def, valor, alCambiar }) {
  const [subiendo, setSubiendo] = useState(false);
  const [errorSubida, setErrorSubida] = useState('');
  const nombre = def.nombre;
  const clase = def.ancho === 'total' || def.tipo === 'area' || def.tipo === 'icono' ? 'campo ancho-total' : 'campo';

  async function subir(e) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    setSubiendo(true);
    setErrorSubida('');
    try {
      alCambiar(nombre, await subirArchivo(archivo));
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

      {def.tipo === 'icono' ? (
        <SelectorIcono valor={valor} alElegir={(v) => alCambiar(nombre, v)} />
      ) : def.tipo === 'area' ? (
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
