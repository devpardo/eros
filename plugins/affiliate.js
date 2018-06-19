import * as storage from "~/utils/storage";

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const { affCode } = to.query;
    if (affCode) {
      storage.setItem("affCode", affCode);
    }
    next();
  });
};
