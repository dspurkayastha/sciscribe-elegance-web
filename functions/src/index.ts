import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";

admin.initializeApp();
const db = admin.firestore();

// ── CORS helper ──
const allowedOrigins = [
    "https://www.sciscribesolutions.com",
    "https://sciscribesolutions.com",
    "http://localhost:3000",
];

function setCorsHeaders(req: any, res: any): boolean {
    const origin = req.headers.origin || "";
    if (allowedOrigins.includes(origin)) {
        res.set("Access-Control-Allow-Origin", origin);
    }
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.status(204).send("");
        return true;
    }
    return false;
}

// ═══════════════════════════════════════════════════════
// 1. Contact Form (full form with file URLs)
// ═══════════════════════════════════════════════════════
export const submitContactFormV2 = onRequest(
    { region: "asia-south1", cors: false },
    async (req, res) => {
        if (setCorsHeaders(req, res)) return;

        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
            return;
        }

        try {
            const {
                name, email, message, fileUrls, honeypot,
                phone, service, addOns, documentType,
                subjectArea, wordCount, deadline,
                contactMethod, source, gdprConsent1, gdprConsent2,
            } = req.body;

            // Spam check
            if (honeypot) {
                res.status(200).json({ success: true }); // Silent fail for bots
                return;
            }

            // Validate required fields
            if (!name || !email || !message) {
                res.status(400).json({ error: "Name, email, and message are required." });
                return;
            }

            const docRef = await db.collection("contacts").add({
                name,
                email,
                message,
                fileUrls: fileUrls || [],
                phone: phone || "",
                service: service || "",
                addOns: addOns || {},
                documentType: documentType || "",
                subjectArea: subjectArea || "",
                wordCount: wordCount || 0,
                deadline: deadline || "",
                contactMethod: contactMethod || "email",
                source: source || "",
                gdprConsent1: gdprConsent1 || false,
                gdprConsent2: gdprConsent2 || false,
                status: "new",
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            res.status(200).json({ success: true, id: docRef.id });
        } catch (error: any) {
            console.error("submitContactFormV2 error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

// ═══════════════════════════════════════════════════════
// 2. Consultation Booking
// ═══════════════════════════════════════════════════════
export const submitConsultationForm = onRequest(
    { region: "asia-south1", cors: false },
    async (req, res) => {
        if (setCorsHeaders(req, res)) return;

        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
            return;
        }

        try {
            const { name, email, phone, date, timeSlot, message } = req.body;

            if (!name || !email) {
                res.status(400).json({ error: "Name and email are required." });
                return;
            }

            const docRef = await db.collection("consultations").add({
                name,
                email,
                phone: phone || "",
                date: date || "",
                timeSlot: timeSlot || "",
                message: message || "",
                status: "pending",
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            res.status(200).json({ success: true, id: docRef.id });
        } catch (error: any) {
            console.error("submitConsultationForm error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

// ═══════════════════════════════════════════════════════
// 3. Quick Contact (homepage/footer short form)
// ═══════════════════════════════════════════════════════
export const submitQuickContactForm = onRequest(
    { region: "asia-south1", cors: false },
    async (req, res) => {
        if (setCorsHeaders(req, res)) return;

        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
            return;
        }

        try {
            const { name, email, phone, message } = req.body;

            if (!name || !email) {
                res.status(400).json({ error: "Name and email are required." });
                return;
            }

            const docRef = await db.collection("quick_contacts").add({
                name,
                email,
                phone: phone || "",
                message: message || "",
                status: "new",
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            res.status(200).json({ success: true, id: docRef.id });
        } catch (error: any) {
            console.error("submitQuickContactForm error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);
