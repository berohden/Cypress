/**
 * Objeto de Página Inicial do Yahoo
 * 
 * Este objeto de página encapsula todas as interações com a página inicial do Yahoo,
 * seguindo o padrão Page Object Model para automação de testes sustentável.
 */

export class YahooHomePage {
  get searchInput() {
    return cy.get('input[name="p"], input[name="yschsp"], input[type="text"][placeholder*="earch"]').first(); 
  }

  get yahooLogo() {
    return cy.get('#UhLogo, .yahoo-logo, [alt*="Yahoo"], [data-testid="yahoo-logo"]').first();
  }

  /**
   * Visitar a página inicial do Yahoo e aguardar o carregamento
   * 
   * Esta função abre a página inicial do Yahoo e aguarda o carregamento
   * da página, verificando se estamos na página certa.
   */
  visit() {
    cy.visit('https://www.yahoo.com/');
    
    this.verifyPageLoaded();
  }

  /**
   * Verificar se a página inicial do Yahoo carregou corretamente
   */
  verifyPageLoaded() {
    cy.url().should('include', 'yahoo.com');
    
    this.searchInput.should('be.visible');
    
    cy.title().should('not.be.empty');
    
  }

  /**
   * Realizar operação de busca
   * @param {string} searchTerm - O termo a ser buscado
   */
  performSearch(searchTerm) {
    this.searchInput
      .clear()
      .type(searchTerm)
      .should('have.value', searchTerm); 
    
    this.searchInput.type('{enter}');
    
    cy.url().should('include', 'search');
  }
}
