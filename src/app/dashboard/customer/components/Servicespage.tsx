"use client";

import { useState } from "react";
import {
    Plus, Search, Filter, ChevronLeft, ChevronRight,
    Wrench, Activity, LifeBuoy, CheckCircle2,
    Clock, AlertTriangle, Eye, Pencil,
} from "lucide-react";
import styles from "../styles/Servicespage.module.css";

const SERVICES = [
    { id: "#SV-1021", type: "AC Repair", customer: "Rahul Sharma", tech: "John", date: "Mar 20", status: "In Progress", priority: "High" },
    { id: "#SV-1020", type: "CCTV Install", customer: "Priya Mehta", tech: "Sara", date: "Mar 19", status: "Completed", priority: "Medium" },
    { id: "#SV-1019", type: "Server Setup", customer: "Amit Joshi", tech: "Sarthak", date: "Mar 18", status: "Pending", priority: "High" },
    { id: "#SV-1018", type: "MacBook Repair", customer: "Neha Singh", tech: "Karan", date: "Mar 18", status: "Completed", priority: "Low" },
    { id: "#SV-1017", type: "Plumbing", customer: "Vikram Das", tech: "—", date: "Mar 17", status: "Unassigned", priority: "Medium" },
    { id: "#SV-1016", type: "Electrical", customer: "Sunita Roy", tech: "SK", date: "Mar 16", status: "Delayed", priority: "High" },
    { id: "#SV-1015", type: "Cleaning", customer: "Deepak Kumar", tech: "John", date: "Mar 15", status: "Completed", priority: "Low" },
    { id: "#SV-1014", type: "TeskTop Repair", customer: "Kavya Nair", tech: "Sara", date: "Mar 14", status: "In Progress", priority: "Medium" },
];

const STATUS_STYLES = {
    "In Progress": { color: "#2563eb", bg: "#eff6ff", dot: "#2563eb" },
    "Completed": { color: "#16a34a", bg: "#f0fdf4", dot: "#16a34a" },
    "Pending": { color: "#d97706", bg: "#fffbeb", dot: "#d97706" },
    "Unassigned": { color: "#6b7280", bg: "#f3f4f6", dot: "#9ca3af" },
    "Delayed": { color: "#dc2626", bg: "#fff5f5", dot: "#dc2626" },
};

const PRIORITY_COLORS = {
    High: "#dc2626",
    Medium: "#d97706",
    Low: "#16a34a",
};

const initials = (name) => name === "—" ? "—" : name.split(" ").map(n => n[0]).join("").slice(0, 2);

export default function ServicesPage({ onCreateNew, onView }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = SERVICES.filter(s => {
        const matchSearch = s.type.toLowerCase().includes(search.toLowerCase()) ||
            s.customer.toLowerCase().includes(search.toLowerCase()) ||
            s.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "All" || s.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const stats = [
        { label: "Total Services", value: SERVICES.length, color: "#111827", bg: "#fff", icon: Wrench },
        { label: "In Progress", value: 2, color: "#2563eb", bg: "#eff6ff", icon: Activity },
        { label: "Completed", value: 3, color: "#16a34a", bg: "#f0fdf4", icon: CheckCircle2 },
        { label: "Delayed", value: 1, color: "#dc2626", bg: "#fff5f5", icon: AlertTriangle },
    ];

    return (
        <div className={styles.root}>
            <div className={styles.page}>

                {/* Header */}
                <div className={`${styles.pageHeader} ${styles.f} ${styles.f1}`}>
                    <div>
                        <p className={styles.pageSubtitle}>Manage all</p>
                        <h1 className={styles.pageTitle}>Services</h1>
                    </div>
                    <button className={styles.createBtn} onClick={onCreateNew}>
                        <Plus size={15} /> New Service
                    </button>
                </div>

                {/* Stats */}
                <div className={`${styles.statsStrip} ${styles.f} ${styles.f2}`}>
                    {stats.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} className={styles.statCard} style={{ background: s.bg }}>
                                <div className={styles.statLabel}>{s.label}</div>
                                <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Filter bar */}
                <div className={`${styles.filterBar} ${styles.f} ${styles.f2}`}>
                    <div className={styles.searchBox}>
                        <Search size={14} color="#9ca3af" />
                        <input
                            placeholder="Search by ID, type or customer..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className={styles.filterSelect}
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        {["All", "In Progress", "Completed", "Pending", "Unassigned", "Delayed"].map(s => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <div className={`${styles.tableCard} ${styles.f} ${styles.f3}`}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                {["Service ID", "Type", "Customer", "Technician", "Date", "Priority", "Status", "Actions"].map(h => (
                                    <th key={h}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((row, i) => {
                                const st = STATUS_STYLES[row.status];
                                return (
                                    <tr key={i}>
                                        <td className={styles.idCell}>{row.id}</td>
                                        <td>{row.type}</td>
                                        <td>{row.customer}</td>
                                        <td>
                                            <div className={styles.avatarCell}>
                                                <div className={styles.avatar}>{initials(row.tech)}</div>
                                                {row.tech}
                                            </div>
                                        </td>
                                        <td>{row.date}</td>
                                        <td>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: PRIORITY_COLORS[row.priority] }}>
                                                {row.priority}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.statusBadge} style={{ color: st.color, background: st.bg }}>
                                                <span className={styles.dot} style={{ background: st.dot }} />
                                                {row.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`} onClick={() => onView && onView(row)}>
                                                <Eye size={12} style={{ marginRight: 4 }} />View
                                            </button>
                                            <button className={styles.actionBtn}>
                                                <Pencil size={12} style={{ marginRight: 4 }} />Edit
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className={styles.pagination}>
                        <span className={styles.paginationInfo}>
                            Showing {filtered.length} of {SERVICES.length} services
                        </span>
                        <div className={styles.paginationBtns}>
                            <button className={styles.pageBtn}><ChevronLeft size={13} /></button>
                            {[1, 2, 3].map(n => (
                                <button
                                    key={n}
                                    className={`${styles.pageBtn} ${currentPage === n ? styles.pageBtnActive : ""}`}
                                    onClick={() => setCurrentPage(n)}
                                >{n}</button>
                            ))}
                            <button className={styles.pageBtn}><ChevronRight size={13} /></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}