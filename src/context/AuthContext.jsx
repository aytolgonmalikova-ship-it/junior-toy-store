import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { findByLogin, recordLogin } from '../services/adminsStore';
import { readJSON, removeKey, writeJSON } from '../services/storage';
import { useAdminsList } from '../hooks/useStores';

const SESSION_KEY = 'junior-admin-session';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const admins = useAdminsList();
  const [sessionId, setSessionId] = useState(() => readJSON(sessionStorage, SESSION_KEY)?.adminId ?? null);

  // The session only stores an id: role and status are always read from the live admins list,
  // so blocking, deleting or demoting an admin takes effect immediately.
  const currentAdmin = useMemo(
    () => admins.find((a) => a.id === sessionId && a.status === 'active') ?? null,
    [admins, sessionId],
  );

  useEffect(() => {
    if (sessionId && !currentAdmin) {
      removeKey(sessionStorage, SESSION_KEY);
      setSessionId(null);
    }
  }, [sessionId, currentAdmin]);

  /** Returns { ok: true } or { ok: false, error: 'required' | 'invalid' | 'blocked' }. */
  const login = useCallback((loginValue, password) => {
    if (!loginValue.trim() || !password) return { ok: false, error: 'required' };
    const admin = findByLogin(loginValue);
    if (!admin || admin.password !== password) return { ok: false, error: 'invalid' };
    if (admin.status !== 'active') return { ok: false, error: 'blocked' };
    writeJSON(sessionStorage, SESSION_KEY, { adminId: admin.id, at: new Date().toISOString() });
    setSessionId(admin.id);
    recordLogin(admin.id);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    removeKey(sessionStorage, SESSION_KEY);
    setSessionId(null);
  }, []);

  const value = useMemo(
    () => ({ currentAdmin, isSuper: currentAdmin?.role === 'super', login, logout }),
    [currentAdmin, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
