import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'd12zq4w4guyljn.cloudfront.net',
      'firebasestorage.googleapis.com',
      's3.ap-northeast-2.amazonaws.com',
    ],
  },
};

export default withPWA(nextConfig);
