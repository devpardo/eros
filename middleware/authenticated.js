export default function({ store, redirect }) {
  //API_MR.defaults.headers["X-AUTH-TOKEN"] = store.state.
  if (store.getters.auth) {
    return redirect("/");
  }
}
