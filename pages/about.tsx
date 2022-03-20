import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import { AdminLayout } from "@/components/layout"
import { Box, Typography, Button } from "@mui/material"

export interface AboutProps {}
export default function About(props: AboutProps) {
  const router = useRouter()

  const [postList, setPostList] = useState<any[]>([])

  const page = router.query?.page

  useEffect(() => {
    ;(async () => {
      if (!page) return
      const response = await fetch(
        `https://5e6cf4f84e86f8001618c854.mockapi.io/post?page=${page}&limit=10`
      )
      const data = await response.json()
      setPostList(data)
    })()
  }, [page])

  const handleNextClick = () => {
    router.push(
      {
        pathname: "/about",
        query: {
          page: Number(page || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography component='h1' variant='h3' color='primary.main'>
        About page
      </Typography>

      <Button color='success' variant='contained'>
        Button
      </Button>

      <main>
        <ul>
          {postList.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>

        <button onClick={handleNextClick}>Next page</button>
      </main>
    </Box>
  )
}

About.Layout = AdminLayout
