/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  async rewrites(){
    return [{ source: '/__space/v0/actions', destination: '/api/space/actions'}]
  }
}

module.exports = nextConfig
