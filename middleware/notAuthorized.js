export default function({ store, redirect }) {
  if (!store.getters.auth) {
    return redirect("/");
  }
  /* if (store.getters.authUser === null) {
    return redirect('/')
  } */
}
