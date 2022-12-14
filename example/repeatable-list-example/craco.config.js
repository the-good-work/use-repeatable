const path = require("path");
module.exports = {
  webpack: {
    resolve: {
      react: path.resolve(__dirname, "../../node_modules/react"),
      "react-dom": path.resolve(__dirname, "../../node_modules/react-dom"),
      symlinks: false,
    },
  },
};
