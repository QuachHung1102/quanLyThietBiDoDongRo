'use strict';

let user;
let token;

// get user in localStorage
if (typeof Storage !== 'undefined') {
  user = JSON.parse(localStorage.getItem('user'));
  token = JSON.parse(localStorage.getItem('token'));
}

if ((!user || !token) && window.location.pathname.split('/').pop() !== 'login-page') {
  window.location.href = '/users/login-page';
} else {
  try {
    const checkToken = async function () {
      const response = await axios.post('/users/authenticate', {
        headers: {
          token: token,
        },
      });
      if (response.status !== 200) {
        window.location.href = '/users/login-page';
      }
    };
    checkToken();
  } catch (error) {
    console.error('Error during token check:', error.response ? error.response.data : error.message);
    alert('An error occurred. Please try again later.');
    window.location.href = '/users/login-page';
  }
}