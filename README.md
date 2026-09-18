# belucm.me

Web personal dinamica: todo el contenido (portada, habilidades, educacion,
experiencia, proyectos y contacto) vive en una base de datos PostgreSQL propia
y se edita desde un panel de administracion en `/admin`. Sin servicios externos.

## Como esta desplegada

Nativa en `ubuntu-sv1`, sin Docker:

| Pieza | Detalle |
|---|---|
| Aplicacion | Next.js 15 (App Router) en `/home/nach/belucm-web`, puerto 3090 |
| Servicio | `belucm-web.service` (systemd, `User=nach`) |
| Base de datos | PostgreSQL del sistema, base y rol `belucm`, por socket Unix |
| Publicacion | Tunel de Cloudflare `ubuntu-SR` hacia `belucm.me` |

No usa Supabase, Firebase ni ningun backend de terceros.

## Puesta en marcha

```bash
npm install
npm run build
sudo systemctl restart belucm-web
```

La primera vez que arranca, la app crea las tablas ella sola y, si has puesto
`ADMIN_USER` y `ADMIN_PASSWORD`, crea tambien el usuario del panel. Los cambios
de esquema posteriores se aplican solos al arrancar (son idempotentes).

Para cargar contenido de ejemplo:

```bash
psql -h /var/run/postgresql -U belucm -d belucm -f scripts/semilla.sql
```

## Variables de entorno (`.env`)

| Variable | Para que |
|---|---|
| `DATABASE_URL` | `postgres://belucm:CLAVE@/belucm?host=/var/run/postgresql` |
| `SESSION_SECRET` | Firma las cookies del panel (`openssl rand -hex 32`) |
| `ADMIN_USER` / `ADMIN_PASSWORD` | Usuario del panel; solo se usan si no existe ninguno |
| `UPLOAD_DIR` | Carpeta de las imagenes subidas |
| `PORT` | Puerto de escucha (3090) |

`ADMIN_PASSWORD` solo tiene efecto con la base de datos vacia. Despues, la
contrasena se cambia desde el propio panel, en la pestana «Cuenta».

## Que se edita desde el panel

- **Perfil e inicio** — nombre, titular, presentacion, avatar, color de acento y datos de contacto.
- **Secciones** — titulo, subtitulo, orden y visibilidad de cada bloque.
- **Redes y contacto** — enlaces de la portada. Con «Mostrar como dato en Contacto»
  cada uno aparece ademas en la columna de «¡Conectemos!» con su icono y su texto
  (correo, GitHub, Twitch...).
- **Habilidades** — categorias (tarjetas) y etiquetas dentro de cada una.
- **Educacion** y **Experiencia** — entradas con centro/empresa, periodo y descripcion.
- **Proyectos** — tarjeta con imagen y resumen; al pulsarla se abre una ventana
  con la descripcion completa, y el boton «Ver» abre el enlace del video.
- **Mensajes** — lo que llega por el formulario de contacto.

## Copias de seguridad

```bash
pg_dump -h /var/run/postgresql -U belucm belucm > copia.sql
```

Las imagenes subidas estan en `data/uploads`.
