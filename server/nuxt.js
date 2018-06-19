const { Nuxt, Builder } = require("nuxt");

const config = require("../nuxt.config");

const nuxt = new Nuxt(config);

module.exports = {
  nuxt,
  config,
  devServer: listen => {
    const builder = new Builder(nuxt);
    builder
      .build()
      .then(listen)
      .catch(error => {
        console.error(error);
        process.exit(1);
      });
  }
};
