"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [username,setUsername]=useState("")

    const handleForgotpassword=()=>{

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a8c8d8] to-[#c9dbe6] p-4">

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 sm:p-10">

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.png"
            alt="Pockit Engineers"
            width={120}
            height={35}
            priority
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-2">
          Forgot Password?
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6 px-10">
          Enter your username and we’ll send you a new password.
        </p>

        {/* Form */}
        <form onSubmit={handleForgotpassword} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Enter username
            </label>
            <input
              type="text"
              required
              placeholder="Enter your username"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer py-2.5 rounded-md text-white text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 transition"
          >
            Forgot password
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="text-blue-600 text-sm hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}