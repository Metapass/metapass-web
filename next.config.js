/** @type {import('next').NextConfig} */
const withFonts = require('next-fonts')
module.exports = withFonts({
    enableSvg: true,
    webpack(config, options) {
        return config
    },
    reactStrictMode: true,
})
