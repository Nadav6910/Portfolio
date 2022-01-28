const miniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "production", 
    devServer: {static: "./src"},
    plugins: [new miniCssExtractPlugin()],
    module: {
        rules: [ 
            { test: /\.js$/, exclude: /node_modules/, use: {loader: "babel-loader"} },
            { test: /\.css$/, use: [miniCssExtractPlugin.loader, 'css-loader'] } 
        ]
    }
}