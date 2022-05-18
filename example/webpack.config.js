const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { TypedCssModulesPlugin } = require("typed-css-modules-webpack-plugin")

process.env.NODE_ENV = "development"

module.exports = {
  mode: "development",
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    clean: true
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new TypedCssModulesPlugin({
      globPattern: "src/**/*.css",
      camelCase: true
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".css", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", { loader: "css-loader", options: { modules: true } }]
      }
    ]
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 9999,
    compress: true,
    hot: true,
    historyApiFallback: true
  }
}
