'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const id = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(id);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function addNotif(msg, resClass) {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.classList.add(resClass);

  newDiv.textContent = msg;

  document.body.appendChild(newDiv);
}

firstPromise.then(
  (data) => {
    addNotif(data, 'success');
  },
  (data) => {
    addNotif(data, 'error');
  },
);

// firstPromise.catch((data) => {
//   addNotif(data.message, 'error');
// });

secondPromise.then((data) => {
  addNotif(data, 'success');
});

thirdPromise.then((data) => {
  addNotif(data, 'success');
});
