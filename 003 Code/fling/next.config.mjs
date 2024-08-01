import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};

export default withPWA(nextConfig);
