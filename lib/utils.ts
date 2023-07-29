import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saveKey = (key: string, value: string | boolean) => {
  document.cookie = `${key}=${value}; path=/; max-age=${
    60 * 60 * 24 * 7
  }; secure; samesite=strict`;

  return true;
};

export const getKey = (key: string): string | boolean => {
  return document?.cookie
    .split("; ")
    .find((row) => row.startsWith(key))
    ?.split("=")[1] || false;
};

export const deleteKey = (key: string) => {
  document.cookie = `${key}=; path=/; max-age=0; secure; samesite=strict`;

  return true;
};
