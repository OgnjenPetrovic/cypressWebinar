// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('loginAPI', (email, password) => {
    Cypress.log({
      name: 'loginProgramaticly',
      message: `${email} | ${password}`,
    });
  
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('backendUrl')}users/login`,
      body: {
        user: {
        email: email,
        password: password
        }
      },
    })
      .then((resp) => {
        expect(resp.body.user).to.have.property('token');
        expect(resp.status).to.eq(200);
        window.localStorage.setItem('jwt', resp.body.user.token);
        Cypress.log({
          name: 'loginByForm',
          message: window.localStorage.getItem('jwt'),
        });
      });
});

Cypress.Commands.add('createArticleApi', (article) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('backendUrl')}articles`,
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
      },
      body: article,
    }).then((resp) => {
      expect(resp.body.article).to.have.property('body');
      expect(resp.status).to.eq(200);
    });
  });

  Cypress.Commands.add('deleteArticleApi', (articleSlug) => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('backendUrl')}articles/${articleSlug}`,
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
      },
    }).its('status')
      .should('eq', 204);
  });

