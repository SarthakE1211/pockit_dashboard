"use client";

type Card = {
    title: string;
    value: number;
    subtitle: string;
    icon: string;
    bg: string;
    iconBg: string;
    text: string;
};

export default function SummaryCards({ data }: { data: Card[] }) {
    return (
        <div>
            <h1 className="mb-2 text-lg bold">Service DashBoard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {data.map((card, index) => (
                    <div
                        key={index}
                        className={`rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition ${card.bg}`}
                    >

                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-600">
                                {card.title}
                            </p>

                            <div className={`w-9 h-9 flex items-center justify-center rounded-full ${card.iconBg}`}>
                                <span className="text-lg">{card.icon}</span>
                            </div>
                        </div>

                        <h2 className={`text-2xl font-bold mt-3 ${card.text}`}>
                            {card.value}
                        </h2>

                        <p className="text-xs text-gray-500 mt-1">
                            {card.subtitle}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}