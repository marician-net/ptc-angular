export const environment = {
    name: 'dev',
    appInsights: {
        instrumentationKey: '<dev-guid-here>'
     },
    logging: {
        console: true,
        appInsights: false
    },
    connection: {
        requireAuth: true,
        tenant: '<dev-guid-here>',
        clientId: '<dev-guid-here>'
    },
    apibaseURL: 'http://localhost:5011/',
    identityserverURL: 'http://localhost:5000/',
    debug: true
};
