/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig

// module.exports = {
//   webpack: (config, { isServer }) => {
//       if (!isServer) {
//           // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
//           config.resolve.fallback = {
//               fs: false
//           }
//       }

//       return config;
//   }
// }

// module.exports = {
//   reactStrictMode: false,
//   webpack5:true,
//   webbpack:(config)=>{
//     config.resolve.fallback={fallback:false};
//     return config;
//   },
// };



