"use client";

import { useState } from "react";
import SummaryCards from "./components/SummaryCards";
import CategoryPieChart from "./components/CategoryPieChart";
import TechnicianBarChart from "./components/TechnicianBarChart";
import PendingOrdersTable from "./components/PendingOrdersTable";

const categoryData = [
    { name: "Server Setup", value: 40, fill: "#3B82F6" },
    { name: "MacBook", value: 30, fill: "#10B981" },
    { name: "TeskTop", value: 20, fill: "#F59E0B" },
    { name: "CCTV", value: 10, fill: "#EF4444" },
    { name: "Imac", value: 15, fill: "#8B5CF6" },
];
const technicianData = [
    {
        name: "John",
        withinTAT: 10,
        outsideTAT: 3,
        pending: 7,
        total: 20, // 👈 add this

    },
    {
        name: "Sara",
        withinTAT: 15,
        outsideTAT: 5,
        pending: 5,
        total: 25, // 👈 add this

    },
    {
        name: "Sarthak",
        withinTAT: 1,
        outsideTAT: 10,
        pending: 5,
        total: 16,
    }, {
        name: "karan",
        withinTAT: 9,
        outsideTAT: 7,
        pending: 12,
        total: 28,

    },
    {
        name: "sk",
        withinTAT: 6,
        outsideTAT: 5,
        pending: 10,
        total: 21,
    },

];
const summaryCards = [
    {
        title: "Services Closed",
        value: 128,
        subtitle: "This Month",
        icon: "✅",
        bg: "bg-green-50",
        iconBg: "bg-green-100",
        text: "text-green-600",
    },
    {
        title: "Pending Orders",
        value: 34,
        subtitle: "Awaiting Service",
        icon: "⏳",
        bg: "bg-yellow-50",
        iconBg: "bg-yellow-100",
        text: "text-yellow-600",
    },
    {
        title: "Unassigned Orders",
        value: 12,
        subtitle: "No Technician",
        icon: "👤",
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        text: "text-blue-600",
    },
    {
        title: "Delayed Orders",
        value: 7,
        subtitle: "> 48 Hours",
        icon: "⚠️",
        bg: "bg-red-50",
        iconBg: "bg-red-100",
        text: "text-red-600",
    },
];
const tableData = [
    {
        date: "18 Mar 2026, 10:30 AM",
        category: "CCTV",
        assigned: "John",
        expected: "19 Mar 2026",
        customerName: "Rahul Sharma",
        location: "Pune"
    },
    {
        date: "18 Mar 2026, 11:00 AM",
        category: "MAC",
        assigned: "Unassigned",
        expected: "20 Mar 2026",
        customerName: "Priya Mehta",
        location: "Mumbai"
    },
    {
        date: "17 Mar 2026, 02:15 PM",
        category: "Server Setup",
        assigned: "Sara",
        expected: "18 Mar 2026",
        customerName: "Amit Verma",
        location: "Bangalore"
    },
    {
        date: "16 Mar 2026, 09:45 AM",
        category: "Desktop",
        assigned: "Mike",
        expected: "17 Mar 2026",
        customerName: "Neha Joshi",
        location: "Pune"
    },
    {
        date: "15 Mar 2026, 01:20 PM",
        category: "Imac",
        assigned: "Sarthak",
        expected: "16 Mar 2026",
        customerName: "Karan Patel",
        location: "Ahmedabad"
    }
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];
const PIECOLORS = ["#4F46E5", "#F59E0B", "#EF4444", "#06B6D4", "#22C55E"];


const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function BackendDashboard() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    return (
        <div className="p-4 space-y-4 bg-gray-100 min-h-screen">

            <SummaryCards data={summaryCards} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CategoryPieChart data={categoryData} colors={PIECOLORS} />
                <TechnicianBarChart data={technicianData} />
            </div>

            <PendingOrdersTable data={tableData} />

        </div >
    );
}