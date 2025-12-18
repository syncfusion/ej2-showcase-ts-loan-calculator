const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
     index: "./src/index.ts"
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              api: "modern",
              sassOptions: {
                //If utilize the syncfusion sass files, then use the following line
                loadPaths: ["node_modules/@syncfusion"],
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "favicon.ico"
    }),
    new HtmlWebpackPlugin({
      filename: "homePage.html",
      template: "./src/home/homePage.html",
    }),
    new HtmlWebpackPlugin({
      filename: "aboutPage.html",
      template: "./src/about/aboutPage.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
        extractComments: false,
    })],
  },
};
