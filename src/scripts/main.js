'use strict';
debugger;

const logoElement = document.querySelector('.logo');

const message = 'First promise was resolved';
const messageError = 'First promise was rejected';
const rightMessage = 'Second promise was resolved';
const third = 'Third promise was resolved';

function promiseF(text, isError = true) {
  const creatElementDiv = document.createElement('div');

  creatElementDiv.setAttribute('data-qa', 'notification');

  if (isError) {
    creatElementDiv.classList.add('error');
  } else {
    creatElementDiv.classList.add('success');
  }

  creatElementDiv.textContent = text;
  document.body.append(creatElementDiv);

  setTimeout(() => {
    creatElementDiv.remove();
  }, 3000);
}

const firstPromise = new Promise((resolve, reject) => {
  logoElement.addEventListener(
    'click',
    () => {
      resolve(message);
    },
    { once: true },
  );

  setTimeout(() => {
    reject(messageError);
  }, 3000);
})
  .then((ms) => promiseF(ms, false))
  .catch((er) => promiseF(er, true));

const secondPromise = new Promise((resolve, reject) => {
  logoElement.addEventListener(
    'contextmenu',
    (event) => {
      event.preventDefault();
      resolve(rightMessage);
    },
    { once: true },
  );
}).then((ms) => promiseF(ms, false));

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkBothClick() {
    if (leftClicked && rightClicked) {
      resolve(third);
    }
  }

  logoElement.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkBothClick();
    }
  });

  logoElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;
    checkBothClick();
  });
}).then((ms) => {
  promiseF(ms, false);
});

// -----------------------------------------------------------
// const logoElement = document.querySelector('.logo');
// const message = 'Promise was resolved!';
// const errMessage = 'Promise was rejected!';

// function showResult(text, isError = false) {
//   const creatElementDiv = document.createElement('div');

//   creatElementDiv.classList.add('message');

//   if (isError) {
//     creatElementDiv.classList.add('error-message');
//   }

//   creatElementDiv.textContent = text;
//   document.body.append(creatElementDiv);
// }

// const promise1 = new Promise((resolve) => {
//   logoElement.addEventListener(
//     'click',
//     () => {
//       resolve(message);
//     },
//     { once: true },
//   );
// });

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(errMessage);
//   }, 3000);
// });

// promise1.then((msg) => showResult(msg)).catch((err) => showResult(err, true));

// promise2.then((msg) => showResult(msg)).catch((err) => showResult(err, false));
