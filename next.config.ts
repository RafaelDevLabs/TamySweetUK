import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const remotePatterns: RemotePattern[] = [];
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (supabaseUrl) {
  const parsedUrl = new URL(supabaseUrl);

  remotePatterns.push({
    protocol: parsedUrl.protocol.replace(":", "") as RemotePattern["protocol"],
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    pathname: "/storage/v1/object/public/**",
  });
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    serverActions: {
      // The admin kitten wizard can upload up to 8 images (10 MB each),
      // so the default 1 MB Server Actions body limit is too small.
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns,
  },
};

export default nextConfig;
