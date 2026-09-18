import { NextResponse } from 'next/server';
import { initDb, query } from '@/lib/db';
import { ENTIDADES, prepararCampos } from '@/lib/entidades';

export const dynamic = 'force-dynamic';

function clavePara(def, id) {
  return def.claveTexto ? String(id) : parseInt(id, 10);
}

export async function PUT(request, { params }) {
  const { entidad, id } = await params;
  const def = ENTIDADES[entidad];
  if (!def || def.singleton) return NextResponse.json({ error: 'Entidad desconocida' }, { status: 404 });

  await initDb();
  const cuerpo = await request.json();
  const { columnas, valores } = prepararCampos(def, cuerpo);
  if (!columnas.length) return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 });

  const sets = columnas.map((c, i) => `${c} = $${i + 1}`).join(', ');
  const filas = await query(
    `UPDATE ${def.tabla} SET ${sets} WHERE ${def.clave} = $${columnas.length + 1} RETURNING *`,
    [...valores, clavePara(def, id)]
  );
  if (!filas.length) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(filas[0]);
}

export async function DELETE(request, { params }) {
  const { entidad, id } = await params;
  const def = ENTIDADES[entidad];
  if (!def || def.singleton || def.sinBaja) {
    return NextResponse.json({ error: 'Operación no válida' }, { status: 400 });
  }

  await initDb();
  await query(`DELETE FROM ${def.tabla} WHERE ${def.clave} = $1`, [clavePara(def, id)]);
  return NextResponse.json({ ok: true });
}
