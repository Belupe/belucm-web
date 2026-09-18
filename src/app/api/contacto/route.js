import { NextResponse } from 'next/server';
import { initDb, query } from '@/lib/db';

export const dynamic = 'force-dynamic';

const recientes = new Map(); // ip -> timestamp del último envío

export async function POST(request) {
  try {
    await initDb();
    const cuerpo = await request.json();

    const nombre = String(cuerpo.nombre || '').trim().slice(0, 120);
    const email = String(cuerpo.email || '').trim().slice(0, 160);
    const asunto = String(cuerpo.asunto || '').trim().slice(0, 160);
    const mensaje = String(cuerpo.mensaje || '').trim().slice(0, 4000);

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'El email no es válido' }, { status: 400 });
    }

    // Anti-spam sencillo: un mensaje cada 30 s por IP
    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'desconocida';
    const ahora = Date.now();
    const ultimo = recientes.get(ip) || 0;
    if (ahora - ultimo < 30000) {
      return NextResponse.json({ error: 'Espera un momento antes de enviar otro mensaje' }, { status: 429 });
    }
    recientes.set(ip, ahora);
    if (recientes.size > 500) recientes.clear();

    await query(
      'INSERT INTO mensajes (nombre, email, asunto, mensaje) VALUES ($1, $2, $3, $4)',
      [nombre, email, asunto, mensaje]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error guardando mensaje:', err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
