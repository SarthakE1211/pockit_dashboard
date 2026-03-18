"use client";

// import { Card, CardContent } from "@/components/ui/card";

const summaryData = [
    { title: "Closed (Month)", value: 120 },
    { title: "Pending Orders", value: 24 },
    { title: "Unassigned", value: 8 },
    { title: ">48h Pending", value: 5 },
];

const tableData = [
    {
        date: "18 Mar 2026, 10:30 AM",
        category: "Electrical",
        assigned: "John",
        expected: "19 Mar 2026",
    },
    {
        date: "18 Mar 2026, 11:00 AM",
        category: "Plumbing",
        assigned: "Unassigned",
        expected: "20 Mar 2026",
    },
];

export default function BackendDashboard() {
    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

            {/* 🔹 Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
                {summaryData.map((item, index) => (
                    <div key={index} className="rounded-2xl shadow-sm">
                        <div className="p-4">
                            <p className="text-sm text-gray-500">{item.title}</p>
                            <h2 className="text-2xl font-bold">{item.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔹 Graph Section */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <h3 className="font-semibold mb-2">Orders by Category</h3>
                    <div className="h-40 flex items-center justify-center text-gray-400">
                        Chart Here
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <h3 className="font-semibold mb-2">Orders by Technician</h3>
                    <div className="h-40 flex items-center justify-center text-gray-400">
                        Chart Here
                    </div>
                </div>
            </div>

            {/* 🔹 Table */}
            <div className="bg-white p-4 rounded-2xl shadow-sm">
                <h3 className="font-semibold mb-4">Pending Orders</h3>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-500 text-sm border-b">
                            <th className="py-2">Order Date</th>
                            <th>Category</th>
                            <th>Assigned To</th>
                            <th>Expected Closure</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-2">{row.date}</td>
                                <td>{row.category}</td>
                                <td>{row.assigned}</td>
                                <td>{row.expected}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}