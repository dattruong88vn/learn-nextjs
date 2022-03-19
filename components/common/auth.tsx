import { useAuth } from "hooks"
import { useRouter } from "next/dist/client/router"
import React, { ReactNode, useEffect } from "react"

interface AuthProps {
  children: ReactNode
}

export function Auth({ children }: AuthProps) {
  const router = useRouter()
  const { profile, error, firstLoading } = useAuth()

  useEffect(() => {
    if (!firstLoading && !profile?.username) router.push("/login")
  }, [router, profile, firstLoading])

  if (!profile?.username) return <div>Loadig ...</div>

  return <div>{children}</div>
}
