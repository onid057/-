import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserInfo = create(
  persist(
    (set, _) => ({
      userState: 'USER',
      isLoggedIn: false,
      setUserState: state => set({ userState: state }),
      setIsLoggedIn: state => set({ isLoggedIn: state }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export { useUserInfo };
