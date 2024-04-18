require('dotenv').config();
const geocodingUrl = process.env.API_GEOCODING_ACCURATE_URL;

const proxyConfig = {
    "/api": {
        "target": geocodingUrl,
        "secure": false,
        "changeOrigin": true
    }
};

module.exports = proxyConfig;
