import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { initDb, one, query } from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/password';
import { COOKIE, verifyToken } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  const almacen = await cookies();
  const sesion = await verifyToken(almacen.get(COOKIE)?.value);
  return NextResponse.json({ usuario: sesion?.u || null });
}

export async function PUT(request) {
  try {
    await initDb();
    const almacen = await cookies();
    const sesion = await verifyToken(almacen.get(COOKIE)?.value);
    if (!sesion) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const { actual, nueva } = await request.json();
    if (!nueva || String(nueva).length < 8) {
      return NextResponse.json({ error: 'La nueva contraseña debe tener al menos 8 caracteres' }, { status: 400 });
    }

    const fila = await one('SELECT * FROM usuarios WHERE usuario = $1', [sesion.u]);
    if (!fila || !verifyPassword(actual, fila.password_hash)) {
      return NextResponse.json({ error: 'La contraseña actual no es correcta' }, { status: 400 });
    }

    await query('UPDATE usuarios SET password_hash = $1 WHERE id = $2', [hashPassword(nueva), fila.id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error cambiando contraseña:', err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
