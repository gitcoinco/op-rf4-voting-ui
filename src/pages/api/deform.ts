// Proxy requests to Deform API

import { IncomingMessage, ServerResponse } from "http";
import httpProxy from "http-proxy";

const DEFORM_API_URL = "https://api.deform.cc";

const proxy = httpProxy.createProxyServer();

export const config = { api: { bodyParser: false } };

export default function handler(req: IncomingMessage, res: ServerResponse) {
  req.url = req.url?.replace("/api/deform", "");

  return new Promise((resolve, reject) => {
    proxy.web(req, res, { target: DEFORM_API_URL, changeOrigin: true }, (err) =>
      err ? reject(err) : resolve({})
    );
  });
}
