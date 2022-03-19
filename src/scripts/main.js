'use strict';
/* eslint-disable */

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
      reject('First promise was rejected');
    }, 3000)
    body.addEventListener('click', () => {
      resolve('First promise was resolved');
    });
});

function successHandler(message) {
    const div = document.createElement('div');
    div.setAttribute("data-qa", "notification");
    div.classList.add('success');
    div.innerText = message;
    body.append(div);
}

function errorHandler(message) {
    const div = document.createElement('div');
    div.setAttribute("data-qa", "notification");
    div.classList.add('warning');
    div.innerText = message;
    body.append(div);
}

firstPromise.then(successHandler);

firstPromise.catch(errorHandler);

const secondPromise = new Promise((resolve) => {
    body.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });
    body.addEventListener('contextmenu', () => {
        resolve('Second promise was resolved');
    });
    
});

secondPromise.then(successHandler);

const thirdPromise = new Promise((resolve) => {
    let counterR = false;
    let counterL = false;
    body.addEventListener('click', () => {
        counterR = true;
        if(counterR === true && counterL === true) {
            resolve('Third promise was resolved');
        }
    });
    body.addEventListener('contextmenu', () => {
        counterL= true ;
        if(counterR === true && counterL === true) {
            resolve('Third promise was resolved');
        }
    });

});

thirdPromise.then(successHandler);