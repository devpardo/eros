import {
  addListenersToEvent,
  removeListenersToEvent,
  sleep,
  random,
  scrollable
} from "~/utils";

import * as storage from "~/utils/storage";

export default ({ store, app }, inject) => {
  inject("addListenersToEvent", addListenersToEvent);
  inject("removeListenersToEvent", removeListenersToEvent);
  inject("sleep", sleep);
  inject("random", random);
  inject("notify", (content, type = "success") => {
    store.commit("modal/OPEN_MODAL", {
      content,
      type
    });
  });
  inject("storage", storage);
  inject("clone", object => JSON.parse(JSON.stringify(object)));
  inject("scrollable", scrollable);
};
