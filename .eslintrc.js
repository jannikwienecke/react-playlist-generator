module.exports = {
  env: {
    es2020: true,
  },
  extends: ["react-app", "plugin:jsx-a11y/recommended", "plugin:cypress/recommended"],
  plugins: ["jsx-a11y", "baseui"],
  rules: {
    "import/no-anonymous-default-export": "error",
    "import/no-webpack-loader-syntax": "off",
    "react/react-in-jsx-scope": "off", // React is always in scope with Blitz
    "jsx-a11y/anchor-is-valid": "off", //Doesn't play well with Blitz/Next <Link> usage
    "baseui/deprecated-theme-api": "warn",
    "baseui/deprecated-component-api": "warn",
    "baseui/no-deep-imports": "warn",
  },
}
