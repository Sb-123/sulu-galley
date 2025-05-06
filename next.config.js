/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.pexels.com',
      port: '',
      pathname: '/photos/**'
    }]
  }
};

module.exports = nextConfig; 