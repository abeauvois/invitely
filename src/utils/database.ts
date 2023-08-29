import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "@/modules/app/config/firebase";

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