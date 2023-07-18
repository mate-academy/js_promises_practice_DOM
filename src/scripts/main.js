'use strict';

const div = document.getElementById('div');
const logo = document.getElementById('logo');
let check1prm = false;
let check2prm = false;
let check3prm = false;
let left = false;
let right = false;
const partOfDiv = '<div data-qa="notification" class="';

function handler() {
  const promise1 = (resolve, reject) => {
    logo.addEventListener('click', () => {
      if (right === false && check1prm === false && check3prm === false) {
        left = true;
        check1prm = true;
        resolve(partOfDiv + 'succes">First promise was resolved</div>');
      }
    });

    setTimeout(() => {
      if (check1prm === false && check3prm === false && check2prm === false) {
        check1prm = true;
        reject(partOfDiv + 'warning">First promise was rejected</div>');
      }
    }, 3000);
  };

  return new Promise(promise1);
}

handler().then(function(result) {
  div.innerHTML = result;
}).catch(function(result) {
  div.innerHTML = result;
});

function handler2() {
  const promise2 = (resolve, reject) => {
    logo.addEventListener('mousedown', () => {
      check2prm = true;

      if (event.button === 2 && check3prm === false) {
        right = true;
        check2prm = true;
        resolve(partOfDiv + 'succes">Second promise was resolved</div>');
      }

      if (event.button === 0 && check3prm === false  && check1prm === true) {
        left = true;
        check2prm = true;
        resolve(partOfDiv + 'succes">Second promise was resolved</div>');
      }
    });
  };

  return new Promise(promise2);
}

handler2().then(function(result) {
  div.innerHTML = result;
}).catch(function(result) {
  div.innerHTML = result;
});

function handler3() {
  const promise3 = (resolve, reject) => {
    logo.addEventListener('mousedown', () => {
      if (event.button === 0 && right === true) {
        check3prm = true;
        resolve(partOfDiv + 'succes">Third promise was resolved</div>');
      }

      if (event.button === 2 && left === true) {
        check3prm = true;
        resolve(partOfDiv + 'succes">Third promise was resolved</div>');
      }
    });
  };

  return new Promise(promise3);
}

handler3().then(function(result) {
  div.innerHTML = result;
}).catch(function(result) {
  div.innerHTML = result;
});
