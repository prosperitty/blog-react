const Auth = {
  isAuthenticated: async function isAuthenticated() {
    return await fetch('https://event-horizon.onrender.com/users/authenticated', {credentials: "include"})
      .then((res) => {
        if (res.status === 401) {
          return { isAuthenticated: false };
        } else {
          return res.json();
        }
      })
      .catch((err) => err);
  },
  logout: async function logout() {
    return await fetch('https://event-horizon.onrender.com/users/logout', {
      credentials: 'include'
    })
    .then(res => {
      if (res.status !== 200) {
        throw new Error('issue logging out')
      } else {
        return res.json();
      }
    })
    .catch(err => err);
  }
};

export default Auth;
