'use strict';

const logo = document.getElementById('logo');

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      resolve('First promise was resolved');
    }

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });
});

const secondPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  logo.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      leftClick = true;
    }

    if (click.button === 2) {
      rightClick = true;
    }

    if (rightClick || leftClick) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  logo.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      leftClick = true;
    }

    if (click.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

const onSuccess = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.className = 'success';

  div.innerText = message;

  document.body.appendChild(div);
};

const onFail = (error) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.className = 'warning';

  div.innerText = error;

  document.body.appendChild(div);
};

firstPromise.then(onSuccess).catch(onFail);
secondPromise.then(onSuccess).catch(onFail);
thirdPromise.then(onSuccess).catch(onFail);

// 'use strict';

// document.addEventListener('contextmenu', (rightClick) => {
//   rightClick.preventDefault();
// });

// const firstPromise = new Promise((resolve, reject) => {
//   document.addEventListener('mousedown', (mouseEvent) => {
//     if (mouseEvent.button === 0) {
//       resolve('First promise was resolved');
//     }
//   });

//   setTimeout(() => {
//     reject(new Error('First promise was rejected'));
//   }, 3000);
// });

// const secondPromise = new Promise((resolve, reject) => {
//   document.addEventListener('mousedown', (mouseEvent) => {
//     if (mouseEvent.button === 0 || mouseEvent.button === 2) {
//       resolve('Second promise was resolved');
//     }
//   });
// });

// const thirdPromise = new Promise((resolve, reject) => {
//   let leftButton = false;
//   let rightButton = false;

//   document.addEventListener('mousedown', (mouseEvent) => {
//     if (mouseEvent.button === 0) {
//       leftButton = true;
//     }

//     if (mouseEvent.button === 2) {
//       rightButton = true;
//     }

//     if (leftButton && rightButton) {
//       resolve('Third promise was resolve');
//     }
//   });
// });

// const onSuccess = (message) => {
//   const divElement = document.createElement('div');

//   divElement.className = 'success';
//   divElement.innerText = message;
//   divElement.dataset.qa = 'notification';
//   document.body.appendChild(divElement);
// };

// const onFail = (error) => {
//   const divElement = document.createElement('div');

//   divElement.className = 'warning';
// divElement.innerText = error.message;
//   divElement.dataset.qa = 'notification';
//   document.body.appendChild(divElement);
// };

// firstPromise
//   .then(onSuccess)
//   .catch(onFail);

// secondPromise
//   .then(onSuccess)
//   .catch(onFail);

// thirdPromise
//   .then(onSuccess)
//   .catch(onFail);

//   let button = document.querySelector("#button");

// button.addEventListener('mouseup', (e) => {
//   let log = document.querySelector('#log');

//   switch (e.button) {
//     case 0:
//       log.textContent = 'Left button clicked';
//       break;
//     case 1:
//       log.textContent = 'Middle button clicked.';
//       break;
//     case 2:
//       log.textContent = 'Right button clicked.';
//       break;
//     default:
//       log.textContent = `Unknown button code: ${e.button}`;
//   }
// });
