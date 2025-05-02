/** @type {import('next').NextConfig} */

import NextFederationPlugin from "@module-federation/nextjs-mf";

const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "github-coffee-api",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./index": "./pages/index.tsx",
        },
        // shared: createSharedDependencies(),
      })
    );
    return config;
  },
  eslint: {
    dirs: ["."], //or ['pages', 'hooks']
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
