'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../admin/admin.css';

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function enviar(e) {
    e.preventDefault();
    setCargando(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'No se pudo iniciar sesión');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  }

  return (
    <div className="admin-envoltorio admin-login">
      <form className="admin-login-caja" onSubmit={enviar}>
        <h1>Panel de administración</h1>
        <p>Introduce tus credenciales para editar el contenido de la web.</p>

        <div className="campo" style={{ marginBottom: 14 }}>
          <label htmlFor="usuario">Usuario</label>
          <input
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="campo" style={{ marginBottom: 18 }}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {error ? <div className="aviso error" style={{ marginBottom: 14 }}>{error}</div> : null}

        <button className="boton-enviar" type="submit" disabled={cargando}>
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
