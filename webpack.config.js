const path = require("path")
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")


module.exports = {
    mode: "production",
    entry: {
        index: ['./src/index.js', './src/three.js']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    }, 
    devServer: {static: "./dist"},
    devtool: false,
    plugins: [new miniCssExtractPlugin()],
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
          new TerserPlugin(),
          new CssMinimizerPlugin()
        ],
    },
    module: {
        rules: [ 
            { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource', },
            { test: /\.js$/, exclude: /node_modules/, use: {loader: "babel-loader"} },
            { test: /\.css$/, use: [miniCssExtractPlugin.loader, 'css-loader'] } 
        ]
    }
}