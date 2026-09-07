import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  experimental: { serverActions: { bodySizeLimit: "12mb" } },
};

export default nextConfig;
