'use strict';

function successHandler(text) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification')
  message.className = 'success'
  message.textContent = text;
  document.body.append(message);
}

function errorHandler(text) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification')
  message.className = 'error'
  message.textContent = text;
  document.body.append(message);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});
promise1.then(successHandler).catch((error) => {errorHandler(error.message)});

const promise2 = new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
        resolve('Second promise was resolved');
    });

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        resolve('Second promise was resolved');
    });
});
promise2.then(successHandler).catch(errorHandler);

const promise3 = new Promise((resolve, reject) => {
    let leftClicked = false
    let rightClicked = false

    document.addEventListener('click', () => {
        leftClicked = true
        if(leftClicked && rightClicked){
            resolve('Third promise was resolved');
        }
    });

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        rightClicked = true
        if(leftClicked && rightClicked){
            resolve('Third promise was resolved');
        }
    });
  });
  promise3.then(successHandler).catch(errorHandler);