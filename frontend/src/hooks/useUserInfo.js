import { create } from 'zustand';

// 전역에서 관리해야 하는 목록
// 1. userId(일단 빼놓기)
// 2. userState(user || zipsa)

const defaultState = { userState: '' };

const useUserInfo = create(set => ({
  userInfo: defaultState,
  setUserInfo: userInfo => set({ userInfo }),
  deleteUserInfo: () => {
    set({ userInfo: defaultState });
  },
}));

export { useUserInfo };
