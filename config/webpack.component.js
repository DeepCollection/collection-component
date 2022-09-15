const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/upload/index.tsx",
  output: {
    path: path.resolve(__dirname, "../lib"),
    filename: "upload.js",
    publicPath: "",
    library: {
      name: "upload",
      type: "umd",
    },
    // library: {
    //   name: "webpackNumbers",
    //   type: "umd",
    // },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /\.(css|scss|sass)$/,
      },
      {
        type: "asset",
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
  },
  plugins: [new CleanWebpackPlugin()],
  externals: {
    react: {
      commonjs: "react", // CommonJS 模块
      commonjs2: "react", // CommonJS 模块
      amd: "react", // AMD 模块
      root: "React", // 全局变量访问
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
  },
};
