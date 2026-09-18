import { getContenido } from '@/lib/contenido';
import Fondo from '@/components/Fondo';
import Hero from '@/components/Hero';
import Habilidades from '@/components/Habilidades';
import Educacion from '@/components/Educacion';
import Experiencia from '@/components/Experiencia';
import Proyectos from '@/components/Proyectos';
import Contacto from '@/components/Contacto';
import Pie from '@/components/Pie';

export const dynamic = 'force-dynamic';

function hexARgba(hex, alpha) {
  const limpio = String(hex || '').replace('#', '');
  if (limpio.length !== 6) return `rgba(139,124,246,${alpha})`;
  const n = parseInt(limpio, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

export default async function Pagina() {
  const datos = await getContenido();
  const { ajustes, secciones, ordenSecciones, redes, categorias, educacion, experiencia, proyectos } = datos;

  const estilo = {
    '--acento': ajustes.color_acento || '#8b7cf6',
    '--acento-suave': hexARgba(ajustes.color_acento, 0.16),
  };

  const render = {
    habilidades: <Habilidades key="habilidades" seccion={secciones.habilidades} categorias={categorias} />,
    educacion: <Educacion key="educacion" seccion={secciones.educacion} educacion={educacion} />,
    experiencia: <Experiencia key="experiencia" seccion={secciones.experiencia} experiencia={experiencia} />,
    proyectos: <Proyectos key="proyectos" seccion={secciones.proyectos} proyectos={proyectos} />,
    contacto: <Contacto key="contacto" seccion={secciones.contacto} ajustes={ajustes} redes={redes} />,
  };

  return (
    <div style={estilo}>
      <Fondo />
      <Hero ajustes={ajustes} redes={redes} />
      <main>{ordenSecciones.map((clave) => render[clave]).filter(Boolean)}</main>
      <Pie ajustes={ajustes} />
    </div>
  );
}
