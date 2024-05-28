import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   urlImports: ['https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs'],
  // },
};

export default withPWA(nextConfig);
