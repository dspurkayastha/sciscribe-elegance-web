import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Submit data directly to a Firestore collection (Spark plan compatible).
 * No Cloud Functions needed — writes directly from the client.
 */
export async function submitToFirestore(
    collectionName: string,
    data: Record<string, unknown>
): Promise<string> {
    if (!db) throw new Error("Firestore not initialized");

    const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
    });

    return docRef.id;
}
