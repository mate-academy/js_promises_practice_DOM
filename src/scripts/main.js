'use strict';

const html = document.documentElement;

const promise1 = new Promise((resolve, reject) => {
  let clickLog = 0;

  const prF = () => {
    clickLog++;

    if (clickLog === 1) {
      resolve('First promise was resolved');
    }
  };

  html.addEventListener('click', prF);

  setTimeout(() => {
    if (clickLog === 0) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  let clickLog = 0;

  const prF = () => {
    clickLog++;

    if (clickLog === 1) {
      resolve('Second promise was resolved');
    }
  };

  html.addEventListener('click', prF);
  html.addEventListener('contextmenu', prF);
});

const promise3 = new Promise((resolve, reject) => {
  let clickLogL = 0;
  let clickLogR = 0;

  const prFR = (ev) => {
    ev.preventDefault();
    clickLogR++;

    if (
      clickLogL > 0 &&
      clickLogR > 0 &&
      (clickLogL === 1 || clickLogR === 1)
    ) {
      resolve('Third promise was resolved');
    }
  };

  const prFL = () => {
    clickLogL++;

    if (
      clickLogL > 0 &&
      clickLogR > 0 &&
      (clickLogL === 1 || clickLogR === 1)
    ) {
      resolve('Third promise was resolved');
    }
  };

  html.addEventListener('click', prFL);
  html.addEventListener('contextmenu', prFR);
});

promise1
  .then((message) => {
    const not = document.createElement('div');

    not.setAttribute('data-qa', 'notification');
    not.className = 'success';
    not.innerText = message;

    document.body.append(not);
  })
  .catch((message) => {
    const not = document.createElement('div');

    not.setAttribute('data-qa', 'notification');
    not.className = 'error';
    not.innerText = message;

    document.body.append(not);
  });

promise2.then((message) => {
  const not = document.createElement('div');

  not.setAttribute('data-qa', 'notification');
  not.className = 'success';
  not.innerText = message;

  document.body.append(not);
});

promise3.then((message) => {
  const not = document.createElement('div');

  not.setAttribute('data-qa', 'notification');
  not.className = 'success';
  not.innerText = message;

  document.body.append(not);
});
