document.addEventListener('DOMContentLoaded', () => {
  const formRegister = document.getElementById('registerForm');
  formRegister.addEventListener('submit', async function (e) {
    e.preventDefault(); // Ngăn hành động mặc định của form

    const formData = new FormData(formRegister);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phoneNumber = formData.get('phoneNumber');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      alert('Please fill in all fields!');
      return;
    }
    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Invalid email format!');
      return;
    }
    // Kiểm tra định dạng số điện thoại
    const phonePattern = /^\d{10,15}$/; // Giả sử số điện thoại có độ dài từ 10 đến 15 ký tự
    if (!phonePattern.test(phoneNumber)) {
      alert('Invalid phone number format!');
      return;
    }
    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có giống nhau không
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    // Kiểm tra xem mật khẩu có chứa ký tự đặc biệt không
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharPattern.test(password)) {
      alert('Password must contain at least one special character!');
      return;
    }
    // Kiểm tra xem mật khẩu có chứa chữ hoa không
    const upperCasePattern = /[A-Z]/;
    if (!upperCasePattern.test(password)) {
      alert('Password must contain at least one uppercase letter!');
      return;
    }
    // Kiểm tra xem mật khẩu có chứa chữ thường không
    const lowerCasePattern = /[a-z]/;
    if (!lowerCasePattern.test(password)) {
      alert('Password must contain at least one lowercase letter!');
      return;
    }
    // Kiểm tra xem mật khẩu có chứa số không
    const numberPattern = /\d/;
    if (!numberPattern.test(password)) {
      alert('Password must contain at least one number!');
      return;
    }
    // Kiểm tra xem mật khẩu có chứa khoảng trắng không
    const whitespacePattern = /\s/;
    if (whitespacePattern.test(password)) {
      alert('Password must not contain spaces!');
      return;
    }
    // Kiểm tra xem email đã tồn tại chưa
    try {
      const emailResponse = await axios.post('/users/check-email', { email });
      if (emailResponse.data.exists) {
        alert('Email already exists. Please use a different email.');
        return;
      }
    } catch (error) {
      console.error('Error checking email:', error.response ? error.response.data : error.message);
      alert('An error occurred while checking email. Please try again later.');
      return;
    }

    // Kiểm tra xem số điện thoại đã tồn tại chưa
    try {
      const phoneResponse = await axios.post('/users/check-phone', { phoneNumber });
      if (phoneResponse.data.exists) {
        alert('Phone number already exists. Please use a different phone number.');
        return;
      }
    } catch (error) {
      console.error('Error checking phone number:', error.response ? error.response.data : error.message);
      alert('An error occurred while checking phone number. Please try again later.');
      return;
    }

    // Gửi yêu cầu đăng ký
    try {
      const response = await axios.post('/users/register', { firstName, lastName, email, phoneNumber, password });

      if (response.status === 201) {
        alert('Registration successful!');
        // Lưu token vào localStorage
        window.location.href = '/users/login-page';
      }
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      alert('An error occurred during registration. Please try again later.');
    }
  });
});