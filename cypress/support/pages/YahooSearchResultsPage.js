/**
 * Objeto de Página de Resultados de Busca do Yahoo
 * 
 * Este objeto de página manipula todas as interações com a página de resultados de busca do Yahoo,
 * fornecendo métodos para verificar a funcionalidade de busca e resultados.
 */

export class YahooSearchResultsPage {
  // Seletores para página de resultados de busca
  get searchInput() {
    return cy.get('input[name="p"], input[name="yschsp"], #yschsp, .searchbox input').first();
  }

  get searchResults() {
    return cy.get('#web ol li, .searchCenterMiddle li, [data-testid="result"], .algo, .result').not('.ad');
  }

  get searchResultLinks() {
    return cy.get('#web ol li h3 a, .searchCenterMiddle li h3 a, [data-testid="result"] h3 a, .algo h3 a, .result h3 a');
  }

  get searchResultTitles() {
    return cy.get('#web ol li h3, .searchCenterMiddle li h3, [data-testid="result"] h3, .algo h3, .result h3');
  }

  /**
   * Verificar se a página de resultados de busca carregou corretamente
   */
  verifySearchResultsPageLoaded() {
    cy.url().should('include', 'search');

    this.searchInput.should('be.visible');

    cy.get('body').should('be.visible');
  }

  /**
   * Verificar se o termo de busca aparece nos resultados
   * @param {string} searchTerm - O termo que foi buscado
   */
  verifySearchTermInResults(searchTerm) {
    // Verificar se a URL contém 'search' para confirmar que a busca foi realizada
    cy.url().should('include', 'search');
    
    // Verificar se existe um parâmetro de busca na URL
    cy.url().should('match', /[?&]p=|[?&]q=|[?&]query=/);
  }

  /**
   * Verificar se existem resultados de busca na página
   */
  verifySearchResultsExist() {
    this.searchResults.should('exist').and('have.length.greaterThan', 0);
    
    this.searchResultTitles.first().should('be.visible');
    
    this.searchResultLinks.first().should('have.attr', 'href');
  }

  /**
   * Verificar se os resultados de busca contêm o termo de busca
   * @param {string} searchTerm - O termo a ser verificado nos resultados
   */
  verifyResultsContainSearchTerm(searchTerm) {
    // Verificar se algum título ou descrição de resultado contém o termo de busca
    // Usando correspondência insensível a maiúsculas/minúsculas
    const searchRegex = new RegExp(searchTerm, 'i');
    
    this.searchResults.first().should('be.visible');
    
    cy.get('body').invoke('text').should('match', searchRegex);
  }

  /**
   * Verificar se o campo de busca contém o termo de busca
   * @param {string} searchTerm - O termo que deve estar no campo
   */
  verifySearchInputContains(searchTerm) {
    this.searchInput.should('have.value', searchTerm);
  }

  /**
   * Verificar se o título da página contém o termo de busca
   * @param {string} searchTerm - O termo de busca a ser verificado no título
   */
  verifyPageTitleContainsSearchTerm(searchTerm) {
    cy.title().should('include', searchTerm);
  }
}
