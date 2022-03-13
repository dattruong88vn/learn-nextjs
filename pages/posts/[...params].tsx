import { useRouter } from "next/dist/client/router"
import * as React from "react"

export interface ParamsDetailPageProps {}

export default function ParamsDetailPage(props: ParamsDetailPageProps) {
  const router = useRouter()

  return (
    <div>
      <h1>Params Detail Page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  )
}
