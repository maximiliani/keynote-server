/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.resolve.fallback.fs = false
        }
        return config
    }
}

module.exports = nextConfig
