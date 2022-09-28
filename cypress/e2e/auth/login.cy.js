import "cypress-localstorage-commands";

describe('Login', () => {

    describe('When visiting `/auth/login` and Submitting', () => {
        beforeEach(() => {
            cy.task('db:seed');
            // Cypress starts out with a blank slate for each test
            // so we must tell it to visit our website with the `cy.visit()` command.
            // Since we want to visit the same URL at the start of all our tests,
            // we include it in our beforeEach function so that it runs before each test
            cy.clearLocalStorageSnapshot();
            cy.removeLocalStorage('user_info')
            cy.visit('/auth/login')
        })

        it('Correct form', () => {
            cy.get('[data-testid=login-email]').type('example@gmail.com')
            cy.get('[data-testid=login-password]').type('123456')
            cy.get('[data-testid=login-form]').submit()
            cy.wait(200)
            cy.contains('Wallets').should('be.visible')
        })

        it('Incorrect Login / empty email', () => {
            cy.get('[data-testid=login-password]').type('123456')
            cy.get('[data-testid=login-submit]').should('be.disabled')
        })

        it('Incorrect Login / empty password', () => {
            cy.get('[data-testid=login-email]').type('example@gmail.com')
            cy.get('[data-testid=login-submit]').should('be.disabled')
        })

        it('Incorrect Login / wrong field values', () => {
            cy.get('[data-testid=login-email]').type('example')
            cy.get('[data-testid=login-password]').type('123')

            cy.get('[data-testid=login-email-error]').should('be.visible')
            cy.get('[data-testid=login-password-error]').should('be.visible')
            cy.get('[data-testid=login-submit]').should('be.disabled')
        })

    })

    describe('When authenticated', () => {

        beforeEach(() => {
            cy.visit('/auth/login')
            cy.get('[data-testid=login-email]').type('example@gmail.com')
            cy.get('[data-testid=login-password]').type('123456')
            cy.get('[data-testid=login-form]').submit()
            cy.wait(200)
        })

        it('And visiting `/auth/login` should redirect to dashboard', () => {
            cy.visit('/auth/login')
            cy.location('pathname').should('not.include', '/auth/login')
        })

    })



})