/**
 * Teste UOL - Validação da Data de Atualização (Cypress)
 * 
 * Este teste navega até o UOL, acessa a página de Segurança e Privacidade
 * e valida se a data de última atualização corresponde ao esperado.
 */

describe('UOL - Segurança e Privacidade', () => {
  const dataEsperada = '21 de julho de 2021';

  it('deve verificar data de atualização na página de Segurança e Privacidade', () => {
    // Configurar Cypress para ignorar erros de JavaScript não relacionados ao teste
    cy.on('uncaught:exception', (err, runnable) => {
      // Ignorar todos os erros de JavaScript do UOL que não afetam nosso teste
      console.log('Erro capturado e ignorado:', err.message);
      return false; // Ignorar todos os erros não relacionados ao teste
    });

    // Interceptar a chamada da API de política antes da navegação
    cy.intercept('GET', '**/api/policyVersion').as('policyVersionAPI');

    // Navegar até o UOL
    cy.visit('https://uol.com.br/', {
      timeout: 30000,
      failOnStatusCode: false
    });
    
    // Verificar se estamos na página correta
    cy.url().should('contain', 'uol.com.br');
    
    // Aguardar o carregamento da página e aguardar um pouco para estabilizar
    cy.get('body').should('be.visible');
    cy.wait(5000); // Aguardar scripts da página carregarem
    
    // Tentar encontrar o link "Segurança e privacidade" no rodapé
    cy.get('body').then(($body) => {
      // Primeiro tentar localizar o link específico
      if ($body.find('a[href*="normas-de-seguranca-e-privacidade"]').length > 0) {
        cy.get('a[href*="normas-de-seguranca-e-privacidade"]')
          .contains('Segurança e privacidade')
          .first()
          .should('be.visible')
          .click();
      } else {
        // Se não encontrar, tentar outras variações do link
        cy.get('footer, .footer, [class*="footer"]').within(() => {
          cy.get('a').contains(/segurança.*privacidade/i).click();
        });
      }
    });
    
    // Aguardar o carregamento da nova página
    cy.url().should('contain', 'normas-de-seguranca-e-privacidade', { timeout: 15000 });
    
    // Aguardar especificamente o elemento que contém "Atualização:" estar visível
    cy.get('h1:contains("Normas de Segurança e Privacidade")', { timeout: 10000 }).should('be.visible');
    
    // Localizar o elemento que contém a data de atualização usando uma abordagem mais ampla
    cy.get('p').then(($paragraphs) => {
      // Procurar por qualquer parágrafo que contenha "Atualização"
      let elementoEncontrado = null;
      let textoCompleto = '';
      
      $paragraphs.each((_, elemento) => {
        const texto = Cypress.$(elemento).text();
        if (texto.includes('Atualização:')) {
          elementoEncontrado = elemento;
          textoCompleto = texto;
          return false; // Parar o loop
        }
      });

      // Verificar se encontrou algum texto
      expect(textoCompleto).to.not.be.empty;
      
      // Métodos alternativos para extrair a data
      let dataEncontrada = '';
      
      if (textoCompleto.includes('Atualização:')) {
        dataEncontrada = textoCompleto
          .split('Atualização:')[1] 
          .replace(/\s+/g, ' ')
          .trim();
      }
      
  
      // Validar se a data encontrada corresponde à esperada
      if (dataEncontrada !== dataEsperada) {
        // Se as datas são diferentes, falhar o teste com mensagem de erro
        throw new Error(`Data de atualização modificada: data anterior "${dataEsperada}", data atual: "${dataEncontrada}"`);
      }
      
      // Verificação final
      expect(dataEncontrada).to.equal(dataEsperada);
    });
  });
});
