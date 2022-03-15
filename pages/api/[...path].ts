// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import httpProxy from "http-proxy"
import Cookies from "cookies"

const proxy = httpProxy.createProxyServer()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise(resolve => {
    // convert cookies to header authorization
    const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== "development" })
    const accessToken  = cookies.get("access_token")
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`
    }
    
    // don't send cookies to API server
    req.headers.cookie = ""
    
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    })

    proxy.once('proxyRes', () => {
      resolve(true);
    })
  })
}
