import dynamic from "next/dynamic"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import Header from "@/components/common/header"
import { MainLayout } from "@/components/layout"

// const Header = dynamic(() => import("@/components/common/header"), { ssr: false })

export interface AboutProps {}

export default function About(props: AboutProps) {
  const router = useRouter()
  console.log("about query: ", router.query)

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
    <div>
      <h1>About page</h1>
      <Header>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2873806,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

            window.hj=window.hj||function(){(hj.q=hj.q||[]).push(arguments)};
            hj('event', "demo_about");
          `,
          }}
        ></script>
      </Header>

      <ul>
        {postList.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={handleNextClick}>Next page</button>
    </div>
  )
}

About.Layout = MainLayout

// export async function getStaticProps() {
//   console.log("get static props")
//   return {
//     props: {},
//   }
// }
