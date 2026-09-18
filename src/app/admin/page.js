import { cookies } from 'next/headers';
import Panel from '@/components/admin/Panel';
import { COOKIE, verifyToken } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function PaginaAdmin() {
  const almacen = await cookies();
  const sesion = await verifyToken(almacen.get(COOKIE)?.value);
  return <Panel usuario={sesion?.u || ''} />;
}
