import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next"
import { useRouter } from "next/dist/client/router"
import * as React from "react"

export interface ParamsPageProps {}

export default function ParamsPage({}: ParamsPageProps) {
  const router = useRouter()

  return (
    <div>
      <h1>Params Page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ParamsPageProps> = async (
  context: GetServerSidePropsContext
) => {
  await new Promise((res) => setTimeout(res, 3000))

  return {
    props: {
      post: {},
    },
  }
}

// cache
//
/**
 * s-maxage=5 -->
 *    1. request 1st --> wait and cache.
 *    2. next request in 5s --> return cache
 *    3. next request over 5s --> wait and cache
 *    ...
 */

/**
 * s-maxage=5 + stale-while-revalidate
 *    1. request 1st --> wait and cache.
 *    2. next request in 5s --> return cache
 *    3. next request over 5s --> return old cache, then trigger new request and cache
 *    ...
 */

/**
 * s-maxage=5 + stale-while-revalidate=5
 *    1. request 1st --> wait and cache.
 *    2. next request in 5s --> return cache
 *    3. next request in 6-10s --> return old cache, then trigger new request and cache
 *    4. next request over 10s --> wait and cache
 */
