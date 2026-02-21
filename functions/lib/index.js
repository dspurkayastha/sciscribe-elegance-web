"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitQuickContactForm = exports.submitConsultationForm = exports.submitContactFormV2 = void 0;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
admin.initializeApp();
const db = admin.firestore();
// ── CORS helper ──
const allowedOrigins = [
    "https://www.sciscribesolutions.com",
    "https://sciscribesolutions.com",
    "http://localhost:3000",
];
function setCorsHeaders(req, res) {
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
exports.submitContactFormV2 = (0, https_1.onRequest)({ region: "asia-south1", cors: false }, async (req, res) => {
    if (setCorsHeaders(req, res))
        return;
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }
    try {
        const { name, email, message, fileUrls, honeypot, phone, service, addOns, documentType, subjectArea, wordCount, deadline, contactMethod, source, gdprConsent1, gdprConsent2, } = req.body;
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
    }
    catch (error) {
        console.error("submitContactFormV2 error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// ═══════════════════════════════════════════════════════
// 2. Consultation Booking
// ═══════════════════════════════════════════════════════
exports.submitConsultationForm = (0, https_1.onRequest)({ region: "asia-south1", cors: false }, async (req, res) => {
    if (setCorsHeaders(req, res))
        return;
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
    }
    catch (error) {
        console.error("submitConsultationForm error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// ═══════════════════════════════════════════════════════
// 3. Quick Contact (homepage/footer short form)
// ═══════════════════════════════════════════════════════
exports.submitQuickContactForm = (0, https_1.onRequest)({ region: "asia-south1", cors: false }, async (req, res) => {
    if (setCorsHeaders(req, res))
        return;
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
    }
    catch (error) {
        console.error("submitQuickContactForm error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//# sourceMappingURL=index.js.map