'use strict';

let user;
let token;

// get user in localStorage
if (typeof Storage !== 'undefined') {
  user = JSON.parse(localStorage.getItem('user'));
  token = JSON.parse(localStorage.getItem('token'));
}