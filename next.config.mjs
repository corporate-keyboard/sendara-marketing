/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const platformPaths = [
      '/login',
      '/signin',
      '/signup',
      '/register',
      '/dashboard/:path*',
      '/onboarding/:path*',
      '/admin/:path*',
      '/settings/:path*',
      '/billing/:path*',
      '/campaigns/:path*',
      '/contacts/:path*',
      '/templates/:path*',
      '/listings/:path*',
      '/inbox/:path*',
      '/analytics/:path*',
      '/reports/:path*',
      '/usage/:path*',
    ];

    return platformPaths.map((source) => ({
      source,
      destination: `https://app.sendara.one${source.replace('/:path*', '')}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
