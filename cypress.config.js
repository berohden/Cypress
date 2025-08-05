const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'electron') {
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--disable-features=VizDisplayCompositor');
          launchOptions.args.push('--ignore-certificate-errors');
          launchOptions.args.push('--ignore-ssl-errors');
        }
        return launchOptions;
      });
    },
    
    // Base URL 
    baseUrl: "https://yahoo.com",
    
    // Viewport 
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    
  
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    
    // Reduce console noise
    modifyObstructiveCode: true,
    
    // Spec pattern for organizing tests
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  
    
  },
});
