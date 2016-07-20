"use strict";

const gulp = require("gulp");
const gutil = require("gulp-util");
const rimraf = require("rimraf");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

gulp.task("default", [ "dist" ]);


gulp.task("clean", cb => {
    rimraf("./public/assets", cb);
});


gulp.task("dist", [ "clean" ], cb => {
    console.log("Usage: gulp clean|dev");
});


gulp.task("dev", [ "clean" ], cb => {
    const config = require("./webpack.config.js");
    const compiler = webpack(config);

    new WebpackDevServer(compiler, {
        contentBase: "./public",
        publicPath: config.output.publicPath
    }).listen(8080, "localhost", err => {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        const uri = "http://localhost:8080/";
        gutil.log("[webpack-dev-server]", uri);
    });
});
