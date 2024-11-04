'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.delay');
let delay = null;

input.addEventListener('input', event => {
  delay = Number(event.target.value); // Конвертація у число
});

form.addEventListener('submit', event => {
  event.preventDefault();

  let checked = document.querySelector('input[name="state"]:checked'); // Переміщено всередину обробника події

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checked && checked.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise.then(value => {
    iziToast.success({
      message: `✅ Fulfilled promise in ${value}ms`,
      position: 'topCenter',
      color: 'green',
      messageColor: 'black',
      close: false,
      timeout: 4000,
      progressBar: false,
      icon: false,
    });
  });

  promise.catch(err => {
    iziToast.error({
      message: `❌ Rejected promise in ${err}ms`,
      position: 'topCenter',
      color: 'red',
      messageColor: 'black',
      close: false,
      timeout: 4000,
      progressBar: false,
      icon: false,
    });
  });

  form.reset();
});
