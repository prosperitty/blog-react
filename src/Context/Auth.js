const Auth = {
  isAuthenticated: async function isAuthenticated() {
    return await fetch('/users/authenticated', {
      mode: 'cors'
    })
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
    return await fetch('logout', {
      mode: 'cors'
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
