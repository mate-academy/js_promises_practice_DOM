'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout( () => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timerId);
      resolve('First promise was resolved');
    }
  })

});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  })
});

const thirdPromice = new Promise ((resolve, reject) => {
  let left = false;
  let right = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    } else if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  })
})

function successCase(message) {
  const div = document.createElement('div');
  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;
  document.body.append(div);
}

function failCase(error) {
  const div = document.createElement('div');
  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = error.message;
  document.body.append(div);
}

firstPromise.then(successCase).catch(failCase);
secondPromise.then(successCase);
thirdPromice.then(successCase);
