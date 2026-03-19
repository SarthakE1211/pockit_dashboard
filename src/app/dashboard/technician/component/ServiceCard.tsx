"use client";

import { CheckCircle, Clock } from "lucide-react";
import { ReactNode } from "react";

type IconType = "closed" | "pending";

interface ServiceCardProps {
    title: string;
    value: number | string;
    color: string;
    bgColor: string;
    icon: IconType;
}

const iconMap: Record<IconType, ReactNode> = {
    closed: <CheckCircle size={20} />,
    pending: <Clock size={20} />,
};

const ServiceCard = ({
    title,
    value,
    color,
    bgColor,
    icon,
}: ServiceCardProps) => {
    return (
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm px-5 py-4 border border-gray-100 hover:shadow-md transition duration-300">

            {/* Left Section */}
            <div className="flex items-center gap-4">

                {/* Value */}
                <p className={`text-3xl font-bold ${color}`}>
                    {value}
                </p>

                {/* Title */}
                <h2 className="text-sm text-gray-600 leading-tight">
                    {title}
                </h2>
            </div>

            {/* Right Icon */}
            <div className={`${bgColor} ${color} p-2 rounded-full`}>
                {iconMap[icon]}
            </div>

        </div>
    );
};

export default ServiceCard;