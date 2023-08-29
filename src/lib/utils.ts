import { getDatabase, ref, set, get } from "firebase/database";

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { app } from "@/services/firebase";

export async function getLC({ location = "/" }) {
  try {
    const db = getDatabase(app);
    const query = ref(db, location);
    const snapshot = await get(query);
    return snapshot.val();
  } catch (error) {
    console.log("error from getLC:", error);
    return {};
  }
}

export function setLC({ location, toStore }) {
  try {
    const db = getDatabase();
    return set(ref(db, location), toStore);
  } catch (error) {
    return {};
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const removeKey = (key, { [key]: _, ...rest }) => rest;

export const preventSubmit = () => false;

