'use strict';

const firstPromise = new Promise((resolve, reject) => {
    document.addEventlistener('click', () => {
        resolve('First promise was resolved');
    });

    setTimeout(() => {
        const error = new Error('First promise was rejected');

        reject(error);
    }, 3000);
});

const secondPromise = new Promise((resolve) => {
    document.addEventListener('click', (event) => {
        if (event.button === 0 || event.button === 2) {
            resolve('Second promise was resolved');
        }
    });
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
    document.addEventListener('click', (event) => {
        if (event.button === 0) {
            leftClick = true;
            if (event.button === 2) {
                rightClick = true;
            }
            if (leftClick && rightClick) {
                resolve('Third promise was resolved');
            }
        }
    });
});

firstPromise
    .then((message) => {
        document.querySelector('[data-qa="notification"]').innerHTML = message;
        document.querySelector('[data-qa="notification"]').classList.add('success');
    })
    .catch((message) => {
        document.querySelector('[data-qa="notification"]').innerHTML = message;
        document.querySelector('[data-qa="notification"]').classList.add('warning');
    });

secondPromise
    .then((message) => {
        document.querySelector('[data-qa="notification"]').innerHTML = message;
        document.querySelector('[data-qa="notification"]').classList.add('success');
    });

thirdPromise
    .then((message) => {
        document.querySelector('[data-qa="notification"]').innerHTML = message;
        document.querySelector('[data-qa="notification"]').classList.add('success');
    });
