const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    domain: ["localhost","images.ctfassets.net"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  styledComponents: true,
  env: {
    BASE_URL: process.env.REACT_APP_API_URL,
  }
}
