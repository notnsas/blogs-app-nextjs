"use client"

import Link from "next/link"
import { registerUser } from "../actions/users"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/dist/client/components/navigation"
import { useNotification } from "@/app/components/NotificationContext"


export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { 
    error: "",
    success: false,
    values: { username: "", name: "", password: "", passwordConfirm: "" } })
  const { showNotification } = useNotification()
  const router = useRouter()
  console.log("state", state)
  useEffect(() => {
    
    if (state.success) {
      showNotification("User registered", "success")
      router.push("/login")
    } else if (state.error) {
      showNotification(state.error, "error")
    }
  }, [state, showNotification, router])
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          {/* {state.error && <p style={{ color: "red" }}>{state.error}</p>} */}
          <label>
            Username
            <input type="text" name="username" defaultValue={state.values?.username} required />
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" defaultValue={state.values?.name} required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" defaultValue={state.values?.password} required />
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" defaultValue={state.values?.passwordConfirm} required />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}