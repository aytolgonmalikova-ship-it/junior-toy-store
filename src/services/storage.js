/** Safe wrappers around Web Storage — they never throw (private mode, quota, disabled storage). */
export function readJSON(storage, key) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeJSON(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore — the in-memory state still works for this session */
  }
}

export function removeKey(storage, key) {
  try {
    storage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** Mongo-like 24-char hex id. */
export function createObjectId() {
  const time = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  let rest = '';
  for (let i = 0; i < 16; i += 1) rest += Math.floor(Math.random() * 16).toString(16);
  return time + rest;
}
