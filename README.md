1. Replace `<your_account>` with your Github username in the link
    - [DEMO LINK](https://nevskyy.github.io/js_promises_practice_DOM/)
2. Follow [this instructions](https://mate-academy.github.io/layout_task-guideline/)
    - Run `npm run test` command to test your code;
    - Run `npm run test:only -- -n` to run fast test ignoring linter;
    - Run `npm run test:only -- -l` to run fast test with additional info in console ignoring linter.


### Task: Promises practice

In this task, you should create 3 promises.
1. The first promise should be resolved on a `click` in `document` or rejected in 3 seconds if not clicked. Message: `First promise was resolved`, `First promise was rejected`
2. The second promise should be resolved only on `left` or `right` click on `document`. `middle` button should be ignored. Message: `Second promise was resolved`.
3. The third promise should be resolved only if both `left` and `right` clicks happened. Message: `Third promise was resolved`
4. Notify users about resolved or rejected promises using DOM. For messages add QA attributes `data-qa="notification"`, and classes `success`/`warning` depending on the result.

That's all.

