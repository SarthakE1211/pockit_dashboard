"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

export default function TechnicianBarChart({ data }: any) {
    return (
        <div className="bg-white p-3 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold mb-2">
                Service Performance by Technician
            </h3>

            <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        barGap={4}
                        barCategoryGap="20%"
                    >
                        <XAxis
                            dataKey="name"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip />

                        <Legend wrapperStyle={{ fontSize: "10px" }} />

                        {/* 🟢 Within TAT */}
                        <Bar
                            dataKey="withinTAT"
                            fill="#10B981"
                            radius={[4, 4, 0, 0]}
                            name="Within TAT"
                        />

                        {/* 🟡 Outside TAT */}
                        <Bar
                            dataKey="outsideTAT"
                            fill="#F59E0B"
                            radius={[4, 4, 0, 0]}
                            name="Outside TAT"
                        />

                        {/* 🔴 Pending */}
                        <Bar
                            dataKey="pending"
                            fill="#EF4444"
                            radius={[4, 4, 0, 0]}
                            name="Pending"
                        />
                        <Bar
                            dataKey="total"
                            fill="#3B82F6" // blue
                            radius={[4, 4, 0, 0]}
                            name="Total"
                        />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}