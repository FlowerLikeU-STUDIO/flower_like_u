/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")], // scss 설정
    prependData: `@import "/src/styles/_variables.module.scss"; @import "/src/styles/_mixins.module.scss";`, // prependData 옵션 추가
  },
};
