'use strict';

const body = document.querySelector('body');

const insertMessage = (type, text) => {
  const message = document.createElement('div');

  body.append(message);
  message.style.display = `block`;
  message.className = `${type}`;
  message.setAttribute('data-qa', 'notification');
  message.style.margin = `4px`;
  message.style.border = `1px solid #000`;
  message.style.borderRadius = `4px`;
  message.style.padding = `4px`;
  message.innerText = `${text}`;
};

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  const text = 'First promise was rejected';

  setTimeout(() => reject(text), 3000);
});

firstPromise
  .then(
    resolve => insertMessage(`success`, resolve),
    reject => insertMessage(`warning`, reject)
  );

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

secondPromise
  .then(result => insertMessage(`success`, result));

const thirdPromise = new Promise((resolve) => {
  let leftClick;
  let rightClick;

  body.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;

      case 2:
        rightClick = true;
        break;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(result => insertMessage(`success`, result));

// чому не працює такий код - хоча локально перевіряв і все ок??

// function leftClick() {
//   return new Promise(resolve => {
//     body.addEventListener('click', () => {
//       resolve(true);
//     });
//   });
// }

// function rightClick() {
//   return new Promise(resolve => {
//     body.addEventListener('contextmenu', (e) => {
//       e.preventDefault();

//       resolve(true);
//     });
//   });
// }

// async function thirdPromise() {
//   await leftClick();
//   await rightClick();

//   insertMessage('Third promise was resolved');
// }

// thirdPromise();
