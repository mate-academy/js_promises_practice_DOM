'use strict';

const mouseClick = [];

const logo = document.querySelector('.logo');

function success(message) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
    ${message} promise was resolved
    </div>
    `
  );
}

function error() {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      First promise was rejected
    </div>
    `
  );
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(reject, 3000);

  logo.addEventListener('click', (e) => {
    resolve('First');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', (e) => {
    resolve('Second');
  });

  logo.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', (e) => {
    mouseClick.push(e.button);

    if (mouseClick.includes(0) && mouseClick.includes(2)) {
      resolve('Third');
    }
  });

  logo.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    mouseClick.push(e.button);

    if (mouseClick.includes(0) && mouseClick.includes(2)) {
      resolve('Third');
    }
  });
});

firstPromise.then(success, error);
secondPromise.then(success);
thirdPromise.then(success);
