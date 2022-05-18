module.exports = {
  presets: [
    "babel-preset-react-app",
    ["@babel/preset-env", { targets: { node: "current" }, loose: true }],
    ["@babel/preset-react", { runtime: "automatic" }]
  ]
}
