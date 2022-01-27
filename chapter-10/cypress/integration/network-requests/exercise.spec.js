describe('network request', () => {

    beforeEach(() => {
        cy.loginUser();

        cy.intercept('bankAccounts').as('bankAccounts');
        cy.intercept('transactions/public').as('transactions');
        cy.intercept('transactions').as('personalTransactions');
        cy.intercept('notifications').as('notifications');

        cy.wait('@bankAccounts');
        cy.wait('@transactions');
        cy.wait('@notifications');
    });

    afterEach(() => {
        cy.logoutUser();
    });

    describe('exercise-4', () => {
        it('fetch contacts', () => {
            cy.request({
                url: 'http://localhost:3001/transactions/contacts',
                method: 'GET',
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.results).to.be.an('array');
            });
        });

        it('fetch notifications', () => {
            cy.request({
                url: 'http://localhost:3001/notifications',
                method: 'GET',
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.results).to.be.an('array');
            });
        });
    });

    describe('exercise-5', () => {
        beforeEach(() => {
            cy.intercept('checkAuth').as('auth');
        });

        it('check whether Cypress verifies that a user is logged in', () => {
            cy.visit('user/settings');
            cy.get('[data-test="user-settings-firstName-input"]').clear().type('new name');
            cy.get('[data-test="user-settings-submit"]').click();
            cy.wait('@auth');
            cy.get('[data-test="user-settings-firstName-input"]').clear().type('Edgar');
            cy.get('[data-test="user-settings-submit"]').click();
            cy.reload();
        });
    });
    
});