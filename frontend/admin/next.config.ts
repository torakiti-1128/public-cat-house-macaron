import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        serverActions: {
            bodySizeLimit: '20mb', // ボディサイズ制限を20MBに設定
        },
    },
    images: {
        domains: ['stmiseskirombbqtwacm.supabase.co'],
    },
};

export default nextConfig;
