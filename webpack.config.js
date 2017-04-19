const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist')
};

const common = merge({
    devtool: 'inline-source-map',
    entry:{
        app: PATHS.app,
    },
    output:{
        path: PATHS.dist,
        filename: '[name].js'
    }
});

const productionRun = () => {
    return merge([
        common,
        parts.loadImages({paths: PATHS.app}),
        parts.lintJavaScript({ paths: PATHS.app }),
        parts.loadCss(PATHS.app),
        parts.loadPlugins()
    ]);
};

const  developmentRun = () => {
    return merge([
        common,
        parts.devServer,
        parts.loadImages({paths: PATHS.app}),
        parts.lintJavaScript({
            paths: PATHS.app,
            options: {
                emitWarnings: true
            }
        }),
        parts.loadCss(PATHS.app),
        parts.loadHMR(PATHS.app),
        parts.loadPlugins()
    ]);
};

module.exports = (env)=>{

    if(env === 'production'){
        return productionRun();
    }
    
    return developmentRun();

};