import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@google/generative-ai"],
  // Next.js 16 はデフォルトで Turbopack。webpack だけあるとエラーになるので空の turbopack を指定
  turbopack: {},
  webpack: (config, { dir }) => {
    // dir = Next のプロジェクトルート。親の dev ではなくこのプロジェクトの node_modules から解決する
    config.context = dir;
    config.resolve = config.resolve ?? {};
    config.resolve.modules = [
      path.join(dir, "node_modules"),
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"]),
    ];
    return config;
  },
};

export default nextConfig;
