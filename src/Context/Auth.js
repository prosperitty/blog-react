async function isAuthenticated() {
  return await fetch('/users/authenticated')
    .then((res) => {
      if (res.status === 401) {
        return { isAuthenticated: false };
      } else {
        return res.json();
      }
    })
    .catch((err) => err);
}

export default isAuthenticated;
