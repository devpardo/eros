export default ({ app }) => {
  app.provide = () => ({
    MEDIA_SERVER: process.env.MEDIA_SERVER
  });
};
