import type { NextConfig } from "next";
import withVercelToolbar from "@vercel/toolbar/plugins/next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withVercelToolbar()(nextConfig);
