"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircleMore, ArrowRight, UploadCloud } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { submitToFirestore } from "@/lib/firestore";

export default function ContactPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { logFormSubmitted } = useAnalytics();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        addOns: {
            plagiarism: false,
            statistical: false,
            figures: false,
            journal: false,
            cover: false,
            fastTrack: false
        },
        documentType: "",
        subjectArea: "",
        wordCount: "",
        deadline: "",
        contactMethod: "email",
        message: "",
        gdprConsent1: false
    });

    const addOnOptions = [
        { key: "plagiarism", label: "Plagiarism Check & Reduction" },
        { key: "statistical", label: "Statistical Analysis" },
        { key: "figures", label: "Scientific Figures & Diagrams" },
        { key: "journal", label: "Journal Formatting" },
        { key: "cover", label: "Cover Letter & Abstract Editing" },
        { key: "fastTrack", label: "Fast-Track Delivery (48-72 hr)" }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: string) => {
        setFormData(prev => ({
            ...prev,
            addOns: { ...prev.addOns, [name]: !prev.addOns[name as keyof typeof prev.addOns] }
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setSelectedFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // File size validation (20MB per file)
        for (const file of selectedFiles) {
            if (file.size > 20 * 1024 * 1024) {
                toast({ title: "File too large", description: `Each file must be 20MB or less.`, variant: "destructive" });
                setIsSubmitting(false);
                return;
            }
        }

        let fileUrls: string[] = [];
        if (selectedFiles.length > 0) {
            try {
                const uploadPromises = selectedFiles.map(async (file) => {
                    const uniqueName = `contact_uploads/${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${file.name}`;
                    const storageRef = ref(storage, uniqueName);
                    await uploadBytes(storageRef, file);
                    return await getDownloadURL(storageRef);
                });
                fileUrls = await Promise.all(uploadPromises);
            } catch (err) {
                toast({ title: "Upload failed", description: "There was a problem uploading your files.", variant: "destructive" });
                setIsSubmitting(false);
                return;
            }
        }

        const payload = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            message: formData.message,
            fileUrls,
            phone: formData.phone,
            service: formData.service,
            addOns: formData.addOns,
            documentType: formData.documentType,
            subjectArea: formData.subjectArea,
            wordCount: Number(formData.wordCount),
            deadline: formData.deadline,
            contactMethod: formData.contactMethod,
            gdprConsent1: formData.gdprConsent1
        };

        try {
            await submitToFirestore("contacts", payload);

            toast({ title: "Message Sent", description: "Your manuscript request has been received." });
            logFormSubmitted({ form_id: 'contact_page_form', form_name: 'Contact Page Form', success: true });

            router.push("/thank-you");
        } catch (error) {
            toast({ title: "Transmission Error", description: "Could not send request.", variant: "destructive" });
            logFormSubmitted({ form_id: 'contact_page_form', form_name: 'Contact Page Form', success: false, error: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col bg-transparent text-white font-sans overflow-hidden">

            {/* Hero Header */}
            <section className="relative w-full pt-48 pb-32">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
                            Initiate Correspondence
                        </span>
                        <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-white select-none">
                            Submit Your <br />
                            <span className="italic text-white/60">Manuscript.</span>
                        </h1>
                        <p className="mt-12 text-xl md:text-2xl font-light text-white/60 max-w-3xl leading-relaxed text-balance">
                            Engage our experts to engineer a publication strategy tailored exclusively to your research parameters.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact & Form Section */}
            <section className="relative w-full py-24 pb-48 border-t border-white/10">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">

                        {/* Information Column */}
                        <div className="lg:col-span-4 flex flex-col gap-16">
                            <div>
                                <h2 className="text-sm uppercase tracking-[0.2em] font-mono text-white/40 mb-8 pb-4 border-b border-white/10">
                                    Direct Lines
                                </h2>
                                <div className="flex flex-col gap-8">
                                    <div className="group">
                                        <p className="text-white/60 font-light mb-2">Email</p>
                                        <a href="mailto:contact@sciscribesolutions.com" className="text-xl font-serif text-white group-hover:text-white/70 transition-colors">
                                            contact@sciscribesolutions.com
                                        </a>
                                    </div>
                                    <div className="group">
                                        <p className="text-white/60 font-light mb-2">Phone</p>
                                        <a href="tel:+919395582679" className="text-xl font-serif text-white group-hover:text-white/70 transition-colors">
                                            +91 9395582679
                                        </a>
                                    </div>
                                    <div className="group">
                                        <p className="text-white/60 font-light mb-2">Office</p>
                                        <p className="text-xl font-serif text-white">
                                            Hazra Road <br /> Kolkata, India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-sm uppercase tracking-[0.2em] font-mono text-white/40 mb-8 pb-4 border-b border-white/10">
                                    Response Protocol
                                </h2>
                                <p className="text-lg text-white/60 font-light leading-relaxed">
                                    All inquiries are processed securely and confidentially. Our academic reviewers typically assess submissions and formulate a strategic response within 24 hours.
                                </p>
                            </div>
                        </div>

                        {/* Comprehensive Form Column */}
                        <div className="lg:col-span-8">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-12" autoComplete="off">

                                {/* Identity Block */}
                                <div className="flex flex-col gap-8">
                                    <h3 className="text-3xl font-serif italic text-white/80">01. Identity & Contact</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">First Name *</label>
                                            <Input name="firstName" required value={formData.firstName} onChange={handleChange} className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-colors" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Last Name *</label>
                                            <Input name="lastName" required value={formData.lastName} onChange={handleChange} className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-colors" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Academic Email *</label>
                                            <Input name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-colors" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Phone Number *</label>
                                            <Input name="phone" required value={formData.phone} onChange={handleChange} className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Scope Block */}
                                <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
                                    <h3 className="text-3xl font-serif italic text-white/80">02. Project Scope</h3>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Primary Service Tier *</label>
                                        <Select value={formData.service} onValueChange={(val) => handleSelectChange('service', val)}>
                                            <SelectTrigger className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-8 text-xl focus:ring-0">
                                                <SelectValue placeholder="Select an investment tier" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-black/80 backdrop-blur-md border border-white/20 text-white">
                                                <SelectItem value="insight">Research Launchpad (₹7,500 / $90)</SelectItem>
                                                <SelectItem value="enhance">Thesis Trailblazer (₹15,000 / $180)</SelectItem>
                                                <SelectItem value="complete">Publication Pinnacle (₹22,000 / $260)</SelectItem>
                                                <SelectItem value="custom">Custom Requirements</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Document Type *</label>
                                            <Select value={formData.documentType} onValueChange={(val) => handleSelectChange('documentType', val)}>
                                                <SelectTrigger className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-base focus:ring-0">
                                                    <SelectValue placeholder="Format" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-black/80 backdrop-blur-md border border-white/20 text-white">
                                                    <SelectItem value="manuscript">Manuscript</SelectItem>
                                                    <SelectItem value="thesis">Thesis</SelectItem>
                                                    <SelectItem value="researchPaper">Research Paper</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Subject Area *</label>
                                            <Input name="subjectArea" required value={formData.subjectArea} onChange={handleChange} placeholder="e.g. Oncology" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-base focus-visible:ring-0 focus-visible:border-white transition-colors placeholder:text-white/20" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Target Deadline</label>
                                            <Input name="deadline" type="date" value={formData.deadline} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-base focus-visible:ring-0 focus-visible:border-white transition-colors" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4">
                                        <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Targeted Add-Ons</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            {addOnOptions.map(opt => (
                                                <div key={opt.key} className="flex items-center gap-4 group">
                                                    <Checkbox
                                                        id={opt.key}
                                                        checked={formData.addOns[opt.key as keyof typeof formData.addOns]}
                                                        onCheckedChange={() => handleCheckboxChange(opt.key)}
                                                        className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                                    />
                                                    <label htmlFor={opt.key} className="text-sm font-light text-white/70 group-hover:text-white transition-colors cursor-pointer">
                                                        {opt.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Security & Submission Block */}
                                <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
                                    <h3 className="text-3xl font-serif italic text-white/80">03. Assets & Transmission</h3>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Secure Document Upload</label>
                                        <div className="relative border border-white/20 border-dashed p-12 text-center hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                            <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                            <div className="flex flex-col items-center justify-center gap-4 pointer-events-none">
                                                <UploadCloud className="w-8 h-8 text-white/30 group-hover:text-white/60 transition-colors" />
                                                <p className="text-xl font-light text-white/60 group-hover:text-white transition-colors">
                                                    {selectedFiles.length > 0 ? `${selectedFiles.length} file(s) attached` : 'Click or drag files here to attach'}
                                                </p>
                                                <p className="text-xs uppercase tracking-widest font-mono text-white/30">Max 20MB per file. SSL Encrypted.</p>
                                            </div>
                                            {selectedFiles.length > 0 && (
                                                <div className="mt-8 text-left border-t border-white/10 pt-4 px-4 w-full">
                                                    {selectedFiles.map((f, i) => <p key={i} className="text-sm font-mono text-white/60 truncate">{f.name}</p>)}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4">
                                        <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Submission Details / Remarks *</label>
                                        <Textarea name="message" required value={formData.message} onChange={handleChange} className="bg-transparent border border-white/20 rounded-none p-6 text-lg min-h-[200px] focus-visible:ring-0 focus-visible:border-white transition-colors placeholder:text-white/20" placeholder="Detail your specific requirements, hypotheses, or target journal constraints..." />
                                    </div>

                                    <div className="flex items-center gap-4 mt-8 pb-12 border-b border-white/10">
                                        <Checkbox
                                            id="gdpr"
                                            required
                                            checked={formData.gdprConsent1}
                                            onCheckedChange={(v) => setFormData(p => ({ ...p, gdprConsent1: v as boolean }))}
                                            className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                        />
                                        <label htmlFor="gdpr" className="text-sm font-light text-white/50 leading-relaxed cursor-pointer selection:bg-white/20">
                                            I consent to SciScribe Solutions processing this data solely for manuscript evaluation and correspondence. All intellectual property remains explicitly with the author.
                                        </label>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group relative inline-flex items-center justify-center px-12 py-6 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 disabled:opacity-50 transition-all duration-500"
                                        >
                                            <span className="flex items-center gap-4">
                                                {isSubmitting ? "Transmitting..." : "Initiate Transmission"}
                                                {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />}
                                            </span>
                                        </button>
                                    </div>

                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
};
