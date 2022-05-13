module.exports = {
    eslint: { ignoreDuringBuilds: true },
    basePath: '/'+ process.env.BASE_PATH,
    assetPrefix: '/'+ process.env.BASE_PATH,
    styledComponents: true,
    images: {
        domains: [
        "localhost",
        "acqui-uat.kotak.internal",
                 ],

        },
        publicRuntimeConfig: {
            MY_VAR: process.env.REACT_APP_HTTP_PATH,
            staticFolder: '/static',
            mySecret: 'secret',
            
          },
          serverRuntimeConfig: {
            // Will only be available on the server side
            mySecret: 'secret',
            secondSecret: process.env.REACT_APP_HTTP_PATH, // Pass through env variables
          }
}