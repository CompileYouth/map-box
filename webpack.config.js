const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve("./src"),
    entry: {
        "mb": [ "./mb/app/ApplicationController.js", "./mb/resource/index.less" ]
    },
    output: {
        path: "./public/assets",
        publicPath: "/assets/",
        filename: "[name]/index.js"
    },
    devServer: {
        contentBase: "./public"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    "ui5-loader?sourceRoot=./src",
                    "babel-loader?sourceRoot=./src"
                ]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("./[name]/resource/index.css")
    ]
};
