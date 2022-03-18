import React, {useState} from "react"
import { authApi } from "api-client"
import { useAuth } from "hooks"
import { useRouter } from "next/dist/client/router"

type LoginPageProps = {}

export default function LoginPage({ }: LoginPageProps) {
  console.warn("Render {Login}")
  const router = useRouter();

  const { login, logout, profile } = useAuth({
    revalidateOnMount: false
  })

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await login();
      console.log("redirect to dashboard");
      router.push("/about");
    } catch (err) {
      console.log("failed to login", err)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await logout();
      console.log("Redirect to page login")
    } catch (err) {
      console.log("failed to logout", err)
    }
  }

  if (loading) return <div>Loading ...</div>

  return (
    <div>
      <h1>Login Page</h1>

      <div>Profile: {JSON.stringify(profile)}</div>

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => router.push("/about")}>Go to About</button>
    </div>
  )
}
