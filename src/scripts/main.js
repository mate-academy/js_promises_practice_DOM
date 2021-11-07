"use strict";
const successHandler = (message) => {
  const successDiv = document.createElement("div");
  successDiv.setAttribute("data-qa", "notification");
  successDiv.classList.add("success");
  successDiv.textContent = message;
  document.body.append(successDiv);
};

const errorHandler = (error) => {
  const errorDiv = document.createElement("div");
  errorDiv.setAttribute("data-qa", "notification");
  errorDiv.classList.add("warning");
  errorDiv.textContent = error.message;
  document.body.append(errorDiv);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener("click", () => {
    resolve("First promise was resolved");
  });

  setTimeout(() => {
    reject(new Error("First promise was rejected"));
  }, 3000);
});

firstPromise
.then(successHandler)
.catch(errorHandler);

const secondPromise = new Promise((resolve) => {
  document.addEventListener("click", () => {
    resolve("Second promise was resolved");
  });

  document.addEventListener("contextmenu", () => {
    resolve("Second promise was resolved");
  });
});

 secondPromise.then(successHandler);

const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener("click", () => {
    left = true;
    right && resolve("Third promise was resolved");
  });
  document.addEventListener("contextmenu", () => {
    right = true;
    left && resolve("Third promise was resolved");
  });
 });

thirdPromise.then(successHandler);
