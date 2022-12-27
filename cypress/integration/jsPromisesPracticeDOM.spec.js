'use strict';

const page = {
  notification: () => cy.get('[data-qa=notification]'),
  leftBtnClick: () => {
    cy.get('body').trigger('mousedown', { button: 0 }).trigger('mouseup');
  },
  rightBtnClick: () => {
    cy.get('body').trigger('mousedown', { button: 2 }).trigger('mouseup');
  },
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
      page.leftBtnClick();
      page.notification().contains(firstResolvedMsg);
    });

    it('should be rejected after 3 seconds of inactivity', () => {
      cy.tick(3000);

      page.notification().contains(firstRejectedMsg);
      page.notification().contains(firstResolvedMsg).should('not.exist');
    });

    it('should not show reject message if already was resolved', () => {
      page.leftBtnClick();
      page.notification().contains(firstResolvedMsg);

      cy.tick(3000);
      page.notification().contains(firstRejectedMsg).should('not.exist');
    });
  });

  describe('secondPromise', () => {
    it('should be resolved after the left click', () => {
      page.leftBtnClick();
      page.notification().contains(secondResolvedMsg);
    });

    it('should be resolved after the right click', () => {
      page.rightBtnClick();
      page.notification().contains(secondResolvedMsg);
    });
  });

  describe('thirdPromise', () => {
    it('should be resolved after the left and right click', () => {
      page.leftBtnClick();
      page.rightBtnClick();
      page.notification().contains(thirdResolvedMsg);
    });

    it('should not be resolved after the left click only', () => {
      page.leftBtnClick();
      page.notification().contains(thirdResolvedMsg).should('not.exist');
    });

    it('should not be resolved after the right click only', () => {
      page.rightBtnClick();
      page.notification().contains(thirdResolvedMsg).should('not.exist');
    });
  });
});
