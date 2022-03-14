import { LayoutProps } from "models"
import * as React from "react"
import Link from "next/link"

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <h1>Main Layout</h1>
      <Link passHref href='/'>
        <a>Home</a>
      </Link>
      <Link passHref href='/about'>
        <a>About</a>
      </Link>
      <div>{children}</div>
    </div>
  )
}