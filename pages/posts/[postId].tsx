import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { useRouter } from "next/dist/client/router"
import * as React from "react"

export interface PostDetailPageProps {
  post: any
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <div style={{ fontSize: "2rem", textAlign: "center" }}>Loading...</div>
  }

  if (!post) return null

  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("https://5e6cf4f84e86f8001618c854.mockapi.io/post?page=1&limit=10")
  const data = await response.json()

  return {
    paths: data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: true,
    /**
     * fallback:
     *  - false -> not found
     *  - true -> loading
     *  - block -> without loading
     */
  }
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  const postId = context.params?.postId

  if (!postId) {
    return {
      notFound: true,
    }
  }
  // server-side
  // on build time
  // run on every request in dev mode
  // cannot use with getServerSideProps
  const response = await fetch(`https://5e6cf4f84e86f8001618c854.mockapi.io//post/${postId}`)
  const data = await response.json()

  console.log(data)

  return {
    props: {
      post: data,
    },
    revalidate: 5,
  }
}
