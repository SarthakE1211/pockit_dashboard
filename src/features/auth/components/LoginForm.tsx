"use client";


import Image from "next/image";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import UserLogin from "../api/login";


export default function LoginPage() {
    const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("handleSubmit called",username,password);
   const backendUrl = process.env.BACKEND_API_URL;
console.log("BACKEND_API_URL:", backendUrl);
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/dashboard");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a8c8d8] to-[#c9dbe6] p-4">

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 bg-gray-300 p-6 sm:p-8 flex flex-col">

          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="Pockit Engineers"
              width={120}
              height={35}
              priority
            />
          </div>

          {/* Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/cloud.png"
              alt="Cloud Security"
              width={260}
              height={260}
              className="object-contain sm:w-[280px]"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
            Welcome to Pockit
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                placeholder="Enter your username"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/auth/forgotpassword"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full cursor-pointer py-2.5 rounded-md text-white text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 transition"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}