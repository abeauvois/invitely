import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// @Todo use .env value
const { VITE_LOCAL_STORAGE_KEY } = import.meta.env;

export function getLC() {
  try {
    return JSON.parse(localStorage.getItem(VITE_LOCAL_STORAGE_KEY));
  } catch (error) {
    return {};
  }
}

export function setLC(toStore) {
  try {
    localStorage.setItem(VITE_LOCAL_STORAGE_KEY, JSON.stringify(toStore));
  } catch (error) {
    return {};
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
