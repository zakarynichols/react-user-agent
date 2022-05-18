const path = require("path")

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
  plugins: [],
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 8888,
    compress: true,
    hot: true
  }
}
