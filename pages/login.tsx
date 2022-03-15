import React from "react"
import { authApi } from "api-client"

type LoginPageProps = {}

export default function LoginPage({}: LoginPageProps) {
  async function hanldeLogin() {
    try {
      await authApi.login({
        username: "thanhdat",
        password: "123456",
      })
    } catch (err) {
      console.log("failed to login", err)
    }
  }

  async function hanldeGetProfile() {
    try {
      await authApi.getProfile()
    } catch (err) {
      console.log("failed to getprofile", err)
    }
  }

  async function hanldeLogout() {
    try {
      await authApi.logout()
    } catch (err) {
      console.log("failed to logout", err)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={hanldeLogin}>Login</button>
      <button onClick={hanldeGetProfile}>Get Profile</button>
      <button onClick={hanldeLogout}>Logout</button>
    </div>
  )
}
