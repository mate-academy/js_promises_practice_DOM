'use strict';

function tagInsertion(text, clas) {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.innerText = text;
  div.className = clas;
  body.lastChild.before(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(Error);
  }, 3000);
});

firstPromise
  .then(success => {
    tagInsertion(success, 'success');
  })
  .catch(eror => {
    tagInsertion('First promise was rejected', 'warning');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      e.preventDefault();
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(success => {
    tagInsertion(success, 'success');
  });

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    document.addEventListener('contextmenu', (ev) => {
      if (ev.button === 2) {
        ev.preventDefault();
        resolve('Third promise was resolved');
      }
    });
  });
});

thirdPromise
  .then(success => {
    tagInsertion(success, 'success');
  });
