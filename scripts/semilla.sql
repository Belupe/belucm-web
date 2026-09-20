-- Contenido inicial de ejemplo. Solo se inserta si la tabla está vacía,
-- así que puedes ejecutarlo sin miedo a duplicar nada. Todo es editable
-- después desde /admin.

INSERT INTO redes (nombre, icono, url, valor, en_contacto, orden)
SELECT * FROM (VALUES
  ('Email',  'mail',   '', '', TRUE, 1),
  ('GitHub', 'github', '', '', TRUE, 2)
) AS v(nombre, icono, url, valor, en_contacto, orden)
WHERE NOT EXISTS (SELECT 1 FROM redes);

INSERT INTO habilidad_categorias (nombre, icono, orden)
SELECT * FROM (VALUES
  ('Sistemas',       'servidor', 1),
  ('Redes',          'red',      2),
  ('Infraestructura','nube',     3),
  ('Desarrollo',     'code',     4)
) AS v(nombre, icono, orden)
WHERE NOT EXISTS (SELECT 1 FROM habilidad_categorias);

INSERT INTO habilidades (categoria_id, nombre, orden)
SELECT c.id, v.nombre, v.orden
FROM (VALUES
  ('Sistemas',        'Linux',        1),
  ('Sistemas',        'Windows Server', 2),
  ('Sistemas',        'Proxmox VE',   3),
  ('Sistemas',        'ZFS',          4),
  ('Redes',           'UniFi',        1),
  ('Redes',           'VLANs',        2),
  ('Redes',           'Firewall',     3),
  ('Redes',           'DNS / DHCP',   4),
  ('Infraestructura', 'Docker',       1),
  ('Infraestructura', 'Cloudflare',   2),
  ('Infraestructura', 'SSO / LDAP',   3),
  ('Infraestructura', 'Monitorización', 4),
  ('Desarrollo',      'Next.js',      1),
  ('Desarrollo',      'PostgreSQL',   2),
  ('Desarrollo',      'Bash',         3)
) AS v(categoria, nombre, orden)
JOIN habilidad_categorias c ON c.nombre = v.categoria
WHERE NOT EXISTS (SELECT 1 FROM habilidades);

INSERT INTO educacion (titulo, institucion, periodo, descripcion, orden)
SELECT * FROM (VALUES
  ('Sistemas Microinformáticos y Redes (SMR)', '', '2º curso', 'Ciclo formativo de grado medio: administración de sistemas, redes locales y mantenimiento de infraestructura.', 1)
) AS v(titulo, institucion, periodo, descripcion, orden)
WHERE NOT EXISTS (SELECT 1 FROM educacion);

INSERT INTO experiencia (puesto, empresa, periodo, actual, descripcion, tecnologias, orden)
SELECT * FROM (VALUES
  ('Administración de mi propio homelab', '', '2024 - Presente', TRUE,
   'Diseño y mantenimiento de una infraestructura completa en casa: virtualización, almacenamiento, red segmentada y servicios publicados de forma segura.',
   ARRAY['Proxmox','Docker','UniFi','Cloudflare'], 1)
) AS v(puesto, empresa, periodo, actual, descripcion, tecnologias, orden)
WHERE NOT EXISTS (SELECT 1 FROM experiencia);

-- Los proyectos reales no se siembran aqui: viven en scripts/proyectos.sql,
-- que sustituye la tabla entera. Para cargarlos:
--   psql -h /var/run/postgresql -U belucm -d belucm -f scripts/proyectos.sql
