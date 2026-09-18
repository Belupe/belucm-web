import { NextResponse } from 'next/server';
import { initDb, query } from '@/lib/db';
import { ENTIDADES, prepararCampos } from '@/lib/entidades';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { entidad } = await params;
  const def = ENTIDADES[entidad];
  if (!def) return NextResponse.json({ error: 'Entidad desconocida' }, { status: 404 });

  await initDb();

  if (def.singleton) {
    const filas = await query(`SELECT * FROM ${def.tabla} WHERE id = 1`);
    return NextResponse.json(filas[0] || {});
  }

  const filas = await query(`SELECT * FROM ${def.tabla} ORDER BY ${def.orden || 'id'}`);
  return NextResponse.json(filas);
}

export async function POST(request, { params }) {
  const { entidad } = await params;
  const def = ENTIDADES[entidad];
  if (!def) return NextResponse.json({ error: 'Entidad desconocida' }, { status: 404 });
  if (def.singleton || def.sinAlta) {
    return NextResponse.json({ error: 'No se pueden crear registros aquí' }, { status: 400 });
  }

  await initDb();
  const cuerpo = await request.json();
  const { columnas, valores } = prepararCampos(def, cuerpo, { soloPresentes: false });

  const marcadores = columnas.map((_, i) => `$${i + 1}`).join(', ');
  const filas = await query(
    `INSERT INTO ${def.tabla} (${columnas.join(', ')}) VALUES (${marcadores}) RETURNING *`,
    valores
  );
  return NextResponse.json(filas[0], { status: 201 });
}

/** PUT sobre la colección: solo para el registro único (ajustes). */
export async function PUT(request, { params }) {
  const { entidad } = await params;
  const def = ENTIDADES[entidad];
  if (!def || !def.singleton) {
    return NextResponse.json({ error: 'Operación no válida' }, { status: 400 });
  }

  await initDb();
  const cuerpo = await request.json();
  const { columnas, valores } = prepararCampos(def, cuerpo);
  if (!columnas.length) return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 });

  const sets = columnas.map((c, i) => `${c} = $${i + 1}`).join(', ');
  const filas = await query(`UPDATE ${def.tabla} SET ${sets} WHERE id = 1 RETURNING *`, valores);
  return NextResponse.json(filas[0]);
}
