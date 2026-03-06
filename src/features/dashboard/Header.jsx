"use client";

import Image from "next/image";
import { Menu, Plus, Bell, User } from "lucide-react";
import { useState } from "react";
import ProfileDrawer from "./ProfileDrawer";

export default function Header() {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <header className="w-full ">
            <div className="flex items-center justify-between  px-6  bg-gradient-to-r from-[#5fa8ff] to-[#2c3ea8] shadow-lg">

                {/* LEFT */}
                <div className="flex items-center gap-4">
                    <Menu className="text-white cursor-pointer" />

                    <Image
                        src="/logo.png"
                        alt="Pockit Engineers"
                        width={150}
                        height={40}
                    />
                </div>

                {/* SEARCH */}
                <div className="flex items-center bg-white rounded-lg overflow-hidden w-[480px] shadow">

                    <select className="px-3 py-2 text-sm border-r outline-none text-gray-700">
                        <option>Products</option>
                        <option>Services</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search products or services..."
                        className="flex-1 px-3 py-2 text-sm outline-none"
                    />

                    <button className="bg-[#0b2a8f] px-4 py-3 flex items-center justify-center">
                        <svg
                            viewBox="64 64 896 896"
                            fill="white"
                            className="w-4 h-4"
                        >
                            <path d="M909.6 826.5L703.5 620.4a326.7 326.7 0 10-83.1 83.1l206.1 206.1a60 60 0 0084.9-84.9zM416 704a288 288 0 11288-288 288.3 288.3 0 01-288 288z"></path>
                        </svg>
                    </button>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                    <button className="bg-[#0b2a8f] p-3 rounded-full text-white shadow-lg hover:scale-105 transition cursor-pointer">
                        <Plus size={18} />
                    </button>

                    <button className="bg-[#0b2a8f] p-3 rounded-full text-white shadow-lg hover:scale-105 transition cursor-pointer">
                        <Bell size={18} />
                    </button>

                    <button
                        className="bg-[#0b2a8f] p-3 rounded-full text-white shadow-lg hover:scale-105 transition cursor-pointer"
                        onClick={() => setOpenDrawer(true)}
                    >
                        <User size={18} />
                    </button>

                </div>
            </div>

            {/* Drawer */}
            <ProfileDrawer
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
            />
        </header>
    );
}