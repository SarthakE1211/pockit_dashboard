"use client";

import { useState } from "react";
import {
    ArrowLeft, CheckCircle2, Plus, Sparkles,
    Calendar, User, MapPin, Tag, FileText,
    ListChecks, Lightbulb,
} from "lucide-react";
import styles from "../styles/Createservicepage.module.css";

const CHECKLIST = [
    "Customer name & contact filled",
    "Service category selected",
    "Address / location added",
    "Preferred date & time set",
    "Technician assigned (optional)",
];

const TIPS = [
    "Fill all required fields marked with * for faster processing.",
    "Assigning a technician is optional — you can do it later.",
    "High priority tickets get reviewed first by our team.",
    "Add detailed notes to help the technician prepare.",
];

export default function CreateServicePage({ onBack, onSuccess }) {
    const [priority, setPriority] = useState("Medium");
    const [checked, setChecked] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [serviceId] = useState(`#SV-${1000 + Math.floor(Math.random() * 900)}`);

    const toggleCheck = (i) =>
        setChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        onSuccess?.();
    };

    if (submitted) {
        return (
            <div className={styles.root}>
                <div className={styles.page}>
                    <div className={`${styles.successWrap} ${styles.f} ${styles.f1}`}>
                        <div className={styles.successIcon}>
                            <CheckCircle2 size={32} color="#16a34a" />
                        </div>
                        <h2 className={styles.successTitle}>Service Created Successfully!</h2>
                        <p className={styles.successDesc}>
                            Your service request has been submitted. A technician will be assigned shortly.
                        </p>
                        <p className={styles.successId}>Service ID: {serviceId}</p>
                        <div className={styles.successActions}>
                            <button className={styles.submitBtn} onClick={onBack}>
                                View All Services
                            </button>
                            <button className={styles.cancelBtn} onClick={() => setSubmitted(false)}>
                                Create Another
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <div className={styles.page}>

                {/* Header */}
                <div className={`${styles.pageHeader} ${styles.f} ${styles.f1}`}>
                    <button className={styles.backBtn} onClick={onBack}>
                        <ArrowLeft size={14} /> Back
                    </button>
                    <div className={styles.headerText}>
                        <p className={styles.pageSubtitle}>New request</p>
                        <h1 className={styles.pageTitle}>Create Service</h1>
                    </div>
                </div>

                {/* Layout */}
                <div className={`${styles.layout} ${styles.f} ${styles.f2}`}>

                    {/* ── FORM ── */}
                    <form onSubmit={handleSubmit}>

                        {/* Customer Info */}
                        <div className={styles.formCard} style={{ marginBottom: 16 }}>
                            <p className={styles.sectionTitle}>
                                <User size={13} style={{ marginRight: 6, verticalAlign: "middle" }} />
                                Customer Information
                            </p>
                            <div className={styles.formGrid}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Customer Name <span className={styles.required}>*</span></label>
                                    <input className={styles.input} placeholder="e.g. Rahul Sharma" required />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Phone Number <span className={styles.required}>*</span></label>
                                    <input className={styles.input} placeholder="+91 98765 43210" required />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Email Address</label>
                                    <input className={styles.input} type="email" placeholder="customer@email.com" />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Customer ID</label>
                                    <input className={styles.input} placeholder="e.g. CUS-4821" />
                                </div>
                            </div>
                        </div>

                        {/* Service Details */}
                        <div className={styles.formCard} style={{ marginBottom: 16 }}>
                            <p className={styles.sectionTitle}>
                                <Tag size={13} style={{ marginRight: 6, verticalAlign: "middle" }} />
                                Service Details
                            </p>
                            <div className={styles.formGrid}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Service Category <span className={styles.required}>*</span></label>
                                    <select className={styles.select} required>
                                        <option value="">Select category</option>
                                        {["AC Repair", "Plumbing", "Electrical", "Carpentry", "Cleaning", "CCTV Install", "Server Setup", "MacBook Repair", "TeskTop Repair"].map(c => (
                                            <option key={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Assign Technician</label>
                                    <select className={styles.select}>
                                        <option value="">Auto-assign</option>
                                        {["John", "Sara", "Sarthak", "Karan", "SK"].map(t => (
                                            <option key={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Preferred Date <span className={styles.required}>*</span></label>
                                    <input className={styles.input} type="date" required />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Preferred Time</label>
                                    <select className={styles.select}>
                                        <option>9:00 AM – 11:00 AM</option>
                                        <option>11:00 AM – 1:00 PM</option>
                                        <option>2:00 PM – 4:00 PM</option>
                                        <option>4:00 PM – 6:00 PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Location & Notes */}
                        <div className={styles.formCard} style={{ marginBottom: 16 }}>
                            <p className={styles.sectionTitle}>
                                <MapPin size={13} style={{ marginRight: 6, verticalAlign: "middle" }} />
                                Location & Notes
                            </p>
                            <div className={styles.formGridFull}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Service Address <span className={styles.required}>*</span></label>
                                    <input className={styles.input} placeholder="Flat No, Building, Street, City" required />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Landmark</label>
                                    <input className={styles.input} placeholder="Near XYZ mall, opposite ABC school" />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Additional Notes</label>
                                    <textarea className={styles.textarea} placeholder="Describe the issue or any special instructions for the technician..." />
                                    <span className={styles.fieldHint}>Max 500 characters</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={styles.formActions}>
                            <button type="submit" className={styles.submitBtn}>
                                <Plus size={14} /> Create Service
                            </button>
                            <button type="button" className={styles.cancelBtn} onClick={onBack}>
                                Cancel
                            </button>
                            <button type="button" className={styles.draftBtn}>
                                Save as Draft
                            </button>
                        </div>
                    </form>

                    {/* ── SIDE PANEL ── */}
                    <div className={styles.sidePanel}>

                        {/* Priority */}
                        <div className={styles.sideCard}>
                            <p className={styles.sideCardTitle}>Priority Level</p>
                            <div className={styles.priorityGrid}>
                                {["Low", "Medium", "High"].map(p => (
                                    <button
                                        key={p}
                                        type="button"
                                        className={`${styles.priorityBtn} ${priority === p ? styles.priorityBtnActive : ""}`}
                                        onClick={() => setPriority(p)}
                                        style={priority === p ? {
                                            borderColor: p === "High" ? "#dc2626" : p === "Medium" ? "#d97706" : "#16a34a",
                                            background: p === "High" ? "#fff5f5" : p === "Medium" ? "#fffbeb" : "#f0fdf4",
                                            color: p === "High" ? "#dc2626" : p === "Medium" ? "#d97706" : "#16a34a",
                                        } : {}}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className={styles.sideCard}>
                            <p className={styles.sideCardTitle}>
                                <ListChecks size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
                                Submission Checklist
                            </p>
                            {CHECKLIST.map((item, i) => (
                                <div key={i} className={styles.checkItem} onClick={() => toggleCheck(i)}>
                                    <div className={`${styles.checkBox} ${checked.includes(i) ? styles.checkBoxChecked : ""}`}>
                                        {checked.includes(i) && <CheckCircle2 size={10} color="#fff" />}
                                    </div>
                                    <span style={{ color: checked.includes(i) ? "#9ca3af" : "#374151", textDecoration: checked.includes(i) ? "line-through" : "none" }}>
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Tips */}
                        <div className={styles.sideCard}>
                            <p className={styles.sideCardTitle}>
                                <Lightbulb size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
                                Helpful Tips
                            </p>
                            {TIPS.map((tip, i) => (
                                <div key={i} className={styles.tipItem}>
                                    <div className={styles.tipDot} />
                                    <p className={styles.tipText}>{tip}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}