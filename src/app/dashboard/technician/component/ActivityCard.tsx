"use client";

import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { ReactNode } from "react";

type StatusType = "completed" | "in-progress" | "pending";

interface ActivityItem {
    id: number;
    service: string;
    time: string;
    status: StatusType;
}

const statusMap: Record<
    StatusType,
    { color: string; bg: string; icon: ReactNode; label: string }
> = {
    completed: {
        color: "text-green-600",
        bg: "bg-green-100",
        icon: <CheckCircle size={14} />,
        label: "Completed",
    },
    "in-progress": {
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        icon: <Clock size={14} />,
        label: "In Progress",
    },
    pending: {
        color: "text-red-600",
        bg: "bg-red-100",
        icon: <AlertCircle size={14} />,
        label: "Pending",
    },
};

const ActivityCard = ({ data }: { data: ActivityItem[] }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

            {/* Header */}
            <h2 className="text-lg font-semibold mb-4">Today's Activity</h2>

            {/* Table Header */}
            <div className="grid grid-cols-3 text-sm text-gray-500 font-medium border-b pb-2 mb-3">
                <span>Service</span>
                <span>Time Log</span>
                <span className="text-right">Status</span>
            </div>

            {/* Rows */}
            <div className="space-y-3">
                {data.map((item) => {
                    const status = statusMap[item.status];

                    return (
                        <div
                            key={item.id}
                            className="grid grid-cols-3 items-center text-sm border-b last:border-none pb-3"
                        >
                            {/* Service */}
                            <div className="text-gray-700 font-medium">
                                {item.service}
                            </div>

                            {/* Time */}
                            <div className="text-gray-600">
                                {item.time}
                            </div>

                            {/* Status */}
                            <div className="flex justify-end">
                                <span
                                    className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${status.bg} ${status.color}`}
                                >
                                    {status.icon}
                                    {status.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default ActivityCard;