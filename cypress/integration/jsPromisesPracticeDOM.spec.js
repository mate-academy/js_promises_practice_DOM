'use strict';

const page = {
  notification: () => cy.get('[data-qa=notification]'),
  body: () => cy.get('body'),
};

const firstResolvedMsg = 'First promise was resolved';
const firstRejectedMsg = 'First promise was rejected';
const secondResolvedMsg = 'Second promise was resolved';
const thirdResolvedMsg = 'Third promise was resolved';

describe('Promises in DOM', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('/');
  });

  describe('firstPromise', () => {
    it('should be resolved after the left click', () => {
      page.body().click();

      page.notification().should('include.text', firstResolvedMsg);
    });

    it('should be rejected after 3 seconds of inactivity', () => {
      cy.tick(3000);

      page.notification().should('include.text', firstRejectedMsg);
      page.notification().should('not.include.text', firstResolvedMsg);
    });

    it('should not show reject message if it was already resolved', () => {
      page.body().click();

      cy.tick(3000);
      page.notification().should('not.include.text', firstRejectedMsg);
    });
  });

  describe('secondPromise', () => {
    it('should be resolved after the left click', () => {
      page.body().click();
      page.notification().should('include.text', secondResolvedMsg);
    });

    it('should be resolved after the right click', () => {
      page.body().rightclick();
      page.notification().should('include.text', secondResolvedMsg);
    });
  });

  describe('thirdPromise', () => {
    it('should be resolved after the left and right click', () => {
      page.body().click();
      page.body().rightclick();
      page.notification().should('include.text', thirdResolvedMsg);
    });

    it('should not be resolved after the left click only', () => {
      page.body().click();
      page.notification().should('not.include.text', thirdResolvedMsg);
    });

    it('should not be resolved after the right click only', () => {
      page.body().rightclick();
      page.notification().should('not.include.text', thirdResolvedMsg);
    });
  });
});
