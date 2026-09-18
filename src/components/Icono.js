// Iconos SVG propios, trazo simple de 1.6 y currentColor.
const PATHS = {
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
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m3.5 7.5 7.4 5.2a2 2 0 0 0 2.2 0l7.4-5.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </>
  ),
  code: <path d="m8.5 8.5-4 3.5 4 3.5m7-7 4 3.5-4 3.5M13.5 5.5l-3 13" />,
  terminal: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m7 9.5 3 2.5-3 2.5M12.5 15h4.5" />
    </>
  ),
  servidor: (
    <>
      <rect x="3" y="4" width="18" height="6.5" rx="2" />
      <rect x="3" y="13.5" width="18" height="6.5" rx="2" />
      <path d="M7 7.2h.01M7 16.8h.01" />
    </>
  ),
  red: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5v4m0 0-5 5m5-5 5 5" />
    </>
  ),
  nube: <path d="M7 19a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 10.6 4.2 4.2 0 0 1 17.5 19H7Z" />,
  escudo: <path d="M12 3.5 5 6.2v5.3c0 4 2.9 7.7 7 9 4.1-1.3 7-5 7-9V6.2L12 3.5Z" />,
  herramientas: <path d="M14.5 6.5a3.5 3.5 0 0 0 4.6 4.6l-8.7 8.7a2.3 2.3 0 0 1-3.2-3.2l8.7-8.7a3.5 3.5 0 0 0-1.4-1.4Z" />,
  base: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  usuario: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  ubicacion: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  calendario: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  enlace: <path d="M14 11a4 4 0 0 0-5.7 0L5.6 13.8a4 4 0 0 0 5.7 5.7l1-1M10 13a4 4 0 0 0 5.7 0l2.7-2.8a4 4 0 0 0-5.7-5.7l-1 1" />,
  externo: <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />,
  flecha: <path d="M12 4.5v15m0 0-6-6m6 6 6-6" />,
  enviar: <path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />,
  cerrar: <path d="m6 6 12 12M18 6 6 18" />,
  estrella: <path d="m12 4 2.5 5.2 5.5.8-4 3.9 1 5.6-5-2.7-5 2.7 1-5.6-4-3.9 5.5-.8L12 4Z" />,
};

export default function Icono({ nombre, size = 20, className = '' }) {
  const contenido = PATHS[nombre] || PATHS.globe;
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
