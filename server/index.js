const path = require("path");
const https = require("https");

const fs = require("fs");

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3003;

const app = require("./app");

const { nuxt, devServer, config } = require("./nuxt");
// const api = require("./api");

// app.use("/api", api);

app.use(nuxt.render);

// We instantiate nuxt.js with the options

config.dev = !isProd;

// Render every route with Nuxt.js

const readFileToString = filePath =>
  fs.readFileSync(path.resolve(__dirname, filePath)).toString();

const getCertificates = () => ({
  key: readFileToString("./certs/privkey.pem"),
  cert: readFileToString("./certs/fullchain.pem"),
  rejectUnauthorized: false
});

const onServerStart = (isHttps = false) => () =>
  console.log(
    `Server listening on ${isHttps ? "https" : "http"}://localhost:${port}`
  );

const listenToHTTPS = () => {
  const options = getCertificates();
  const httpsServer = https.createServer(options, app);
  httpsServer.listen(port, onServerStart(true));
};

// Build only in dev mode with hot-reloading
if (config.dev) {
  process.env.DEBUG = "nuxt:*";
  devServer(() => app.listen(port, onServerStart));
} else {
  listenToHTTPS();
}
