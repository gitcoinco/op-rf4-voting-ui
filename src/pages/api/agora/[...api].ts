// Proxy requests to Agora API

import { IncomingMessage, ServerResponse } from "http";
import httpProxy from "http-proxy";

const AGORA_API_URL = process.env.AGORA_API_URL;
const AGORA_API_KEY = process.env.AGORA_API_KEY;

const proxy = httpProxy.createProxyServer();

proxy.on("proxyReq", function (req) {
  const { authorization } = req.getHeaders();
  req.setHeader("Authorization", authorization ?? `Bearer ${AGORA_API_KEY}`);
});

export const config = { api: { bodyParser: false } };

export default function handler(req: IncomingMessage, res: ServerResponse) {
  req.url = req.url?.replace("/api/agora", "");

  return new Promise((resolve, reject) => {
    proxy.web(req, res, { target: AGORA_API_URL, changeOrigin: true }, (err) =>
      err ? reject(err) : resolve({})
    );
  });
}
