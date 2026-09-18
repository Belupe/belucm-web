'use client';

import { useState } from 'react';
import Icono from './Icono';

export default function FormularioContacto() {
  const [datos, setDatos] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [estado, setEstado] = useState({ tipo: null, texto: '' });
  const [enviando, setEnviando] = useState(false);

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  async function enviar(e) {
    e.preventDefault();
    setEnviando(true);
    setEstado({ tipo: null, texto: '' });
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'No se pudo enviar el mensaje');
      setEstado({ tipo: 'ok', texto: '¡Mensaje enviado! Te responderé lo antes posible.' });
      setDatos({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch (err) {
      setEstado({ tipo: 'error', texto: err.message });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="tarjeta formulario" onSubmit={enviar}>
      <div className="campo-fila">
        <div className="campo">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            required
            maxLength={120}
            value={datos.nombre}
            onChange={cambiar('nombre')}
            placeholder="Tu nombre completo"
          />
        </div>
        <div className="campo">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            required
            maxLength={160}
            value={datos.email}
            onChange={cambiar('email')}
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="asunto">Asunto</label>
        <input
          id="asunto"
          maxLength={160}
          value={datos.asunto}
          onChange={cambiar('asunto')}
          placeholder="¿De qué quieres hablar?"
        />
      </div>

      <div className="campo">
        <label htmlFor="mensaje">Mensaje *</label>
        <textarea
          id="mensaje"
          required
          maxLength={4000}
          value={datos.mensaje}
          onChange={cambiar('mensaje')}
          placeholder="Cuéntame sobre tu proyecto o idea..."
        />
      </div>

      {estado.tipo ? <div className={`aviso ${estado.tipo}`}>{estado.texto}</div> : null}

      <button className="boton-enviar" type="submit" disabled={enviando}>
        <Icono nombre="enviar" size={16} />
        {enviando ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  );
}
