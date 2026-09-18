// Juego de iconos propio: trazo de 1.6 sobre una caja de 24x24, en currentColor.
// Son dibujos genericos (un cubo, una base de datos, un mando...), no logos de
// marca. Si quieres el logotipo oficial de algo, subelo como imagen desde el
// panel: cualquier valor que empiece por "/" o "http" se pinta como <img>.

const PATHS = {
  // ---------- Code ----------
  code: <path d="m8.5 8.5-4 3.5 4 3.5m7-7 4 3.5-4 3.5M13.5 5.5l-3 13" />,
  braces: <path d="M9.5 3.5c-2 0-2.5 1-2.5 3s0 3-2.5 3c2.5 0 2.5 1 2.5 3s.5 3 2.5 3M14.5 3.5c2 0 2.5 1 2.5 3s0 3 2.5 3c-2.5 0-2.5 1-2.5 3s-.5 3-2.5 3" />,
  terminal: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m7 9.5 3 2.5-3 2.5M12.5 15H17" />
    </>
  ),
  'file-code': (
    <>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3Z" />
      <path d="M13.2 3.2V9h5.6M10.5 12.5l-2 2 2 2M13.5 12.5l2 2-2 2" />
    </>
  ),
  bug: (
    <>
      <path d="M8.5 8.5a3.5 3.5 0 0 1 7 0v4a3.5 3.5 0 0 1-7 0v-4Z" />
      <path d="M9 6.5 7.5 5M15 6.5 16.5 5M8.5 10.5H5M15.5 10.5H19M8.7 14 6 16M15.3 14l2.7 2M12 12v6" />
    </>
  ),
  'git-branch': (
    <>
      <circle cx="7" cy="5.5" r="2.2" />
      <circle cx="7" cy="18.5" r="2.2" />
      <circle cx="17" cy="9.5" r="2.2" />
      <path d="M7 7.7v8.6M17 11.7c0 3.4-2.6 4.6-6.2 4.9" />
    </>
  ),
  package: (
    <>
      <path d="M12 3 3.5 7.5v9L12 21l8.5-4.5v-9L12 3Z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9M7.7 5.2l8.6 4.6" />
    </>
  ),
  plugin: <path d="M10 4.5a1.6 1.6 0 1 1 3.2 0V7H17a1 1 0 0 1 1 1v3.3h2.2a1.6 1.6 0 1 1 0 3.2H18V18a1 1 0 0 1-1 1h-3.3v-2.2a1.6 1.6 0 1 0-3.2 0V19H7a1 1 0 0 1-1-1v-3.5H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V8a1 1 0 0 1 1-1h3V4.5Z" />,
  plug: <path d="M9 3v5M15 3v5M7.5 8h9v3.2a4.5 4.5 0 0 1-9 0V8ZM12 15.7V21" />,
  database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.6" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  binary: (
    <>
      <rect x="4" y="4" width="6" height="7" rx="3" />
      <rect x="14" y="13" width="6" height="7" rx="3" />
      <path d="M15 4h2.5v7M6 13h2.5v7M4 20h6M14 11h6" />
    </>
  ),

  // ---------- Web ----------
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18" />
      <circle cx="6.2" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="8.8" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9.5h18M9.5 9.5V20" />
    </>
  ),
  responsive: (
    <>
      <rect x="2.5" y="5" width="13" height="10" rx="2" />
      <rect x="16" y="9" width="5.5" height="10" rx="1.5" />
      <path d="M6 19h5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 0 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-1.3-1-1.6-1-2.6 0-.8.7-1.4 1.6-1.4H16a5 5 0 0 0 5-5c0-4-4-7.3-9-7.3Z" />
      <circle cx="8" cy="10" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  brush: <path d="M17 4.5 9.5 12M14 3l7 7-8.5 6-4.5-4.5L17 4.5ZM7 16c-1.5 0-3 1-3 3 0 1 .4 2 .4 2s2.6.4 3.6-.6 1-2.4 1-2.4L7 16Z" />,
  link: <path d="M14 11a4 4 0 0 0-5.7 0L5.6 13.8a4 4 0 0 0 5.7 5.7l1-1M10 13a4 4 0 0 0 5.7 0l2.7-2.8a4 4 0 0 0-5.7-5.7l-1 1" />,
  external: <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />,

  // ---------- Systems & network ----------
  server: (
    <>
      <rect x="3" y="4" width="18" height="6.5" rx="2" />
      <rect x="3" y="13.5" width="18" height="6.5" rx="2" />
      <path d="M7 7.2h.01M7 16.8h.01" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5v4m0 0-5 5m5-5 5 5" />
    </>
  ),
  cloud: <path d="M7 19a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 10.6 4.2 4.2 0 0 1 17.5 19H7Z" />,
  router: (
    <>
      <rect x="3" y="13" width="18" height="6.5" rx="2" />
      <path d="M7 16.3h.01M11 16.3h.01M8 10.5 12 6.5l4 4" />
      <path d="M12 6.5V13" />
    </>
  ),
  wifi: (
    <>
      <path d="M4.5 9.5a11 11 0 0 1 15 0M7.5 13a6.5 6.5 0 0 1 9 0" />
      <circle cx="12" cy="17.5" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  shield: <path d="M12 3.5 5 6.2v5.3c0 4 2.9 7.7 7 9 4.1-1.3 7-5 7-9V6.2L12 3.5Z" />,
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="m10.8 10.8 8 8M16.5 17.3l1.8-1.8M14 14.7l1.8-1.8" />
    </>
  ),
  'hard-drive': (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="3" />
      <path d="M3 12h18" />
      <circle cx="17" cy="15.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2.5" />
      <path d="M9 20.5h6M12 17v3.5" />
    </>
  ),
  laptop: (
    <>
      <rect x="4" y="5" width="16" height="11" rx="2" />
      <path d="M2 19h20" />
    </>
  ),
  container: (
    <>
      <rect x="3" y="11" width="5" height="5" rx="0.8" />
      <rect x="9.5" y="11" width="5" height="5" rx="0.8" />
      <rect x="9.5" y="5" width="5" height="5" rx="0.8" />
      <path d="M3 19h18" />
    </>
  ),
  layers: <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12.5 12 17l9-4.5M3 17 12 21.5 21 17" />,

  // ---------- Gaming ----------
  cube: (
    <>
      <path d="M12 2.8 3.5 7.4v9.2L12 21.2l8.5-4.6V7.4L12 2.8Z" />
      <path d="M3.5 7.4 12 12l8.5-4.6M12 12v9.2" />
    </>
  ),
  blocks: (
    <>
      <rect x="3" y="12.5" width="8" height="8" rx="1" />
      <rect x="13" y="12.5" width="8" height="8" rx="1" />
      <rect x="8" y="3.5" width="8" height="8" rx="1" />
    </>
  ),
  gamepad: (
    <>
      <path d="M7.5 8h9a5 5 0 0 1 4.8 6.3l-.8 3A2.6 2.6 0 0 1 16 18.4L14.5 16h-5L8 18.4a2.6 2.6 0 0 1-4.5-1.1l-.8-3A5 5 0 0 1 7.5 8Z" />
      <path d="M7 11v3M5.5 12.5h3" />
      <circle cx="16" cy="11.8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="18" cy="13.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  pickaxe: <path d="M13.5 10.5 4 20M4 7.5c3.5-2.5 8-2 11 1M20 13.5c-1.5-4-4.5-6.5-8.5-7M11.5 6.5l6 6" />,
  sword: <path d="M20 3.5 10 13.5M20 3.5h-3.5L7.5 12.5l4 4L20 7.5V3.5ZM6 14l4 4M4.5 15.5l4 4M3 18.5l2.5 2.5" />,
  trophy: (
    <>
      <path d="M7.5 4h9v5.5a4.5 4.5 0 0 1-9 0V4Z" />
      <path d="M7.5 5.5H5a2.5 2.5 0 0 0 2.5 4M16.5 5.5H19a2.5 2.5 0 0 1-2.5 4M12 14v3.5M8.5 20.5h7" />
    </>
  ),
  dice: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      <circle cx="8.8" cy="8.8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.2" cy="15.2" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),

  // ---------- Tools & general ----------
  tools: <path d="M14.5 6.5a3.5 3.5 0 0 0 4.6 4.6l-8.7 8.7a2.3 2.3 0 0 1-3.2-3.2l8.7-8.7a3.5 3.5 0 0 0-1.4-1.4Z" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" />
    </>
  ),
  hammer: <path d="m14 7 3.5-3.5 3 3L17 10M14 7l-9 9v3h3l9-9M14 7l3 3" />,
  rocket: <path d="M12 2.5c3.5 2.5 5 6 5 9.5l-2.5 3h-5L7 12c0-3.5 1.5-7 5-9.5ZM9.5 15 8 20l4-2 4 2-1.5-5M9 18.5C6.5 19 5.5 21 5.5 21" />,
  lightning: <path d="M13.5 2.5 5 13.5h6l-.5 8L19 10.5h-6l.5-8Z" />,
  flask: <path d="M9.5 3v6.5L4.8 18a2.2 2.2 0 0 0 1.9 3.3h10.6a2.2 2.2 0 0 0 1.9-3.3l-4.7-8.5V3M8 3h8M7 15h10" />,
  book: <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5ZM4 19a2 2 0 0 1 2-2h13" />,
  graduation: <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4ZM6.5 10.7V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5.3M21.5 8.5V14" />,
  briefcase: (
    <>
      <rect x="2.5" y="7" width="19" height="13" rx="2.5" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M2.5 12.5h19" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  star: <path d="m12 4 2.5 5.2 5.5.8-4 3.9 1 5.6-5-2.7-5 2.7 1-5.6-4-3.9 5.5-.8L12 4Z" />,
  heart: <path d="M12 20.5s-8-5-8-10.2A4.3 4.3 0 0 1 12 7.5a4.3 4.3 0 0 1 8 2.8c0 5.2-8 10.2-8 10.2Z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 19.5a6.5 6.5 0 0 1 13 0M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 14.2a6.5 6.5 0 0 1 4 5.3" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m3.5 7.5 7.4 5.2a2 2 0 0 0 2.2 0l7.4-5.2" />
    </>
  ),
  send: <path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.3 15.3 5.2 5.2" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="3" />
      <path d="m4 17 5-5 4 4 2.5-2.5L20 17" />
      <circle cx="8.5" cy="9" r="1.4" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="m10.5 9.2 5 2.8-5 2.8V9.2Z" fill="currentColor" stroke="none" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5.5l11-2V16" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </>
  ),
  folder: <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h3.2l2.3 2.5h7.5A2.5 2.5 0 0 1 21 9v8.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Z" />,
  download: <path d="M12 3.5v11m0 0-4-4m4 4 4-4M4.5 17.5v1A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5v-1" />,
  upload: <path d="M12 15.5v-11m0 0-4 4m4-4 4 4M4.5 17.5v1A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5v-1" />,
  refresh: <path d="M20 8A8.5 8.5 0 0 0 4.7 9.5M4 16a8.5 8.5 0 0 0 15.3 1.5M20 3.5V8h-4.5M4 20.5V16h4.5" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  sparkles: <path d="m9 3 1.6 4.4L15 9l-4.4 1.6L9 15l-1.6-4.4L3 9l4.4-1.6L9 3ZM17 13l1 2.7 2.7 1-2.7 1-1 2.7-1-2.7-2.7-1 2.7-1 1-2.7Z" />,
  arrow: <path d="M12 4.5v15m0 0-6-6m6 6 6-6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,

  // ---------- Social ----------
  github: (
    <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5.7v-3.6a3.1 3.1 0 0 0-.9-2.4c2.9-.3 6-1.4 6-6.4a4.9 4.9 0 0 0-1.4-3.4 4.5 4.5 0 0 0-.1-3.4S17.4 2.4 15 4a11.9 11.9 0 0 0-6 0C6.6 2.4 5.4 2.8 5.4 2.8a4.5 4.5 0 0 0-.1 3.4A4.9 4.9 0 0 0 3.9 9.6c0 5 3.1 6.1 6 6.4a3.1 3.1 0 0 0-.9 2.4V22" />
  ),
  twitter: <path d="m3 3 7.5 9.7L3.4 21h2.2l6-6.9 5.3 6.9H21l-7.9-10.2L20.4 3h-2.2l-5.7 6.5L7.7 3H3Z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="m10.5 9.2 5 2.8-5 2.8V9.2Z" fill="currentColor" stroke="none" />
    </>
  ),
  twitch: <path d="M4 3h16v11l-4 4h-3.5L9 21H7v-3H4V3Zm6 5v5m4-5v5" />,
  discord: (
    <>
      <path d="M8.5 16.5c-1.8-.5-3-1.4-3-1.4.2-3.7 1.4-7 3.6-9.4 0 0 1.4-.6 2.9-.7l.6 1.2a12 12 0 0 1 2.8 0L16 5c1.5.1 2.9.7 2.9.7 2.2 2.4 3.4 5.7 3.6 9.4 0 0-1.2.9-3 1.4M8.5 16.5 7 19s2 1.2 5 1.2 5-1.2 5-1.2l-1.5-2.5m-7 0a19 19 0 0 0 7 0" />
      <circle cx="9.5" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5V17M7.5 7.6v.1M11.5 17v-3.6a2 2 0 0 1 4 0V17M11.5 10.5V17" />
    </>
  ),
};

