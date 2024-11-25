'use strict';

const successHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.innerText = `${message} promise was resolved`;
  document.body.appendChild(div);
};

const errorHandler = (error) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.innerText = `${error.message} promise was rejected`;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First');
  });

  setTimeout(() => {
    reject(new Error('First'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let lclick = false;
  let rclick = false;

  document.addEventListener('click', () => {
    lclick = true;
    handleCheck();
  });

  document.addEventListener('contextmenu', () => {
    rclick = true;
    handleCheck();
  });

  const handleCheck = () => {
    if (lclick && rclick) {
      resolve('Third');
    }
  };
});

firstPromise
  .then((message) => {
    successHandler(message);
  })
  .catch((message) => {
    errorHandler(message);
  });

secondPromise.then((message) => {
  successHandler(message);
});

thirdPromise.then((message) => {
  successHandler(message);
});
