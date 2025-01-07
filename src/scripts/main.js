'use strict';

const entireDocument = document.body;

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  function handleClick() {
    resolve('First promise was resolved');
    clicked = true;
    entireDocument.removeEventListener('click', handleClick);
  }

  entireDocument.addEventListener('click', handleClick);

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((mess) => {
    createNotif(mess, true);
  })
  .catch((err) => {
    createNotif(err, false);
  });

const secondPromise = new Promise((resolve, reject) => {
  function clickedDoc() {
    resolve('Second promise was resolved');
    entireDocument.removeEventListener('click', clickedDoc);
  }

  entireDocument.addEventListener('click', clickedDoc);

  entireDocument.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    clickedDoc(e);
  });
});

secondPromise.then((mess) => {
  createNotif(mess);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rigthCleecked = false;

  entireDocument.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rigthCleecked = true;

    if (leftClicked && rigthCleecked) {
      resolve('Third promise was resolved');
    }
  });

  entireDocument.addEventListener('click', (e) => {
    leftClicked = true;

    if (leftClicked && rigthCleecked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((mess) => {
  createNotif(mess);
});

function createNotif(mess, success = true) {
  const a = document.createElement('div');

  a.setAttribute('data-qa', 'notification');
  a.className = 'success';
  a.textContent = mess;

  if (!success) {
    a.className = 'error';
  }

  document.body.append(a);
}
