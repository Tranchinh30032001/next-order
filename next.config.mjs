import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */


const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    webVitalsAttribution: ['FCP', 'TTFB'],
    serverActions: {
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(','),
    },
    serverComponentsExternalPackages: ['pino-pretty'],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'debug'],
          }
        : false,
  },
  swcMinify: true,
  images: {
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    loader: 'default',
    remotePatterns:
      process.env.ALLOWED_RESOURCES?.split(',').map((remote) => {
        return { hostname: remote };
      }) ?? [],

  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  poweredByHeader: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  }
};

export default withNextIntl(nextConfig);
