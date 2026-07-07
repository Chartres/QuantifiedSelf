const DB_NAME = 'telo-photos';
const DB_VERSION = 1;
const STORE_NAME = 'photos';

/** Derive the 'YYYY-MM' store key for a given date (defaults to today). */
export function monthKeyFor(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

/** Sort month keys ('YYYY-MM') descending — most recent first. */
export function sortMonthsDesc(months: string[]): string[] {
  return [...months].sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
}

function isIndexedDbAvailable(): boolean {
  return typeof indexedDB !== 'undefined';
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!isIndexedDbAvailable()) {
      reject(new Error('indexedDB is not available in this environment'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** No-op (resolves without saving) when IndexedDB is unavailable — never throws. */
export async function savePhoto(monthKey: string, blob: Blob): Promise<void> {
  if (!isIndexedDbAvailable()) return;
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(blob, monthKey);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

/** Returns undefined when IndexedDB is unavailable — never throws. */
export async function getPhoto(monthKey: string): Promise<Blob | undefined> {
  if (!isIndexedDbAvailable()) return undefined;
  const db = await openDb();
  const result = await new Promise<Blob | undefined>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(monthKey);
    req.onsuccess = () => resolve(req.result as Blob | undefined);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return result;
}

/** Returns an empty list when IndexedDB is unavailable — never throws. */
export async function listMonths(): Promise<string[]> {
  if (!isIndexedDbAvailable()) return [];
  const db = await openDb();
  const keys = await new Promise<string[]>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).getAllKeys();
    req.onsuccess = () => resolve(req.result as string[]);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return sortMonthsDesc(keys);
}
