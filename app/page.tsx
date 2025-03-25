"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Home() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    setTimeout(() => {
      if (employeeId === "emp123" && password === "1234") {
        setStatus("success");
      } else {
        setStatus("error");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-yellow-50 to-gray-100">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:py-0 min-h-screen">

        <motion.div
          initial={{ opacity: 0, y: -50, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your credentials</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer py-3 rounded-lg font-semibold text-white transition duration-300 ${
                status === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-yellow-400 hover:bg-yellow-500"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Please wait...
                </span>
              ) : status === "success" ? (
                "Welcome to Training"
              ) : status === "error" ? (
                "Check your credentials"
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="hidden md:flex items-center justify-center w-full md:w-1/2 relative overflow-hidden rounded-l-3xl"
      >
        <Image
          src="/login.png"
          alt="Login Banner"
          width={800}
          height={100}
          priority
          className="object-cover rounded-l-3xl transition-all duration-700 h-[95%] w-full"
        />
      </motion.div>
    </div>
  );
}
