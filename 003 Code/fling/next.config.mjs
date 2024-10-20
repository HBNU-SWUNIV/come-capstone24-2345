import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "d12zq4w4guyljn.cloudfront.net",
      "firebasestorage.googleapis.com",
      "s3.ap-northeast-2.amazonaws.com",
    ],
  },
  webpack(config) {
    config.experiments.asyncWebAssembly = true;
    return config;
  },
  // webpack: (config, { isServer }) => {
  //   // WebAssembly 지원 활성화
  //   config.experiments = {
  //     asyncWebAssembly: true, // WebAssembly 비동기 지원 활성화
  //   };

  //   // .wasm 파일을 처리할 수 있도록 규칙 추가
  //   config.module.rules.push({
  //     test: /\.wasm$/,
  //     type: "webassembly/async",
  //   });

  //   return config;
  // },
};

export default withPWA(nextConfig);
