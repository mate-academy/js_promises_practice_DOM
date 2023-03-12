"use strict";

const successHandler = (nameOfPromise) => {
  return () =>
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div data-qa="notification success">
        ${nameOfPromise} Promise was resolved
      </div>`
    );
};

const errorHandler = (nameOfPromise) => {
  return () =>
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div data-qa="notification warning">
        ${nameOfPromise} Promise was rejected
      </div>`
    );
};

const mouseClickedListener = (resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkClicks = () => {
    if (leftClicked && rightClicked) {
      resolve();
    }
  };

  document.body.addEventListener("click", () => {
    leftClicked = true;
    checkClicks();
  });

  document.body.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    rightClicked = true;
    checkClicks();
  });
};

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener("click", () => resolve());

  setTimeout(() => reject(Error), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    resolve();
  });

  document.body.addEventListener("click", () => resolve());
});

const thirdPromise = new Promise((resolve) => {
  mouseClickedListener(resolve);
});

firstPromise.then(successHandler("First")).catch(errorHandler("First"));

secondPromise.then(successHandler("Second"));

thirdPromise.then(successHandler("Third"));
