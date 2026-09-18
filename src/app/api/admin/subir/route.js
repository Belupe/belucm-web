import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { randomBytes } from 'crypto';

export const dynamic = 'force-dynamic';

const DIRECTORIO = process.env.UPLOAD_DIR || path.join(process.cwd(), 'data', 'uploads');
const PERMITIDOS = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
};
const MAX = 5 * 1024 * 1024;

export async function POST(request) {
  try {
    const form = await request.formData();
    const archivo = form.get('archivo');
    if (!archivo || typeof archivo === 'string') {
      return NextResponse.json({ error: 'No se ha recibido ningún archivo' }, { status: 400 });
    }

    const extension = PERMITIDOS[archivo.type];
    if (!extension) {
      return NextResponse.json({ error: 'Formato no admitido (png, jpg, webp, gif, svg, avif)' }, { status: 400 });
    }
    if (archivo.size > MAX) {
      return NextResponse.json({ error: 'El archivo supera los 5 MB' }, { status: 400 });
    }

    await mkdir(DIRECTORIO, { recursive: true });
    const nombre = `${Date.now()}-${randomBytes(4).toString('hex')}${extension}`;
    const buffer = Buffer.from(await archivo.arrayBuffer());
    await writeFile(path.join(DIRECTORIO, nombre), buffer);

    return NextResponse.json({ url: `/api/media/${nombre}` });
  } catch (err) {
    console.error('Error subiendo archivo:', err);
    return NextResponse.json({ error: 'No se pudo guardar el archivo' }, { status: 500 });
  }
}
