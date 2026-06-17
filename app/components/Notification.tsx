"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()
  console.log("Notification message:", message, "type:", type)
  if (!message) return null

  const style: React.CSSProperties = {
    padding: "10px 16px",
    marginBottom: "10px",
    borderRadius: "4px",
    color: "white",
    backgroundColor: type === "success" ? "#16a34a" : "#dc2626",
  }

  return (
    <div className={`p-4 rounded-xl shadow-lg text-white border backdrop-blur-md transition-all duration-200
      ${
        type === "success"
          ? "bg-green-500/80 border-green-400/30"
          : "bg-red-500/80 border-red-400/30"
      }`}>
      {message}
    </div>
  )
}