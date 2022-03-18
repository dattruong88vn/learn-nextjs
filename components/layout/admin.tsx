import { LayoutProps } from "models"
import * as React from "react"
import Link from "next/link"
import { Auth } from "components/common"
import { useAuth } from "hooks"

export function AdminLayout({ children }: LayoutProps) {
  const { logout, profile } = useAuth()

  return (
    <Auth>
      <h1>Main Layout</h1>
      <div>Sidebar</div>

      <div>Profile: {JSON.stringify(profile)}</div>

      <div><button onClick={logout}>Logout</button></div>

      <Link passHref href='/'>
        <a>Home</a>
      </Link>
      <Link passHref href='/about'>
        <a>About</a>
      </Link>
      <div>{children}</div>
    </Auth>
  )
}
