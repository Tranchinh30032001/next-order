import { create } from 'zustand';
import { createGlobalSlice } from './globalSlice';

import { GlobalSlice } from './globalSlice';

export const useBoundStore = create<GlobalSlice>()((...a) => ({
  ...createGlobalSlice(...a)
}))
