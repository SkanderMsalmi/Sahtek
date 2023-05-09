const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "https://sah-tek-serv.onrender.com/graphql",
      secure: false,
    })
  );
};
