# Suíte de Testes de Busca do Yahoo - Cypress 

Este projeto demonstra a implementação de testes automatizados E2E usando Cypress para validar a funcionalidade de busca do Yahoo.com. 

## Estrutura do Projeto

```
cypress/
├── cypress.config.js                            # Configuração principal do Cypress
├── package.json                                 # Dependências e scripts do projeto
├── e2e/
│   └── search/
│       ├── yahoo-search.cy.js                   # Teste principal usando Page Object Model
│       └── yahoo-search-simple.cy.js            # Abordagem de teste simplificada
├── support/
│   ├── commands.js                              # Comandos customizados do Cypress
│   ├── e2e.js                                   # Configurações de suporte
│   ├── utils.js                                 # Funções utilitárias
│   └── pages/
│       ├── YahooHomePage.js                     # Page Object para página inicial
│       └── YahooSearchResultsPage.js            # Page Object para resultados de busca
└── fixtures/                                    # Dados de teste (vazio atualmente)
```

## Cenários de Teste Implementados

### **yahoo-search-simple.cy.js** (Abordagem Direta)
- **Teste**: "deve realizar busca no Yahoo e exibir resultados"
- **Abordagem**: Implementação direta sem padrões de design
- **Foco**: Simplicidade e execução rápida

### **yahoo-search.cy.js** (Page Object Model)
- **Teste 1**: "deve buscar com sucesso por 'Pacto Soluções' e exibir resultados"
- **Teste 2**: "deve lidar com busca com atualização adequada do título da página"
- **Abordagem**: Usa Page Object Model para melhor manutenibilidade
- **Verificações**:
  - Carregamento da página de resultados
  - Presença do termo de busca na URL
  - Existência de resultados de busca
  - Termo de busca nos resultados
  - Atualização do título da página

## Tecnologias e Ferramentas

- **Cypress v14.5.3**: Framework de testes E2E
- **Node.js v20.18.0**: Runtime JavaScript
- **JavaScript ES6+**: Sintaxe moderna com imports/exports
- **Page Object Model**: Padrão de design para testes sustentáveis


## Executando os Testes

### Comandos Disponíveis
```bash
npm install                    # Instalar dependências
npm test                      # Executar todos os testes (headless)
npm run cypress:open          # Abrir Cypress Test Runner (interface visual)
npm run cypress:run           # Executar testes em modo headless
```

### Executar Arquivos Específicos
```bash
# Teste simplificado
npx cypress run --spec "cypress/e2e/search/yahoo-search-simple.cy.js"

# Teste com Page Object Model
npx cypress run --spec "cypress/e2e/search/yahoo-search.cy.js"

# Todos os testes
npx cypress run
```


**Por**: Beatriz Rohden
**Data**: Agosto 2025  
**Propósito**: Demonstração de Automação de Testes E2E com Cypress  

