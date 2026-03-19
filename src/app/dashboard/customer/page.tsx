"use client";

import {
    Gift,
    LifeBuoy,
    Wrench,
    Clock,
    ArrowRight,
    Bell,
    User,
} from "lucide-react";

const CustomerDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Top Navbar */}
            {/* <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-800">Pockit</h1>

                <div className="flex items-center gap-4">
                    <Bell className="text-gray-500 cursor-pointer" />
                    <div className="flex items-center gap-2 cursor-pointer">
                        <User className="text-gray-600" />
                        <span className="text-sm text-gray-700">Customer</span>
                    </div>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="p-6">

                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 mb-8 text-white shadow">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome back 👋
                        </h1>
                        <p className="opacity-90 mb-4">
                            Manage your services & track activity easily
                        </p>
                        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition">
                            Book a Service
                        </button>
                    </div>

                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 blur-3xl rounded-full"></div>
                </div>

                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* Activity */}
                    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition">
                        <Clock className="text-blue-500 mb-3" />
                        <h2 className="font-semibold text-lg text-gray-800">
                            Last Activity
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Service completed on March 12
                        </p>
                    </div>

                    {/* Offers */}
                    <div className="bg-gradient-to-br from-pink-500 to-purple-500 text-white p-5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition">
                        <Gift className="mb-3" />
                        <h2 className="font-semibold text-lg">
                            Special Offer 🎉
                        </h2>
                        <p className="text-sm opacity-90">
                            Get 20% off on your next booking
                        </p>

                        <span className="inline-block mt-3 text-xs bg-white/20 px-2 py-1 rounded">
                            Limited Time
                        </span>
                    </div>

                    {/* Help */}
                    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition">
                        <LifeBuoy className="text-purple-500 mb-3" />
                        <h2 className="font-semibold text-lg text-gray-800">
                            Need Help?
                        </h2>
                        <p className="text-sm text-gray-500 mb-3">
                            Solve issues instantly
                        </p>
                        <button className="flex items-center gap-1 text-sm text-purple-600 font-medium">
                            Explore <ArrowRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Services */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Quick Services
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            {
                                title: "Book Service",
                                desc: "Schedule technician visit",
                                color: "from-blue-500 to-indigo-500",
                            },
                            {
                                title: "Track Request",
                                desc: "Check live status",
                                color: "from-green-500 to-emerald-500",
                            },
                            {
                                title: "Raise Complaint",
                                desc: "Report an issue",
                                color: "from-red-500 to-pink-500",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`p-5 rounded-2xl text-white bg-gradient-to-br ${item.color} shadow hover:shadow-lg hover:scale-105 transition cursor-pointer`}
                            >
                                <h3 className="font-semibold text-lg">
                                    {item.title}
                                </h3>
                                <p className="text-sm opacity-90">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Recent Activity
                    </h2>

                    <div className="space-y-4">
                        {[
                            "Service booked",
                            "Technician assigned",
                            "Issue resolved",
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <p className="text-sm text-gray-600">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CustomerDashboard;