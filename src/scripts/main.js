'use strict';

const promiseOne = new Promise((resolve, reject) => {
  setTimeout(() =>{
    reject('Error , promiseOne');
  }, 5000)

  document.addEventListener('click', () => {
    resolve('Successfully, promiseOne');
  })
})

promiseOne
.then(successfully => {
  console.log(successfully)
})
.catch(error => {
console.warn(error)
})

const promiseTwo = new Promise((resolve, reject) => {
  document.addEventListener('click', (event) => {
    if (event.button === 0) {
      resolve('click on left key mouse, promiseTwo')
    }
  })

  document.addEventListener('contextmenu', (event) => {
    if (event.button === 2) {
      reject('click on right key mouse, promiseTwo')
    }
  })
})

promiseTwo
.then(successfully => {
  console.log(successfully)
})
.catch(error => {
console.warn(error)
})


const promiseTree = new Promise((resolve, reject) => {
let leftButtonMouse = false;
let rightButtonMouse = false;

  document.addEventListener('click', (event) => {
    if (event.button === 0) {
      leftButtonMouse = true;
      if (leftButtonMouse && rightButtonMouse) {
        reject('the left and right mouse buttons were pressed, promiseTree')
      }
    }
  })

  document.addEventListener('contextmenu', () => {
      rightButtonMouse = true;
      if (leftButtonMouse && rightButtonMouse) {
        resolve('the left and right mouse buttons were pressed, promiseTree')
      }
  })

})

promiseTree
.then(successfully => {
  console.log(successfully)
})
.catch(error => {
  console.warn(error)
})