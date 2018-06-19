import cookie from "./cookie";

const isInObject = (key, object) => key in object;

export const setItem = (key, value) => {
  if (isInObject("localStorage", window)) {
    localStorage.setItem(key, value);
  }
  if (isInObject("sessionStorage", window)) {
    sessionStorage.setItem(key, value);
  }
  cookie.setItem(key, value);
};

export const getItem = key => {
  return (
    localStorage.getItem(key) ||
    sessionStorage.getItem(key) ||
    cookie.getItem(key)
  );
};

export const removeItem = key => {
  if (isInObject("localStorage", window)) {
    localStorage.removeItem(key);
  }
  if (isInObject("sessionStorage", window)) {
    sessionStorage.removeItem(key);
  }
  cookie.removeItem(key);
};
