'use strict';

function appendDiv(res, type) {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${type}">
    ${res}
  </div>
    `)
}

//—————————————————FIRST PROMISE—————————————————

let isFirstPromiseResolved = false;
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
    isFirstPromiseResolved = true;
  })

  setTimeout(() => {
    if (!isFirstPromiseResolved) {
      reject('First promise was rejected')
      console.log(firstPromise);
    }
  }, 3000)
})
  .then((res) => {
    appendDiv(res, 'success')
  })
  .catch(res => {
    appendDiv(res, 'warning')
  })

//—————————————————SECOND PROMISE—————————————————

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  })

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  })
})
  .then(res => {
    appendDiv(res, 'success')
  })
  .catch(res => {
    appendDiv(res, 'warning')
  })

//—————————————————THIRD PROMISE—————————————————

let isLeftClicked = false;
let isRightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    if (isRightClicked) {
      resolve('Third promise was resolved');
    }

    isLeftClicked = true;
  })

  document.addEventListener('contextmenu', () => {
    if (isLeftClicked) {
      resolve('Third promise was resolved');
    }

    isRightClicked = true;
  })

  
})
  .then(res => {
    appendDiv(res, 'success')
  })
  .catch(res => {
    appendDiv(res, 'warning')
  })
