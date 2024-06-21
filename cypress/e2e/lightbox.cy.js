describe('Lightbox Tests', () => {
    beforeEach(() => {
        cy.visit('../../app/lightbox.html');
    });

    it("Ouverture de l'image", () => {
        cy.get('img').first().click();
        cy.get('#lightbox').should('be.visible');
    });

    it("Fermeture de l'image au clique en dehors", () => {
        cy.get('.relative img').first().click();
        cy.get('#lightbox').should('be.visible');
        cy.get('.fixed.top-0.left-0').click('topRight');
        cy.get('#lightbox').should('not.be.visible');
    });

    it("Ajouter un like et s'assurer que le compteur s'est actualisé", () => {
        cy.get('img').first().click();
        cy.get('#lightbox').should('be.visible');
        // Clique sur le bouton "j'aime"
        cy.get('svg[title="Like"]').click();
         // Assurer que le compteur s'est actualisé
        cy.get('.text-xs.font-semibold').should('contain.text', '1');
    });

    it("Supprimer un like et s'assurer que le compteur s'est actualisé", () => {
        cy.get('img').first().click();
        cy.get('#lightbox').should('be.visible');
        // Clique sur le bouton "j'aime" deux fois pour dislike après
        cy.get('svg[title="Like"]').click();
        cy.get('svg[title="Dislike"]').click();
         // Assurer que le compteur s'est actualisé
        cy.get('.text-xs.font-semibold').should('contain.text', '0');
    });

    it("Tester l'ajout d'un commentaire", () => {
        cy.get('.relative img').first().click();
        cy.get('input[name="comment"]').type('Cypress is awesome!');
        cy.get('button').contains('Publish').click();
        cy.get('.flex.flex-col').should('contain', 'Cypress is awesome!');
    })

    it("Vérifie l'ajout d'un commentaire vide", () => {
        cy.get('.relative img').first().click();
        cy.get('button').contains('Publish').should('be.disabled');
    });

    it('Masquer les commentaires', () => {
        // Ouvrir la lightbox en cliquant sur une image
        cy.get('.relative img').first().click();
    
        // Ajouter trois commentaires successifs
        cy.get('input[name="comment"]').type('First comment');
        cy.get('button').contains('Publish').click();
        cy.get('input[name="comment"]').type('Second comment');
        cy.get('button').contains('Publish').click();
        cy.get('input[name="comment"]').type('Third comment');
        cy.get('button').contains('Publish').click();
    
        // Cliquer pour masquer les commentaires
        cy.get('.text-xs.text-gray-400').first().click();
        cy.get('.bg-white.flex.flex-col').should('not.be.visible');
        // Cliquer à nouveau pour afficher les commentaires
        cy.get('.text-xs.text-gray-400').first().click();
        cy.get('.bg-white.flex.flex-col').should('be.visible');
    });

    it('Vérifie le compteur des commentaires', () => {
        cy.get('.relative img').first().click();
        cy.get('input[name="comment"]').type('First comment');
        cy.get('button').contains('Publish').click();
        cy.get('.flex.items-center.justify-around').contains('1');
    });

    it('Test du singulier et du pluriel', () => {
        cy.get('.relative img').first().click();
        cy.get('input[name="comment"]').type('First comment');
        cy.get('button').contains('Publish').click();
        cy.contains('Hide 1 comment').should('be.visible');

        cy.get('input[name="comment"]').type('Second comment');
        cy.get('button').contains('Publish').click();
        cy.contains('Hide 2 comments').should('be.visible');
    });

    it('Supprimer le second commentaire', () => {
        cy.get('.relative img').first().click();
    
        // Ajouter trois commentaires
        cy.get('input[name="comment"]').type('First comment');
        cy.get('button').contains('Publish').click();
        cy.get('input[name="comment"]').type('Second comment');
        cy.get('button').contains('Publish').click();
        cy.get('input[name="comment"]').type('Third comment');
        cy.get('button').contains('Publish').click();
    
        // Sélectionner et supprimer le deuxième commentaire
        cy.get('.flex.items-center.justify-between').eq(2).find('svg[title="Supprimer le commentaire"]').click();
    
        // Vérifier que le "Second comment" n'existe plus dans la liste des commentaires
        cy.contains('.flex.items-center.justify-around', 'Second comment').should('not.exist');
    });
    
});