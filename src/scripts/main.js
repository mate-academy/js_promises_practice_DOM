'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  function z() {
    clearTimeout();
    resolve('First promise was resolved');
    // console.log('jj');
  }

  if (document) {
    document.addEventListener('click', z, { once: true });

    setTimeout(() => {
      // console.log('rej');
      document.removeEventListener('click', z);
      reject(new Error('First promise was rejected'));
    }, 3000);
  }
});

firstPromise
  .then((a) => {
    const firstPromiseDiv = document.createElement('div');

    firstPromiseDiv.setAttribute('data-qa', 'notification');

    firstPromiseDiv.classList.add('success');
    firstPromiseDiv.innerHTML = a;
    body.appendChild(firstPromiseDiv);
    // console.log(a);
  })
  .catch(() => {
    const firstPromiseDiv = document.createElement('div');

    firstPromiseDiv.setAttribute('data-qa', 'notification');
    firstPromiseDiv.classList.add('error');
    firstPromiseDiv.innerHTML = 'First promise was rejected';
    body.appendChild(firstPromiseDiv);
  });

// console.log(firstPromise.Promise.PromiseState);

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      // console.log('rightClick');
      // console.log(e);
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'click',
    (e) => {
      resolve('Second promise was resolve');
    },
    { once: true },
  );
});

secondPromise.then((d) => {
  const secondPromiseDiv = document.createElement('div');

  secondPromiseDiv.setAttribute('data-qa', 'notification');

  secondPromiseDiv.classList.add('success');
  secondPromiseDiv.innerHTML = d;
  body.appendChild(secondPromiseDiv);
  // console.log(d);
});

// console.log(secondPromise);

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (leftClicked && rightClicked) {
      clearTimeout();
      resolve('Third promise was resolved');
    }
  };

  const contextMenuHandler = (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      clearTimeout();
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', contextMenuHandler);

  setTimeout(() => {
    document.removeEventListener('click', clickHandler);
    document.removeEventListener('contextmenu', contextMenuHandler);

    if (!leftClicked || !rightClicked) {
      reject(new Error('Third promise was rejected'));
    }
  }, 3000);
});

thirdPromise
  .then((message) => {
    const thirdPromiseDiv = document.createElement('div');

    thirdPromiseDiv.setAttribute('data-qa', 'notification');
    thirdPromiseDiv.classList.add('success');
    thirdPromiseDiv.innerHTML = message;
    body.appendChild(thirdPromiseDiv);
  })
  .catch(() => {
    const thirdPromiseDiv = document.createElement('div');

    thirdPromiseDiv.setAttribute('data-qa', 'notification');
    thirdPromiseDiv.classList.add('error');
    thirdPromiseDiv.innerHTML = 'Third promise was rejected';
    body.appendChild(thirdPromiseDiv);
  });
