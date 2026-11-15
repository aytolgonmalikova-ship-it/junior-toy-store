import { createPersistentStore } from './createStore';

/**
 * ⚠️ Demo only: credentials live in the browser's localStorage in plain text.
 * A real shop must check passwords on a server and store only hashes.
 */
export const DEFAULT_ADMINS = [
  { id: 'adm-super', name: 'Super Admin', login: 'superadmin', password: '0000', role: 'super', status: 'active', createdAt: '2026-09-01T09:00:00.000Z', lastLoginAt: null },
  { id: 'adm-manager', name: 'Мээрим', login: 'manager', password: '1111', role: 'admin', status: 'active', createdAt: '2026-09-15T09:00:00.000Z', lastLoginAt: null },
  { id: 'adm-bakyt', name: 'Бакыт', login: 'bakyt', password: '2222', role: 'admin', status: 'blocked', createdAt: '2026-10-01T09:00:00.000Z', lastLoginAt: null },
];

export const ROLES = ['admin', 'super'];
export const STATUSES = ['active', 'blocked'];
export const LOGIN_PATTERN = /^[a-z0-9._-]{3,20}$/i;

const isValid = (value) =>
  Array.isArray(value) && value.length > 0 && value.every((a) => a && a.id && a.login && ROLES.includes(a.role) && STATUSES.includes(a.status));

export const adminsStore = createPersistentStore({
  key: 'junior-admins',
  seed: () => structuredClone(DEFAULT_ADMINS),
  isValid,
});

export const normalizeLogin = (login) => login.trim().toLowerCase();

export const findByLogin = (login) => adminsStore.get().find((a) => a.login === normalizeLogin(login));

export const isLoginTaken = (login, exceptId) =>
  adminsStore.get().some((a) => a.login === normalizeLogin(login) && a.id !== exceptId);

export function addAdmin({ name, login, password, role, status }) {
  const admin = {
    id: `adm-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    name: name.trim(),
    login: normalizeLogin(login),
    password,
    role,
    status,
    createdAt: new Date().toISOString(),
    lastLoginAt: null,
  };
  adminsStore.set((admins) => [...admins, admin]);
  return admin;
}

export function updateAdmin(id, patch) {
  adminsStore.set((admins) => admins.map((a) => (a.id === id ? { ...a, ...patch } : a)));
}

export function deleteAdmin(id) {
  adminsStore.set((admins) => admins.filter((a) => a.id !== id));
}

export const recordLogin = (id) => updateAdmin(id, { lastLoginAt: new Date().toISOString() });

export const resetAdmins = () => adminsStore.reset();
