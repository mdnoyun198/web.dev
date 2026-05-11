/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.menucool.com',
                port: '',
                // pathname: '/my-bucket/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
