'use strict';

const page = document.querySelector('body');

const promise1 = new Promise(resolver1);

function resolver1(resolve, reject) {
    page.addEventListener('click', () => {
        resolve();
    });

    setTimeout(reject, 3000)
}

promise1
    .then(() => {
        const notification = document.createElement('div');
        notification.innerHTML = '<div data-qa="notification">';
        notification.classList.add('success');
        notification.innerText = 'First promise was resolved';
        page.append(notification);
    })
    .catch(() => {
        const notification = document.createElement('div');
        notification.innerHTML = '<div data-qa="notification">';
        notification.classList.add('warning');
        notification.innerText = 'First promise was rejected';
        page.append(notification);
    })

const promise2 = new Promise(resolver2);

function resolver2(resolve) {
    page.addEventListener('click', () => {
        resolve();
    });
    page.addEventListener('contextmenu', () => {
        event.preventDefault();
        resolve();
    });
}

promise2.then(() => {
    const notification = document.createElement('div');
    notification.innerHTML = '<div data-qa="notification">';
    notification.classList.add('success');
    notification.innerText = 'Second promise was resolved';
    page.append(notification);
})

const promise3 = new Promise(resolver3);

function resolver3(resolve, reject) {
    page.addEventListener('click', () => {
        page.addEventListener('contextmenu', () => {
            resolve();
        })
    });
}

promise3.then(() => {
    const notification = document.createElement('div');
    notification.innerHTML = '<div data-qa="notification">';
    notification.classList.add('success');
    notification.innerText = 'Third promise was resolved';
    page.append(notification);
})