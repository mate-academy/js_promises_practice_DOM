"use strict";
const body = document.querySelector("body");
document.addEventListener("contextmenu", (event1)=>{
    event1.preventDefault();
});
const promise1 = new Promise((resolve, reject)=>{
    // eslint-disable-next-line prefer-const
    let timeoutId;
    function onMouseDown(ev) {
        if (ev.button === 0) {
            clearTimeout(timeoutId);
            removeEventListener("mousedown", onMouseDown);
            resolve("First promise was resolved");
        }
    }
    document.addEventListener("mousedown", onMouseDown);
    timeoutId = setTimeout(()=>{
        removeEventListener("mousedown", onMouseDown);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject("First promise was rejected");
    }, 3000);
});
const promise2 = new Promise((resolve)=>{
    document.addEventListener("mousedown", (ev)=>{
        if (ev.button === 0 || ev.button === 2) resolve("Second promise was resolved");
    });
});
const promise3 = new Promise((resolve)=>{
    let leftClick = false;
    let rightClick = false;
    document.addEventListener("mousedown", (ev)=>{
        if (ev.button === 0) leftClick = true;
        else if (ev.button === 2) rightClick = true;
        if (leftClick && rightClick) resolve("Third promise was resolved");
    });
});
function createMessage(message, isSuccess) {
    const div = document.createElement("div");
    div.dataset.qa = "notification";
    div.textContent = message;
    if (isSuccess) div.classList.add("success");
    else div.classList.add("error");
    body.appendChild(div);
}
promise1.then((successData)=>{
    createMessage(successData, true);
}).catch((errorData)=>{
    createMessage(errorData, false);
});
promise2.then((successData)=>{
    createMessage(successData, true);
});
promise3.then((successData)=>{
    createMessage(successData, true);
});

//# sourceMappingURL=index.f75de5e1.js.map
