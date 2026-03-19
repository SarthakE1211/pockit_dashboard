"use client";

import { useEffect, useState } from "react";

const TechnicianLocationCard = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [address, setAddress] = useState<string>("Fetching location...");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!navigator.geolocation) {
            setAddress("Geolocation not supported");
            setLoading(false);
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                setPosition([lat, lng]);

                try {
                    const res = await fetch(
                        `https://api-bdc.io/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
                    );
                    const data = await res.json();

                    setAddress(
                        `${data.city || data.locality || "Unknown"}, ${data.principalSubdivision || ""
                        }`
                    );
                } catch {
                    setAddress("Location detected");
                }

                setLoading(false);
            },
            () => {
                setAddress("Unable to fetch location");
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">

            {/* Left Section */}
            <div>
                <p className="text-sm text-gray-500">Current Location</p>

                <p className="text-lg font-semibold text-gray-800 mt-1">
                    {loading ? "Fetching..." : address}
                </p>
            </div>

            {/* Right Section */}
            {position && (
                <a
                    href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                >
                    View Map
                </a>
            )}
        </div>
    );
};

export default TechnicianLocationCard;