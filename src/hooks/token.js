import { CONFIGS } from "../configs";

export const useToken = () => {
  const TOKEN_KEY = CONFIGS.localStorageKey;

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  return {
    getToken,
    setToken,
    removeToken,
  };
};
