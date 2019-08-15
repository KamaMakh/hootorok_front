function loggedIn(state) {
  return Boolean(state.user.id);
}

export {
  loggedIn,
};
