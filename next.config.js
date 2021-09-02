module.exports = {
  reactStrictMode: true,
  target: "serverless",
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  pwa: {
    dest: "public", // swの出力ディレクトリ
    // runtimeCaching: []
  },
};
