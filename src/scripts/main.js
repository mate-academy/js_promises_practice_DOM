'use strict';

function promise1() {
  const resolver = (confirm1, reject1) => {
    document.addEventListener('contextmenu', () => {
      return confirm1('First promise was resolved');
    });

    setTimeout(() => {
      return reject1('First promise was rejected');
    }, 3000);
  };

  return new Promise(resolver);
}

promise1()
  .then(result => {
    const div = document.querySelector('body');

    div.innerHTML
    += `<div class="success"
     data-qa="notification">
     ${result}</div>`;
  })
  .catch(error => {
    const div = document.querySelector('body');

    div.innerHTML
    += `<div class="warning" 
    data-qa="notification">
    ${error}</div>`;
  });

function promise2() {
  let left = 0;
  let right = 0;
  const resolved = (confirm2, reject2) => {
    document.addEventListener('click', (e) => {
      e.preventDefault();
      left++;

      if (left > 0 || right > 0) {
        confirm2();
      }
    });

    document.addEventListener('contextmenu', () => {
      right++;

      if (left > 0 || right > 0) {
        confirm2();
      }
    });
  };

  return new Promise(resolved);
}

promise2()
  .then(result => {
    const div = document.querySelector('body');

    div.innerHTML += `<div 
    class="success" 
    data-qa="notification">
    Second promise was resolved</div>`;
  });

function promise3() {
  let left = 0;
  let right = 0;
  const resolved = (confirm3, reject) => {
    document.addEventListener('click', () => {
      left++;

      if (left > 0 && right > 0) {
        confirm3();
      }
    });

    document.addEventListener('contextmenu', (e) => {
      right++;
      e.preventDefault();

      if (left > 0 && right > 0) {
        confirm3();
      }
    });
  };

  return new Promise(resolved);
}

promise3()
  .then(result => {
    const div = document.querySelector('body');

    div.innerHTML
    += `<div class="success" 
    data-qa="notification">
    Third promise was resolved
    </div>`;
  });
