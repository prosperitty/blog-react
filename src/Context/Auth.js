const Auth = {
  isAuthenticated: async function isAuthenticated() {
    return await fetch('https://eventhorizon.up.railway.app/users/authenticated')
      .then((res) => {
        if (res.status === 401) {
          return { isAuthenticated: false };
        } else {
          console.log(res.json());
          return res.json();
        }
      })
      .catch((err) => err);
  },
  logout: async function logout() {
    return await fetch('https://eventhorizon.up.railway.app/logout', {
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
