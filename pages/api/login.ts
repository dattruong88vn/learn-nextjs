// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import httpProxy, { ProxyResCallback } from "http-proxy"
import Cookies from "cookies"

const proxy = httpProxy.createProxyServer()

type Data = {
  message: string
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "method not supported" })
  }

  return new Promise((resolve) => {
    // don't send cookies to API server
    req.headers.cookie = ""

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = ""
      proxyRes.on("data", function (chunk) {
        body += chunk
      })

      proxyRes.on("end", function () {
        try {
          const { accessToken, expiredAt } = JSON.parse(body)

          // convert token to cookies
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== "development" });
          cookies.set("access_token", accessToken, {
              httpOnly: true,
              sameSite: "lax",
              expires: new Date(expiredAt)
          })

          ;(res as NextApiResponse).status(200).json({ message: "Success" })
        } catch (err) {
          ;(res as NextApiResponse).status(500).json({ message: "Something went wrong" })
        }

        resolve(true);
      })
    }

    proxy.once("proxyRes", handleLoginResponse)

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    })
  })
}
