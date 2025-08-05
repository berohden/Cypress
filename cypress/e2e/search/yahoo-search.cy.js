
import { YahooHomePage } from '../../support/pages/YahooHomePage';
import { YahooSearchResultsPage } from '../../support/pages/YahooSearchResultsPage';

describe('Funcionalidade de Busca do Yahoo', () => {
  const yahooHomePage = new YahooHomePage();
  const yahooSearchResultsPage = new YahooSearchResultsPage();
  const searchTerm = 'Pacto Soluções';

  beforeEach(() => {
    yahooHomePage.visit();
  });

  it('deve buscar com sucesso por "Pacto Soluções" e exibir resultados', () => {
    // Realizar a busca
    yahooHomePage.performSearch(searchTerm);
    
    // Verificar se a página de resultados carregou
    yahooSearchResultsPage.verifySearchResultsPageLoaded();
    
    // Verificar se a busca foi executada com o termo correto
    yahooSearchResultsPage.verifySearchTermInResults(searchTerm);
    
    // Verificar se os resultados são exibidos
    yahooSearchResultsPage.verifySearchResultsExist();
    
    // Verificar se resultado específico contém o termo de busca
    yahooSearchResultsPage.verifyResultsContainSearchTerm(searchTerm);

     // Verificar se o título da página inclui o termo de busca
    yahooSearchResultsPage.verifyPageTitleContainsSearchTerm(searchTerm);
  });
});
