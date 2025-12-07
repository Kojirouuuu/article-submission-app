import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  output: "standalone", // 本番環境用にファイルを必要最小限にまとめてくれる
};

export default nextConfig;
