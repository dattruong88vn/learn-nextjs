import React from "react"
import { authApi } from "api-client"
import { useAuth } from "hooks"

type LoginPageProps = {}

export default function LoginPage({ }: LoginPageProps) {
  console.warn("Render {Login}")
  const { login, logout, profile } = useAuth({
    revalidateOnMount: false
  })

  async function handleLogin() {
    try {
      await login();
      console.log("redirect to dashboard");
    } catch (err) {
      console.log("failed to login", err)
    }
  }

  // async function hanldeGetProfile() {
  //   try {
  //     await authApi.getProfile()
  //   } catch (err) {
  //     console.log("failed to getprofile", err)
  //   }
  // }

  async function handleLogout() {
    try {
      await logout();
      console.log("Redirect to page login")
    } catch (err) {
      console.log("failed to logout", err)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <div>Profile: {JSON.stringify(profile)}</div>

      <button onClick={handleLogin}>Login</button>
      {/* <button onClick={hanldeGetProfile}>Get Profile</button> */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
