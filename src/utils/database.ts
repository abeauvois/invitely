import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "@/config/firebase";

export async function getDbData({ location = "/" }) {
    const db = getDatabase(app);
    const query = ref(db, location);
    const snapshot = await get(query);
    return snapshot.val();
}

export function setDbData({ location, toStore }) {
    const db = getDatabase();
    return set(ref(db, location), toStore);
}