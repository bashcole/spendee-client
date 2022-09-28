import "cypress-localstorage-commands";

describe('Dashboard', () => {

    beforeEach(() => {
        cy.task('db:seed');
        cy.visit('/auth/login')
        cy.get('[data-testid=login-email]').type('example@gmail.com')
        cy.get('[data-testid=login-password]').type('123456')
        cy.get('[data-testid=login-form]').submit()
        cy.wait(200)
    })

    it('Render', () => {

        cy.visit('/')
        cy.contains('Wallets').should('be.visible')

        cy.contains('USD Wallet').should('be.visible')
        cy.contains('Wallet').should('be.visible')
        cy.get('[data-testid^=wallet_]').should('have.length', 2)

    })

    it('Add new wallet button', () => {

        cy.visit('/')
        cy.wait(5)

        cy.get('[data-testid=button-new-wallet]').click();
        cy.get('[data-testid=new_wallet_form_name]').type('Wallet Auto')

        cy.get('[id=react-select-2-input]').type('USD{downArrow}{enter}')
        cy.get('[id=react-select-3-input]').type('cash{downArrow}{enter}')
        cy.get('[id=react-select-4-input]').type('BGN{downArrow}{enter}')

        cy.get('[data-testid=new_wallet_form]').submit();

        cy.visit('/')
        cy.wait(5)
        cy.contains('Wallet Auto').should('be.visible')
        // cy.get('[data-testid=backdrop]').click({force: true});

    })

})