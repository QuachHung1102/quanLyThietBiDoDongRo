const userNameEle = document.querySelector('.username');

const getEleById = (id) => {
  return document.getElementById(id);
}

if (user && userNameEle) {
  getEleById('userDropdown').classList.remove('hidden');
  userNameEle.textContent = user.name;
  if (user.type === 'admin' || user.type === 'superAdmin') {
    getEleById('adminPanel').classList.remove('hidden');
  }
  Array.from(document.getElementsByClassName('nav-auth')).forEach((ele) => {
    ele.classList.add('hidden');
  });
}