/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 必要に応じて画像設定を追加できます
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // すべての API リクエスト
        destination: '/src/api/next/:path*', // src/api にリダイレクト
      },
    ];
  },
};

export default nextConfig;