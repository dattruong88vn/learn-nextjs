import { useRouter } from "next/dist/client/router"
import React from "react"

export interface AboutProps {}

export default function About(props: AboutProps) {
  const router = useRouter()
  console.log("about query: ", router.query)
  return <div>About page</div>
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}
