const getEleById = (id) => {
  return document.getElementById(id);
}

if (user) {
  getEleById('userDropdown').classList.remove('hidden');
  document.querySelector('.username').textContent = user.name;
  if (user.type === 'admin' || user.type === 'superAdmin') {
    getEleById('adminPanel').classList.remove('hidden');
  }
  Array.from(document.getElementsByClassName('nav-auth')).map((ele) => {
    ele.classList.add('hidden');
  });
}