/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Agora é top-level (não fica mais dentro de "experimental")
  outputFileTracingExcludes: {
    "*": [
      "public/media/**",
      "**/*.mp3",
      "**/*.wav",
      "**/*.flac",
      "**/*.aac",
      "**/*.m4a",
      "**/*.ogg"
    ]
  }
};

module.exports = nextConfig;
