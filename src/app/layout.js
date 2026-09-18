import './globals.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  try {
    const { getContenido } = await import('@/lib/contenido');
    const { ajustes } = await getContenido();
    const titulo = ajustes.meta_titulo || `${ajustes.nombre || 'Portfolio'}${ajustes.titular ? ` — ${ajustes.titular}` : ''}`;
    const descripcion = ajustes.meta_descripcion || ajustes.descripcion || '';
    return {
      title: titulo,
      description: descripcion,
      openGraph: { title: titulo, description: descripcion, type: 'website' },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: 'Portfolio' };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
