-- Proyectos reales de belucm.me
-- Sustituye por completo el contenido de la tabla proyectos.
BEGIN;

DELETE FROM proyectos;
ALTER SEQUENCE proyectos_id_seq RESTART WITH 1;

INSERT INTO proyectos (titulo, resumen, descripcion, video_url, tecnologias, orden, destacado, visible) VALUES

('Plataforma de Resumen',
 'Seguimiento automático de las concesiones portuarias publicadas en el BOE',
 'Una herramienta que vigila el BOE y reúne en un solo sitio todo lo que se publica sobre concesiones de las 28 Autoridades Portuarias españolas. Rastrea las publicaciones, extrae los datos de cada anuncio y los deja consultables y filtrables por autoridad, fecha y tipo de trámite, de modo que lo que antes era revisar el boletín a mano pasa a ser una consulta de treinta segundos. El backend es FastAPI y la interfaz está escrita a mano en HTML, CSS y JavaScript, sin ningún paso de compilación: se abre y funciona.',
 '', ARRAY['Python','FastAPI','Scraping','HTML/CSS/JS'], 1, FALSE, TRUE),

('SBSMTP',
 'Plataforma de correo saliente propia, para dejar de depender de un proveedor externo',
 'Un servicio de envío de correo completo y propio, pensado para sustituir a un proveedor de pago. Node se encarga de la parte inteligente (autenticación, API, panel, firma DKIM, estadísticas sin caducidad y archivo de los mensajes) y Postfix hace el trabajo bruto de entregar. Es multidominio, procesa los informes DMARC que llegan, vigila las listas de bloqueo y se hace comprobaciones de entregabilidad a sí mismo para avisar antes de que un correo empiece a caer en spam. Se despliega de forma nativa con systemd, sin Docker por medio.',
 '', ARRAY['Node.js','Postfix','DKIM','DMARC','systemd'], 2, TRUE, TRUE),

('MyMDM',
 'Gestión de dispositivos Apple autoalojada, sin depender de plataformas de terceros',
 'Un MDM propio para administrar dispositivos Apple: inscripción, perfiles, aplicaciones y políticas, todo bajo control propio y sin pagar licencias por equipo. Está construido declarative-first sobre la gestión declarativa de Apple (DDM), con los tipos generados a partir de los esquemas que publica la propia Apple, así que habla el idioma nativo del sistema en lugar de imitarlo. Entre otras cosas permite imponer una VPN siempre activa sobre IKEv2 contra strongSwan y una red Wi-Fi que el usuario no puede desactivar. Escrito en Go.',
 '', ARRAY['Go','Apple MDM','DDM','IKEv2','strongSwan'], 3, TRUE, TRUE),

('homedocs',
 'Documentación viva del homelab, generada desde las fuentes reales',
 'La documentación de una infraestructura envejece en cuanto se escribe, así que esta no se escribe: se consulta. homedocs le pregunta en vivo a Proxmox, a UniFi, a Cloudflare y a los propios servidores, y con lo que responden monta la documentación completa del laboratorio (máquinas, redes, servicios, dominios y despliegues), que se refresca sola cada quince minutos. Lo que se lee es siempre el estado de ahora mismo, no el de la última vez que alguien se acordó de actualizarlo.',
 '', ARRAY['JavaScript','Proxmox','UniFi','Cloudflare','Docker'], 4, FALSE, TRUE),

('full-outlook',
 'Servidor MCP completo para Outlook y Office 365, con 101 herramientas',
 'Un servidor MCP que le abre Outlook y Office 365 a un asistente de IA por completo: 101 herramientas que cubren correo, calendario, contactos, carpetas, reglas, adjuntos y búsqueda. Funciona tanto en local por stdio como en remoto por HTTP, con claves independientes por cuenta para que cada usuario solo alcance lo suyo. Publicado con licencia MIT.',
 '', ARRAY['TypeScript','MCP','Outlook','Office 365'], 5, FALSE, TRUE),

('full-whatsapp',
 'MCP de WhatsApp en modo solo lectura, imposible de convertir en escritura',
 'Un servidor MCP para consultar WhatsApp sin poder tocar nada: lee conversaciones, transcribe las notas de voz, mira las fotos y analiza los vídeos, pero no envía. Y no por costumbre, sino por construcción: los métodos de escritura se anulan y el objeto de la conexión se congela, de modo que una herramienta que intentara escribir fallaría en el acto. La idea es poder preguntarle cosas a tu propio historial sin arriesgarte a que responda por ti.',
 '', ARRAY['TypeScript','MCP','WhatsApp','Transcripción'], 6, FALSE, TRUE),

('belucm.me',
 'Esta misma web: el contenido en una base de datos propia y un panel para editarlo',
 'La página que estás viendo. Todo lo que aparece en ella (portada, habilidades, formación, experiencia, proyectos y contacto) vive en una base de datos PostgreSQL propia y se edita desde un panel en /admin, sin tocar código ni volver a desplegar. Está hecha con Next.js, sin Supabase ni ningún backend de terceros, y corre de forma nativa con systemd detrás de un túnel de Cloudflare.',
 '', ARRAY['Next.js','React','PostgreSQL','Node.js','Cloudflare'], 7, FALSE, TRUE),

('Homelab MCP',
 'El copiloto de toda la infraestructura: Proxmox y Ubiquiti en tiempo real',
 'El proyecto más grande de todos: un servidor MCP que le da a un asistente de IA el mando de la infraestructura entera, consultando siempre el estado real y nunca la memoria. Cubre Proxmox al completo (máquinas virtuales y contenedores, usuarios, roles y permisos, cortafuegos, alta disponibilidad, copias, discos y red) y toda la plataforma Ubiquiti: UniFi Network, Protect, Access y Site Manager, además de Cloudflare, GitHub y los servidores Linux. Son más de doscientas herramientas, y las operaciones delicadas quedan detrás de una confirmación explícita antes de ejecutarse.',
 '', ARRAY['TypeScript','MCP','Proxmox','UniFi','Cloudflare'], 8, TRUE, TRUE);

COMMIT;
