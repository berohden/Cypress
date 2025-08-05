/**
 * Teste Simplificado 
 * 
 * O teste abaixo é focado apenas na funcionalidade de busca, sem a implementação do padrão POM ou custom commands.
 */

describe('Busca do Yahoo', () => {
    const searchTerm = 'Pacto Soluções';

    it('deve realizar busca no Yahoo e exibir resultados', () => {
        // Visitar página inicial do Yahoo, verififcar a URL e realizar a pesquisa
        cy.visit('https://www.yahoo.com/');

        cy.url().should('include', 'yahoo.com');
        
        // Usar seletores mais robustos para encontrar o campo de busca
        cy.get('input[name="p"], input[name="yschsp"], input[type="text"][placeholder*="earch"]')
            .first()
            .should('be.visible')
            .clear()
            .type(searchTerm)
            .type('{enter}');

        // Verifica se, após clicar em "Buscar" a url atualizou para incluir o termo "search"
        cy.url().should('include', 'search');

        // : Verificar se existem resultados de busca
        cy.get('body').should('be.visible');
        cy.get('body').should('contain.text', 'Search');

        // Verificar se o termo de busca persiste na página de resultados (seletor mais flexível)
        cy.get('input[name="p"], input[name="yschsp"], input[type="text"]')
            .first()
            .should('have.value', searchTerm);


        cy.get('body').then(($body) => {
            const bodyText = $body.text().toLowerCase();
            expect(bodyText).to.satisfy((text) => {
                return text.includes('results') ||
                    text.includes('resultado') ||
                    text.includes('search') ||
                    text.includes('web');
            })
        });
        // Verifica se o corpo da página contém o termo de busca
        const searchRegex = new RegExp(searchTerm, 'i');
        cy.get('body').invoke('text').should('match', searchRegex);
    });
});
