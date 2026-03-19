"use client";

export default function PendingOrdersTable({ data }: any) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

            {/* Header */}
            <div className="px-4 py-3 border-b flex justify-between">
                <h3 className="text-base font-semibold text-gray-800">
                    Pending Service Orders
                </h3>
                <span className="text-xs text-gray-400">
                    {data.length} Orders
                </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">

                    {/* Table Head */}
                    <thead>
                        <tr className="text-xs text-gray-400 uppercase border-b">
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-left">Customer</th>
                            <th className="px-6 py-3 text-left">Location</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Assigned</th>
                            <th className="px-6 py-3 text-left">Expected</th>
                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50">

                                {/* Date */}
                                <td className="px-6 py-2">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800">
                                            {row.date.split(",")[0]}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {row.date.split(",")[1]}
                                        </span>
                                    </div>
                                </td>

                                {/* Customer Name */}
                                <td className="px-6 py-3 text-sm text-gray-800">
                                    {row.customerName || "-"}
                                </td>

                                {/* Location */}
                                <td className="px-6 py-3 text-sm text-gray-600">
                                    {row.location || "-"}
                                </td>

                                {/* Category */}
                                <td className="px-6 py-3">
                                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                                        {row.category}
                                    </span>
                                </td>

                                {/* Assigned */}
                                <td className="px-6 py-3  text-sm">
                                    <span className={
                                        row.assigned === "Unassigned"
                                            ? "text-red-500 font-medium"
                                            : "text-gray-700"
                                    }>
                                        {row.assigned}
                                    </span>
                                </td>

                                {/* Expected */}
                                <td className="px-6 py-3 text-gray-600 text-sm">
                                    {row.expected}
                                </td>

                                {/* Action */}
                                <td className="px-6 py-3">
                                    <button
                                        className="text-xs px-3 py-1.5 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
                                        onClick={() => console.log("Assign clicked", row)}
                                    >
                                        Assign / Update
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}