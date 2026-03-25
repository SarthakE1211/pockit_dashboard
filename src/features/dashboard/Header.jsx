"use client";

import Image from "next/image";
import { Menu, Plus, Bell, User, Search, X } from "lucide-react";
import { useState } from "react";
import ProfileDrawer from "./ProfileDrawer";
import styles from "./styles/Header.module.css";

export default function Header() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Google Font */}
            {/* <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style> */}

            <header className={styles.root}>

                {/* ── Main bar ── */}
                <div className={styles.bar}>

                    {/* LEFT — menu + logo */}
                    <div className={styles.left}>
                        <button
                            className={styles.menuBtn}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>

                        <div className={styles.logoWrap}>
                            <Image
                                src="/logo.png"
                                alt="Pockit Engineers"
                                width={130}
                                height={36}
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        </div>
                    </div>

                    {/* SEARCH — desktop only */}
                    <div className={styles.searchWrap}>
                        <span className={styles.searchIcon}>
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search products or services..."
                            className={styles.searchInput}
                        />
                        <button className={styles.searchBtn} aria-label="Search">
                            <svg viewBox="64 64 896 896" fill="white" width="15" height="15">
                                <path d="M909.6 826.5L703.5 620.4a326.7 326.7 0 10-83.1 83.1l206.1 206.1a60 60 0 0084.9-84.9zM416 704a288 288 0 11288-288 288.3 288.3 0 01-288 288z" />
                            </svg>
                        </button>
                    </div>

                    {/* RIGHT — action buttons */}
                    <div className={styles.right}>

                        <button
                            className={`${styles.iconBtn} ${styles.iconBtnPrimary} ${styles.plusBtn}`}
                            aria-label="Create new"
                        >
                            <Plus size={17} />
                        </button>

                        <button className={styles.iconBtn} aria-label="Notifications">
                            <Bell size={17} />
                            <span className={styles.notifBadge} />
                        </button>

                        <button
                            className={`${styles.iconBtn} ${styles.iconBtnPrimary}`}
                            aria-label="Profile"
                            onClick={() => setOpenDrawer(true)}
                        >
                            <User size={17} />
                        </button>

                    </div>
                </div>

                {/* MOBILE SEARCH BAR — shown below header on small screens */}
                <div className={styles.mobileSearch}>
                    <div className={styles.mobileSearchInner}>
                        <input
                            type="text"
                            placeholder="Search products or services..."
                        />
                        <button aria-label="Search">
                            <svg viewBox="64 64 896 896" fill="white" width="15" height="15">
                                <path d="M909.6 826.5L703.5 620.4a326.7 326.7 0 10-83.1 83.1l206.1 206.1a60 60 0 0084.9-84.9zM416 704a288 288 0 11288-288 288.3 288.3 0 01-288 288z" />
                            </svg>
                        </button>
                    </div>
                </div>

            </header>

            {/* Profile Drawer */}
            <ProfileDrawer
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
            />
        </>
    );
}