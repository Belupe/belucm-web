import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const DIRECTORIO = process.env.UPLOAD_DIR || path.join(process.cwd(), 'data', 'uploads');

const TIPOS = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

export async function GET(request, { params }) {
  const { archivo } = await params;
  const nombre = path.basename(String(archivo)); // impide rutas tipo ../../
  const extension = path.extname(nombre).toLowerCase();
  const tipo = TIPOS[extension];
  if (!tipo) return new NextResponse('No encontrado', { status: 404 });

  try {
    const datos = await readFile(path.join(DIRECTORIO, nombre));
    return new NextResponse(datos, {
      headers: {
        'Content-Type': tipo,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new NextResponse('No encontrado', { status: 404 });
  }
}
