import { useSyncExternalStore } from 'react';
import { toysStore } from '../services/toysStore';
import { adminsStore } from '../services/adminsStore';

export const useToysList = () => useSyncExternalStore(toysStore.subscribe, toysStore.get);
export const useAdminsList = () => useSyncExternalStore(adminsStore.subscribe, adminsStore.get);
