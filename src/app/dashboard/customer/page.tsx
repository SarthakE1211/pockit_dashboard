"use client";

import {
    CheckCircle2, Circle, Loader2, ArrowRight,
    ChevronRight, BookOpen, MessageCircle, Video,
    FileText, Activity, Phone, Headphones,
    Wrench, LifeBuoy, Gift, User,
} from "lucide-react";
import styles from "./styles/Customerdashboard.module.css";

/* ─────────────── DATA ─────────────── */
const TIMELINE = [
    { label: "Service Booked", time: "Mar 10, 9:00 AM", status: "done" },
    { label: "Technician Assigned", time: "Mar 10, 11:30 AM", status: "done" },
    { label: "In Progress", time: "Mar 12, 2:00 PM", status: "active" },
    { label: "Awaiting Review", time: "—", status: "pending" },
    { label: "Resolved", time: "—", status: "pending" },
];

const OFFERS = [
    { title: "20% Off Next Booking", desc: "Valid till Mar 31", color: "#d97706", light: "#fffbeb", badge: "Limited" },
    { title: "Free Annual Maintenance", desc: "On plans above ₹2000", color: "#16a34a", light: "#f0fdf4", badge: "New" },
    { title: "Refer & Earn ₹500", desc: "Per successful referral", color: "#2563eb", light: "#eff6ff", badge: "Active" },
];

const SELF_HELP = [
    { title: "FAQs", desc: "Common questions", Icon: BookOpen, color: "#2563eb", bg: "#eff6ff" },
    { title: "Raise Ticket", desc: "Report an issue", Icon: MessageCircle, color: "#dc2626", bg: "#fff5f5" },
    { title: "Video Guides", desc: "How-to videos", Icon: Video, color: "#7c3aed", bg: "#f5f3ff" },
    { title: "User Manual", desc: "Download guides", Icon: FileText, color: "#0891b2", bg: "#ecfeff" },
    { title: "Call Support", desc: "Talk to an agent", Icon: Phone, color: "#16a34a", bg: "#f0fdf4" },
    { title: "Live Chat", desc: "Chat in real-time", Icon: Headphones, color: "#d97706", bg: "#fffbeb" },
];

const SERVICES = [
    { title: "Book Service", desc: "Schedule a technician visit", Icon: Wrench, color: "#2563eb", bg: "#eff6ff" },
    { title: "Track Request", desc: "Check live status updates", Icon: Activity, color: "#16a34a", bg: "#f0fdf4" },
    { title: "Raise Complaint", desc: "Report an issue quickly", Icon: LifeBuoy, color: "#dc2626", bg: "#fff5f5" },
];

const STATS = [
    { label: "Active", value: "3", color: "#2563eb", bg: "#eff6ff" },
    { label: "Resolved", value: "12", color: "#16a34a", bg: "#f0fdf4" },
    { label: "Pending", value: "2", color: "#d97706", bg: "#fffbeb" },
];

