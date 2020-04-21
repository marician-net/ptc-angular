export const environment = {
         name: "dev",
         appInsights: {
           instrumentationKey: "<dev-guid-here>"
         },
         logging: {
           console: true,
           appInsights: false
         },
         connection: {
           requireAuth: true,
           tenant: "<dev-guid-here>",
           clientId: "<dev-guid-here>"
         },
         production: false,
         apibaseURL: "https://sb.pipelinetesting.com/",
         identityserverURL: "https://pt-identityserver.azurewebsites.net/",
         debug: true
       };
