"use client";

import { useState } from "react";
import TechnicianMap from "./component/TechnicianMap";
import servicesData from "./data/servicesData.json";
import ServiceCard from "./component/ServiceCard";
import ActivityCard from "./component/ActivityCard";
import activityData from "./data/activityData.json";


type StatusType = "completed" | "in-progress" | "pending";

export interface ActivityItem {
    id: number;
    service: string;
    status: StatusType;
}

const TechnicianDashboard = () => {
    const [location, setLocation] = useState<string>("Fetching location...");

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

            {/* Header */}
            <h1 className="text-2xl font-semibold text-gray-800">
                Technician Dashboard
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                {servicesData.map((item) => (
                    <ServiceCard
                        key={item.id}
                        title={item.title}
                        value={item.value}
                        color={item.color}
                        bgColor={item.bgColor}
                        icon={item.icon}
                    />
                ))}
            </div>

            {/* Map */}
            <TechnicianMap />

            {/* Activity */}

            <ActivityCard data={activityData as ActivityItem[]} />

        </div>
    );
};

export default TechnicianDashboard;