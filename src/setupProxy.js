const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:8080", //통신할 서버의 IP
            changeOrigin: true,
        })
    );

    console.log("프록시 생성 성공");
};
