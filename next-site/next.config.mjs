/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config, { isServer }) {
    // Find and exclude SVG files from the default file-loader rule
    const fileLoaderRule = config.module.rules.find(
      (rule) => String(rule.test) === String(/\.(png|jpe?g|gif|ico|svg)$/)
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add a new rule for SVG files to be handled by @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;

