"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function CategoryPieChart({ data, colors }: any) {
    return (
        <div className="bg-white p-3 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold mb-2">Orders by Category</h3>

            <div className="flex items-center justify-between">

                <div className="h-52 w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={70}
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-1/2 pl-4 space-y-3">
                    {data.map((item: any, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            />
                            <span className="text-sm text-gray-700">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}