// Nombres antiguos en castellano -> nombre actual, para no romper lo ya guardado.
const ALIAS = {
  servidor: 'server',
  red: 'network',
  nube: 'cloud',
  escudo: 'shield',
  herramientas: 'tools',
  base: 'database',
  usuario: 'user',
  ubicacion: 'location',
  calendario: 'calendar',
  enlace: 'link',
  externo: 'external',
  flecha: 'arrow',
  enviar: 'send',
  cerrar: 'close',
  estrella: 'star',
};

/** true si el valor es una imagen subida o una URL, en vez de un icono del juego. */
export function esImagen(nombre) {
  const v = String(nombre || '');
  return v.startsWith('/') || v.startsWith('http://') || v.startsWith('https://') || v.startsWith('data:');
}

export default function Icono({ nombre, size = 20, className = '' }) {
  if (esImagen(nombre)) {
    return (
      <img
        src={nombre}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain' }}
        className={className}
      />
    );
  }

  const clave = ALIAS[nombre] || nombre;
  const contenido = PATHS[clave] || PATHS.code;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {contenido}
    </svg>
  );
}

export const ICONOS_DISPONIBLES = Object.keys(PATHS);

// Agrupados para el selector del panel.
export const GRUPOS_ICONOS = [
  { titulo: 'Code', iconos: ['code', 'braces', 'terminal', 'file-code', 'bug', 'git-branch', 'package', 'plugin', 'plug', 'database', 'cpu', 'binary'] },
  { titulo: 'Web', iconos: ['globe', 'browser', 'layout', 'responsive', 'palette', 'brush', 'link', 'external'] },
  { titulo: 'Systems & network', iconos: ['server', 'network', 'cloud', 'router', 'wifi', 'shield', 'lock', 'key', 'hard-drive', 'monitor', 'laptop', 'container', 'layers'] },
  { titulo: 'Gaming', iconos: ['cube', 'blocks', 'gamepad', 'pickaxe', 'sword', 'trophy', 'dice'] },
  { titulo: 'General', iconos: ['tools', 'gear', 'hammer', 'rocket', 'lightning', 'flask', 'book', 'graduation', 'briefcase', 'calendar', 'clock', 'star', 'heart', 'user', 'users', 'location', 'mail', 'send', 'search', 'image', 'video', 'music', 'folder', 'download', 'upload', 'refresh', 'check', 'sparkles', 'arrow', 'close'] },
  { titulo: 'Social', iconos: ['github', 'twitter', 'instagram', 'youtube', 'twitch', 'discord', 'linkedin'] },
];
