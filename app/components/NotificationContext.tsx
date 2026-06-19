"use client"

import { createContext, useContext, useState } from "react"

type NotificationType = "success" | "error"

type NotificationContextType = {
  message: string
  type: NotificationType
  dataTestId: string
  showNotification: (message: string, type?: NotificationType, dataTestId?: string) => void
}

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  dataTestId: "",
  showNotification: () => {},
})

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [message, setMessage] = useState("")
  const [type, setType] = useState<NotificationType>("success")
  const [dataTestId, setDataTestId] = useState<string>("")
  const showNotification = (
    msg: string,
    notifType: NotificationType = "success",
    dataTestId: string = ""
  ) => {
    setMessage(msg)
    setType(notifType)
    setDataTestId(dataTestId)
    setTimeout(() => setMessage(""), 5000)
  }

  return (
    <NotificationContext value={{ message, type, dataTestId, showNotification }}>
      {children}
    </NotificationContext>
  )
}

export const useNotification = () => useContext(NotificationContext)