const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const TerserPlugin = require("terser-webpack-plugin");

let { name, version, author } = JSON.parse(fs.readFileSync("package.json", "utf8"));

module.exports = {
    entry: path.resolve(__dirname, "index.ts"),
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: "ts-loader",
            },
        ],
    },
    resolve: { extensions: [".ts", ".js"] },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.min.js",
        library: {
            name: "WAPI",
            type: "umd",
            export: "default",
            umdNamedDefine: true,
        },
        clean: true,
    },
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(`${version}`),
        }),
        new webpack.BannerPlugin({
            banner: `${name} v${version} - (c) ${author}, ISC License`,
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        keep_classnames: true,
                        keep_fnames: true,
                    },
                },
                extractComments: false,
            }),
        ],
    },
};

// import { dirname, resolve } from "path";
// import { fileURLToPath } from "url";
// import webpack from "webpack";
// import fs from "fs";
// import TerserPlugin from "terser-webpack-plugin";

// const dir = dirname(fileURLToPath(import.meta.url));
// let { name, version, author } = JSON.parse(fs.readFileSync("package.json", "utf8"));

// export default {
//     entry: "./index.js",
//     output: {
//         path: resolve(dir, "./dist"),
//         filename: "index.min.js",
//         library: {
//             name: "WAPI",
//             type: "umd",
//             export: "default",
//             umdNamedDefine: true,
//         },
//     },
//     devtool: "source-map",
//     plugins: [
//         new webpack.BannerPlugin({
//             banner: `${name} v${version} - (c) ${author}, ISC License`,
//         }),
//     ],
//     optimization: {
//         minimizer: [
//             new TerserPlugin({
//                 terserOptions: {
//                     compress: {
//                         keep_classnames: false,
//                         keep_fnames: true,
//                     },
//                 },
//                 extractComments: false,
//             }),
//         ],
//     },
// };
