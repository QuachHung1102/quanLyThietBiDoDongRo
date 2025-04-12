'use strict';

let user;
let token;

// Lấy thông tin từ localStorage
if (typeof Storage !== 'undefined') {
  user = JSON.parse(localStorage.getItem('user'));
  token = localStorage.getItem('token');
}

const currentPage = window.location.pathname.split('/').pop();
const isAuthPage = currentPage === 'login-page' || currentPage === 'register-page';

if ((!user || !token) && !isAuthPage) {
  alert('You need to login to access this page!');
  window.location.href = '/users/login-page';
} else if (!isAuthPage) {
  const checkToken = async () => {
    try {
      const response = await axios.post('/users/authenticate', {}, {
        headers: { token } // Gửi token từ localStorage
      });
      if (response.status === 200) {
        console.log('Token is valid');
      }
    } catch (error) {
      if (error.response) {
        // Xử lý các mã lỗi từ server
        if (error.response.status === 401) {
          alert('Your session has expired or is invalid. Please log in again.');
        } else if (error.response.status === 500) {
          alert('An internal server error occurred. Please try again later.');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      } else {
        // Xử lý lỗi không có phản hồi từ server
        console.error('Error during token check:', error.message);
        alert('Unable to connect to the server. Please check your internet connection.');
      }
      window.location.href = '/users/login-page';
    }
  };

  checkToken();
}