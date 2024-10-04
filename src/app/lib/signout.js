const signout = async () => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });
    const response = await res.json();
    if (response) {
      window.location.assign('/login');
    }
  } catch (error) {
    console.log(error);
  }
};

export default signout;
