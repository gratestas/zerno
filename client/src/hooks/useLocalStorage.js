import { useEffect, useState } from "react";

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;

const getLocalValue = (key, initValue) => {
  // SSR next.js
  if (typeof window === "undefined") return initValue;

  // if a value is already in storage
  const localeValue = JSON.parse(localStorage.getItem(key));
  if (localeValue) return localeValue;

  // return result of a function
  if (initValue instanceof Function) return initValue;

  return initValue;
};
