import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserInfo = create(
  persist(
    (set, get) => ({
      userState: 'USER',
      isLoggedIn: false,
      setUserState: state => set({ userState: state }),
      setIsLoggedIn: state => set({ isLoggedIn: state }),
    }),
    {
      name: 'user-storage',
    },
  ),
);

export { useUserInfo };
