document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Ngăn hành động mặc định của form

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await axios.post('/users/login', { email, password });

      if (response.data.token) {
        alert('Login successful!');
        // Lưu token vào localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('Save data to localStorage successfully!');

        // Chuyển hướng đến trang home
        window.location.href = '/';
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      alert('An error occurred. Please try again later.');
    }
  });
});