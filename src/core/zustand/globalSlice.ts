import { StateCreator } from 'zustand';

export type GlobalState = {
  isAuth: boolean
}

export type GlobalAction = {
  setIsAuth: (stateLogin: boolean) => void
}

export type GlobalSlice = GlobalState & GlobalAction

export const createGlobalSlice: StateCreator<GlobalSlice, [], [], GlobalSlice> = (set) => ({
  isAuth: false,
  setIsAuth: (stateLogin: boolean) => set(() => ({ isAuth: stateLogin }))
});
