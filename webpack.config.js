const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const TerserPlugin = require("terser-webpack-plugin");

let { name, version, author } = JSON.parse(fs.readFileSync("package.json", "utf8"));

function createConfig(minify = false) {
    return {
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
        devtool: `${minify ? "" : "inline-"}source-map`,
        resolve: { extensions: [".ts", ".js"] },
        output: {
            path: path.resolve(__dirname, minify ? "dist" : ""),
            filename: `index${minify ? ".min" : ""}.js`,
            library: {
                name: "WAPI",
                type: "umd",
                export: minify ? "default" : undefined,
                umdNamedDefine: true,
            },
            clean: minify,
        },
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
                    include: /\.min/g,
                    terserOptions: {
                        compress: {
                            keep_classnames: true,
                            keep_fnames: true,
                        },
                    },
                    extractComments: false,
                }),
            ],
            splitChunks: {
                chunks: "all",
            },
        },
    };
}

module.exports = [createConfig(), createConfig(true)];
