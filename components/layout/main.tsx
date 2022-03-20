import { Box, Stack } from "@mui/material"
import { Footer, Header } from "components/common"
import { LayoutProps } from "models"
import Link from "next/link"
import * as React from "react"

export function MainLayout({ children }: LayoutProps) {
  return (
    <Stack minHeight='100vh'>
      <Header />

      <Box flexGrow={1}>
        <Link passHref href='/'>
          <a>Home</a>
        </Link>
        <Link passHref href='/blogs'>
          <a>Blogs</a>
        </Link>
        <Link passHref href='/works'>
          <a>Works</a>
        </Link>
        {children}
      </Box>

      <Footer />
    </Stack>
  )
}
