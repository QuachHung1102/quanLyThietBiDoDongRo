document.addEventListener('DOMContentLoaded', () => {
  const formRegister = document.getElementById('registerForm');
  formRegister.addEventListener('submit', async function (e) {
    e.preventDefault(); // Ngăn hành động mặc định của form

    const formData = new FormData(formRegister);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');

  })

});