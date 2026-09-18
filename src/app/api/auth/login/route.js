import { NextResponse } from 'next/server';
import { initDb, one } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { createToken, COOKIE, cookieOptions } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    await initDb();
    const { usuario, password } = await request.json();
    if (!usuario || !password) {
      return NextResponse.json({ error: 'Faltan credenciales' }, { status: 400 });
    }

    const fila = await one('SELECT * FROM usuarios WHERE usuario = $1', [String(usuario).trim()]);
    if (!fila || !verifyPassword(password, fila.password_hash)) {
      return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
    }

    const token = await createToken(fila.usuario);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE, token, cookieOptions);
    return res;
  } catch (err) {
    console.error('Error en login:', err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
