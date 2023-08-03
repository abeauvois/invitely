import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// @Todo use .env value
const { VITE_LOCAL_STORAGE_KEY } = process.env;

export function initLC() {
  if (getLC() === null) setLC({ forms: {} });
}

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

export const removeKey = (key, { [key]: _, ...rest }) => rest;
