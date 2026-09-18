import { initDb, query, one } from './db';

export async function getContenido() {
  await initDb();

  const [ajustes, secciones, redes, categorias, habilidades, educacion, experiencia, proyectos] =
    await Promise.all([
      one('SELECT * FROM ajustes WHERE id = 1'),
      query('SELECT * FROM secciones ORDER BY orden, clave'),
      query('SELECT * FROM redes WHERE visible ORDER BY orden, id'),
      query('SELECT * FROM habilidad_categorias ORDER BY orden, id'),
      query('SELECT * FROM habilidades ORDER BY orden, id'),
      query('SELECT * FROM educacion WHERE visible ORDER BY orden, id'),
      query('SELECT * FROM experiencia WHERE visible ORDER BY orden, id'),
      query('SELECT * FROM proyectos WHERE visible ORDER BY orden, id'),
    ]);

  const categoriasConSkills = categorias.map((c) => ({
    ...c,
    items: habilidades.filter((h) => h.categoria_id === c.id),
  }));

  const mapaSecciones = {};
  for (const s of secciones) mapaSecciones[s.clave] = s;

  return {
    ajustes: ajustes || {},
    secciones: mapaSecciones,
    ordenSecciones: secciones.filter((s) => s.visible).map((s) => s.clave),
    redes,
    categorias: categoriasConSkills,
    educacion,
    experiencia,
    proyectos,
  };
}
