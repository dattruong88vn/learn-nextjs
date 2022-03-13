import { GetStaticProps, GetStaticPropsContext } from "next"
import * as React from "react"
import Link from "next/link"

export interface PostListPageProps {
  posts: any[]
}

export default function PostListPage({ posts }: PostListPageProps) {
  return (
    <div>
      <h1>Post List Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`posts/${post.id}`} passHref>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
  context: GetStaticPropsContext
) => {
  // server-side
  // on build time
  // run on every request in dev mode
  // cannot use with getServerSideProps
  const response = await fetch("https://5e6cf4f84e86f8001618c854.mockapi.io/post?page=1&limit=10")
  const data = await response.json()

  return {
    props: {
      posts: data.map((x: any) => ({ id: x.id, title: x.title })),
    },
  }
}
