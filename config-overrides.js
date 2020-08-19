const { addWebpackAlias, override } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        ['@components']: path.resolve(__dirname, './src/components'),
        ['@contexts']: path.resolve(__dirname, './src/contexts'),
        ['@hooks']: path.resolve(__dirname, './src/hooks')
    })
)
