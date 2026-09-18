import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

const KEYLEN = 64;

/** Devuelve "scrypt$<salt hex>$<hash hex>" */
export function hashPassword(plain) {
  const salt = randomBytes(16);
  const hash = scryptSync(String(plain), salt, KEYLEN);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}

export function verifyPassword(plain, stored) {
  try {
    const [alg, saltHex, hashHex] = String(stored).split('$');
    if (alg !== 'scrypt' || !saltHex || !hashHex) return false;
    const salt = Buffer.from(saltHex, 'hex');
    const expected = Buffer.from(hashHex, 'hex');
    const actual = scryptSync(String(plain), salt, expected.length);
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