/* ─────────────── COMPONENT ─────────────── */
export default function CustomerDashboard() {
    return (
        <div className={styles.root}>
            <div className={styles.page}>

                {/* ── Header ── */}
                <div className={styles.header}>
                    <p className={styles.headerLabel}>Welcome back, Alex</p>
                    <h1 className={styles.headerTitle}>Customer Dashboard</h1>
                </div>

                {/* ── ROW 1: Active Request + Offers ── */}
                <div className={`${styles.row} ${styles.row2}`}>

                    {/* A. Active Request Flow */}
                    <div className={`${styles.card} ${styles.cardBlue}`}>
                        <div className={styles.sectionHead} data-accent="blue">
                            <span className={styles.cardTitle}>Active Request</span>
                            <div className={styles.chipRow}>
                                <span className={`${styles.chip} ${styles.chipBlue}`}>#PK-4821</span>
                                <span className={`${styles.chip} ${styles.chipPulse}`}>
                                    <span className={styles.pulseDot} />
                                    IN PROGRESS
                                </span>
                            </div>
                        </div>

                        {/* Flow track */}
                        <div className={styles.flowTrack}>
                            {TIMELINE.map((step, i) => (
                                <div
                                    key={i}
                                    className={`${styles.flowStep} ${step.status === "done" ? styles.done :
                                        step.status === "active" ? styles.active : styles.pending
                                        }`}
                                >
                                    <div className={styles.flowNode}>
                                        {step.status === "done" && <CheckCircle2 size={15} />}
                                        {step.status === "active" && <Loader2 size={15} className={styles.spin} />}
                                        {step.status === "pending" && <Circle size={14} />}
                                    </div>
                                    <p className={styles.flowLabel}>{step.label}</p>
                                    <p className={styles.flowTime}>{step.time}</p>
                                </div>
                            ))}
                        </div>

                        {/* Technician info bar */}
                        <div className={styles.techBar}>
                            <User size={13} color="#2563eb" />
                            <span>Technician: <strong>Raj Kumar</strong> &nbsp;·&nbsp; ETA: Today, 5:00 PM</span>
                        </div>
                    </div>

                    {/* B. Offers */}
                    <div className={`${styles.card} ${styles.cardAmber}`}>
                        <div className={styles.sectionHead} data-accent="amber">
                            <span className={styles.cardTitle}>Offers for You</span>
                            <button className={`${styles.linkBtn} ${styles.linkAmber}`}>
                                View all <ArrowRight size={12} />
                            </button>
                        </div>

                        {OFFERS.map((o, i) => (
                            <div key={i} className={styles.offerRow}>
                                <div className={styles.offerIcon} style={{ background: o.light }}>
                                    <Gift size={16} color={o.color} />
                                </div>
                                <div className={styles.offerInfo}>
                                    <div className={styles.offerTitleRow}>
                                        <span className={styles.offerTitle}>{o.title}</span>
                                        <span className={styles.badge} style={{ color: o.color, background: o.light }}>
                                            {o.badge}
                                        </span>
                                    </div>
                                    <p className={styles.offerDesc}>{o.desc}</p>
                                </div>
                                <button className={styles.claimBtn} style={{ background: o.color }}>
                                    Claim
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── ROW 2: Self Help + Services ── */}
                <div className={`${styles.row} ${styles.row3}`}>

                    {/* C. Self Help */}
                    <div className={`${styles.card} ${styles.cardPurple}`}>
                        <div className={styles.sectionHead} data-accent="purple">
                            <span className={styles.cardTitle}>Self Help</span>
                        </div>
                        <div className={styles.helpGrid}>
                            {SELF_HELP.map(({ title, desc, Icon, color, bg }, i) => (
                                <div key={i} className={styles.helpTile}>
                                    <div className={styles.helpIconBox} style={{ background: bg }}>
                                        <Icon size={15} color={color} />
                                    </div>
                                    <p className={styles.helpTitle}>{title}</p>
                                    <p className={styles.helpDesc}>{desc}</p>
                                    <div className={styles.helpOpen} style={{ color }}>
                                        Open <ChevronRight size={11} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* D. Services + Stats */}
                    <div className={`${styles.card} ${styles.cardGreen}`}>
                        <div className={styles.sectionHead} data-accent="green">
                            <span className={styles.cardTitle}>Services</span>
                            <button className={`${styles.linkBtn} ${styles.linkGreen}`}>
                                View all <ArrowRight size={12} />
                            </button>
                        </div>

                        {SERVICES.map(({ title, desc, Icon, color, bg }, i) => (
                            <div key={i} className={styles.svcRow}>
                                <div className={styles.svcIconBox} style={{ background: bg }}>
                                    <Icon size={16} color={color} />
                                </div>
                                <div className={styles.svcMeta}>
                                    <p className={styles.svcTitle}>{title}</p>
                                    <p className={styles.svcDesc}>{desc}</p>
                                </div>
                                <ChevronRight size={14} color="#d1d5db" />
                            </div>
                        ))}

                        <div className={styles.statsRow}>
                            {STATS.map((s, i) => (
                                <div key={i} className={styles.statBox} style={{ background: s.bg }}>
                                    <p className={styles.statValue} style={{ color: s.color }}>{s.value}</p>
                                    <p className={styles.statLabel}>{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}