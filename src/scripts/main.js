'use strict';

const newMessage = function(className, text, backgroundColor) {
  const message = document.createElement('div');

  message.classList.add(className);
  message.dataset.qa = 'notification';
  message.innerText = text;
  message.style.backgroundColor = backgroundColor;
  message.style.height = '40px';
  message.style.display = 'flex';
  message.style.justifyContent = 'center';
  message.style.alignItems = 'center';
  message.style.padding = '20px';
  message.style.borderRadius = '16px';
  message.style.marginBottom = '20px';

  return message;
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    const result = newMessage('success', 'First promise was resolved', 'green');

    resolve(result);
  });

  setTimeout(() => {
    const result = newMessage('warning',
      'First promise was rejected', 'red');

    reject(result);
  }, 3000);
});

firstPromise
  .then((result) => {
    document.body.lastElementChild.after(result);
  })
  .catch((result) => {
    document.body.lastElementChild.after(result);
  });

let leftclick = false;
let rightclick = false;

const secondPromise = new Promise((resolve) => {
  let result;

  document.addEventListener('click', () => {
    result = newMessage('success',
      'Second promise was resolved', 'blue');
    resolve(result);
  });

  document.addEventListener('contextmenu', () => {
    result = newMessage('success',
      'Second promise was resolved', 'blue');
    resolve(result);
  });
});

secondPromise
  .then((result) => {
    document.body.lastElementChild.after(result);
  });

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftclick = true;
    }

    if (e.button === 2) {
      rightclick = true;
    }

    if (leftclick && rightclick) {
      const result = newMessage('sucess',
        'Third promise was resolved', 'grey');

      resolve(result);
    }
  });
});

thirdPromise
  .then((result) => {
    document.body.lastElementChild.after(result);
  });
