module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../app/components/**/*.stories.@(tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
}
