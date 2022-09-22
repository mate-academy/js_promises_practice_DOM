'use strict';
function createPromise1() {
  return new Promise((resolved, reject) => {
    document.body.addEventListener('mousedown', (e) => {
      resolved('First promise was resolved');
    })
    setTimeout(() => {
      reject('First promise was rejected');
    }, 3000)
  })
}

function createPromise2() {
  return new Promise((resolved) => {
    document.body.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolved('Second promise was resolved');
      }
    })
  })
}

function createPromise3() {
  return new Promise((resolved) => {
    let leftClick = false;
    let rightClick = false;

    document.body.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        leftClick = true;
      } else if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        resolved('Third promise was resolved');
      }
    })
  })
}

const promise1 = createPromise1()
const promise2 = createPromise2()
const promise3 = createPromise3()

promise1.then((resolve) => {
  const newDiv1Resolve = document.createElement('div');

  newDiv1Resolve.classList.add('success');
  newDiv1Resolve.setAttribute('data-qa', 'notification');
  newDiv1Resolve.innerText = resolve;
  document.body.appendChild(newDiv1Resolve);
}, (reject) => {
  const newDiv1Reject = document.createElement('div');

  newDiv1Reject.classList.add('warning');
  newDiv1Reject.setAttribute('data-qa', 'notification');
  newDiv1Reject.innerText = reject;
  document.body.appendChild(newDiv1Reject);
});

promise2.then((resolve) => {
  const newDiv2Resolve = document.createElement('div');

  newDiv2Resolve.classList.add('success');
  newDiv2Resolve.setAttribute('data-qa', 'notification');
  newDiv2Resolve.innerText = resolve;
  document.body.appendChild(newDiv2Resolve);
});

promise3.then((resolve) => {
  const newDiv3Resolve = document.createElement('div');

  newDiv3Resolve.classList.add('success');
  newDiv3Resolve.setAttribute('data-qa', 'notification');
  newDiv3Resolve.innerText = resolve;
  document.body.appendChild(newDiv3Resolve);
});
